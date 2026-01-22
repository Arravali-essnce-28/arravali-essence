<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\OrderTracking;
use Illuminate\Database\Seeder;

class OrderTrackingSeeder extends Seeder
{
    public function run(): void
    {
        // Get existing orders
        $orders = Order::all();
        
        foreach ($orders as $order) {
            // Create tracking history based on order status
            $this->createTrackingHistory($order);
        }
    }

    private function createTrackingHistory(Order $order): void
    {
        $trackingSteps = [];
        
        switch ($order->status) {
            case 'pending':
                $trackingSteps = [
                    [
                        'status' => 'pending',
                        'description' => 'Order has been received and is pending confirmation',
                        'location' => 'Processing Center',
                        'created_at' => $order->created_at
                    ]
                ];
                break;
                
            case 'processing':
                $trackingSteps = [
                    [
                        'status' => 'pending',
                        'description' => 'Order has been received and is pending confirmation',
                        'location' => 'Processing Center',
                        'created_at' => $order->created_at
                    ],
                    [
                        'status' => 'confirmed',
                        'description' => 'Order has been confirmed and is being processed',
                        'location' => 'Processing Center',
                        'created_at' => $order->created_at->addHours(2)
                    ],
                    [
                        'status' => 'processing',
                        'description' => 'Order is being prepared for shipment',
                        'location' => 'Warehouse',
                        'created_at' => $order->created_at->addHours(6)
                    ]
                ];
                break;
                
            case 'shipped':
                $trackingSteps = [
                    [
                        'status' => 'pending',
                        'description' => 'Order has been received and is pending confirmation',
                        'location' => 'Processing Center',
                        'created_at' => $order->created_at
                    ],
                    [
                        'status' => 'confirmed',
                        'description' => 'Order has been confirmed and is being processed',
                        'location' => 'Processing Center',
                        'created_at' => $order->created_at->addHours(2)
                    ],
                    [
                        'status' => 'processing',
                        'description' => 'Order is being prepared for shipment',
                        'location' => 'Warehouse',
                        'created_at' => $order->created_at->addHours(6)
                    ],
                    [
                        'status' => 'packed',
                        'description' => 'Order has been packed and is ready for shipment',
                        'location' => 'Warehouse',
                        'created_at' => $order->created_at->addHours(12)
                    ],
                    [
                        'status' => 'shipped',
                        'description' => 'Order has been shipped',
                        'location' => 'Distribution Center',
                        'tracking_number' => 'TRK' . strtoupper(uniqid()),
                        'carrier' => 'Express Delivery',
                        'estimated_delivery' => $order->created_at->addDays(3),
                        'created_at' => $order->created_at->addHours(18)
                    ]
                ];
                break;
                
            case 'delivered':
                $trackingSteps = [
                    [
                        'status' => 'pending',
                        'description' => 'Order has been received and is pending confirmation',
                        'location' => 'Processing Center',
                        'created_at' => $order->created_at
                    ],
                    [
                        'status' => 'confirmed',
                        'description' => 'Order has been confirmed and is being processed',
                        'location' => 'Processing Center',
                        'created_at' => $order->created_at->addHours(2)
                    ],
                    [
                        'status' => 'processing',
                        'description' => 'Order is being prepared for shipment',
                        'location' => 'Warehouse',
                        'created_at' => $order->created_at->addHours(6)
                    ],
                    [
                        'status' => 'packed',
                        'description' => 'Order has been packed and is ready for shipment',
                        'location' => 'Warehouse',
                        'created_at' => $order->created_at->addHours(12)
                    ],
                    [
                        'status' => 'shipped',
                        'description' => 'Order has been shipped',
                        'location' => 'Distribution Center',
                        'tracking_number' => 'TRK' . strtoupper(uniqid()),
                        'carrier' => 'Express Delivery',
                        'estimated_delivery' => $order->created_at->addDays(3),
                        'created_at' => $order->created_at->addHours(18)
                    ],
                    [
                        'status' => 'in_transit',
                        'description' => 'Order is in transit to your location',
                        'location' => 'In Transit',
                        'created_at' => $order->created_at->addDays(1)
                    ],
                    [
                        'status' => 'out_for_delivery',
                        'description' => 'Order is out for delivery',
                        'location' => 'Local Facility',
                        'created_at' => $order->created_at->addDays(2)
                    ],
                    [
                        'status' => 'delivered',
                        'description' => 'Order has been successfully delivered',
                        'location' => 'Delivered',
                        'created_at' => $order->created_at->addDays(3)
                    ]
                ];
                break;
        }

        foreach ($trackingSteps as $step) {
            OrderTracking::create(array_merge($step, ['order_id' => $order->id]));
        }
    }
}
