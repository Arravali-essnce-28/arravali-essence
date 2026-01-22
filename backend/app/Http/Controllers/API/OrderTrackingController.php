<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderTracking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class OrderTrackingController extends Controller
{
    public function trackOrder($orderNumber)
    {
        $order = Order::with(['user', 'tracking', 'orderItems.product'])
            ->where('order_number', $orderNumber)
            ->first();

        if (!$order) {
            return response()->json([
                'error' => 'Order not found'
            ], 404);
        }

        $tracking = $order->tracking;
        $latestStatus = $tracking->first();

        return response()->json([
            'order' => [
                'id' => $order->id,
                'order_number' => $order->order_number,
                'status' => $order->status,
                'total_amount' => $order->total_amount,
                'created_at' => $order->created_at,
                'estimated_delivery' => $latestStatus?->estimated_delivery,
                'tracking_number' => $latestStatus?->tracking_number,
                'carrier' => $latestStatus?->carrier
            ],
            'tracking_history' => $tracking->map(function ($track) {
                return [
                    'status' => $track->status,
                    'status_label' => $track->status_label,
                    'description' => $track->description,
                    'location' => $track->location,
                    'timestamp' => $track->created_at,
                    'progress' => $track->progress
                ];
            }),
            'progress' => $latestStatus?->progress ?? 0,
            'items' => $order->orderItems->map(function ($item) {
                return [
                    'name' => $item->product->name,
                    'quantity' => $item->quantity,
                    'price' => $item->price,
                    'image' => $item->product->image
                ];
            })
        ]);
    }

    public function getUserOrders()
    {
        $orders = Order::with(['latestTracking', 'orderItems.product'])
            ->where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return response()->json([
            'orders' => $orders->map(function ($order) {
                $latestTracking = $order->latestTracking;
                return [
                    'id' => $order->id,
                    'order_number' => $order->order_number,
                    'status' => $order->status,
                    'status_label' => $latestTracking?->status_label ?? ucfirst($order->status),
                    'total_amount' => $order->total_amount,
                    'created_at' => $order->created_at,
                    'estimated_delivery' => $latestTracking?->estimated_delivery,
                    'tracking_number' => $latestTracking?->tracking_number,
                    'progress' => $latestTracking?->progress ?? 10,
                    'items_count' => $order->orderItems->sum('quantity')
                ];
            }),
            'pagination' => [
                'current_page' => $orders->currentPage(),
                'last_page' => $orders->lastPage(),
                'per_page' => $orders->perPage(),
                'total' => $orders->total()
            ]
        ]);
    }

    public function updateTrackingStatus(Request $request, $orderNumber)
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required|in:pending,confirmed,processing,packed,shipped,in_transit,out_for_delivery,delivered,cancelled,returned',
            'description' => 'nullable|string|max:500',
            'location' => 'nullable|string|max:255',
            'estimated_delivery' => 'nullable|date',
            'tracking_number' => 'nullable|string|max:255',
            'carrier' => 'nullable|string|max:255',
            'metadata' => 'nullable|array'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $order = Order::where('order_number', $orderNumber)->first();

        if (!$order) {
            return response()->json(['error' => 'Order not found'], 404);
        }

        // Update order status
        $order->update(['status' => $request->status]);

        // Create tracking entry
        $tracking = OrderTracking::create([
            'order_id' => $order->id,
            'status' => $request->status,
            'description' => $request->description ?? $this->getDefaultDescription($request->status),
            'location' => $request->location,
            'estimated_delivery' => $request->estimated_delivery,
            'tracking_number' => $request->tracking_number,
            'carrier' => $request->carrier,
            'metadata' => $request->metadata
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Tracking status updated successfully',
            'tracking' => [
                'status' => $tracking->status,
                'status_label' => $tracking->status_label,
                'description' => $tracking->description,
                'location' => $tracking->location,
                'timestamp' => $tracking->created_at,
                'progress' => $tracking->progress
            ]
        ]);
    }

    public function getTrackingTimeline($orderNumber)
    {
        $order = Order::where('order_number', $orderNumber)->first();

        if (!$order) {
            return response()->json(['error' => 'Order not found'], 404);
        }

        $tracking = $order->tracking()->orderBy('created_at', 'asc')->get();

        $timeline = $tracking->map(function ($track) {
            return [
                'status' => $track->status,
                'status_label' => $track->status_label,
                'description' => $track->description,
                'location' => $track->location,
                'timestamp' => $track->created_at->format('M d, Y H:i'),
                'is_completed' => true,
                'icon' => $this->getStatusIcon($track->status),
                'color' => $this->getStatusColor($track->status)
            ];
        });

        // Add upcoming milestones
        $currentStatus = $tracking->first()?->status ?? 'pending';
        $upcoming = $this->getUpcomingMilestones($currentStatus);
        
        return response()->json([
            'timeline' => $timeline->concat($upcoming),
            'current_progress' => $tracking->first()?->progress ?? 10,
            'estimated_delivery' => $tracking->first()?->estimated_delivery
        ]);
    }

    private function getDefaultDescription($status)
    {
        $descriptions = [
            'pending' => 'Order has been received and is pending confirmation',
            'confirmed' => 'Order has been confirmed and is being processed',
            'processing' => 'Order is being prepared for shipment',
            'packed' => 'Order has been packed and is ready for shipment',
            'shipped' => 'Order has been shipped',
            'in_transit' => 'Order is in transit to your location',
            'out_for_delivery' => 'Order is out for delivery',
            'delivered' => 'Order has been successfully delivered',
            'cancelled' => 'Order has been cancelled',
            'returned' => 'Order has been returned'
        ];

        return $descriptions[$status] ?? 'Order status updated';
    }

    private function getStatusIcon($status)
    {
        $icons = [
            'pending' => 'clock',
            'confirmed' => 'check-circle',
            'processing' => 'package',
            'packed' => 'box',
            'shipped' => 'truck',
            'in_transit' => 'navigation',
            'out_for_delivery' => 'home',
            'delivered' => 'check-double',
            'cancelled' => 'times-circle',
            'returned' => 'undo'
        ];

        return $icons[$status] ?? 'circle';
    }

    private function getStatusColor($status)
    {
        $colors = [
            'pending' => '#F59E0B',
            'confirmed' => '#3B82F6',
            'processing' => '#8B5CF6',
            'packed' => '#6366F1',
            'shipped' => '#0EA5E9',
            'in_transit' => '#06B6D4',
            'out_for_delivery' => '#10B981',
            'delivered' => '#059669',
            'cancelled' => '#EF4444',
            'returned' => '#F97316'
        ];

        return $colors[$status] ?? '#6B7280';
    }

    private function getUpcomingMilestones($currentStatus)
    {
        $milestones = [
            'confirmed' => ['Processing', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered'],
            'processing' => ['Packed', 'Shipped', 'Out for Delivery', 'Delivered'],
            'packed' => ['Shipped', 'Out for Delivery', 'Delivered'],
            'shipped' => ['In Transit', 'Out for Delivery', 'Delivered'],
            'in_transit' => ['Out for Delivery', 'Delivered'],
            'out_for_delivery' => ['Delivered']
        ];

        $upcoming = $milestones[$currentStatus] ?? [];

        return collect($upcoming)->map(function ($milestone) {
            return [
                'status' => strtolower(str_replace(' ', '_', $milestone)),
                'status_label' => $milestone,
                'description' => $milestone . ' - Upcoming',
                'location' => null,
                'timestamp' => null,
                'is_completed' => false,
                'icon' => 'circle',
                'color' => '#D1D5DB'
            ];
        });
    }
}
