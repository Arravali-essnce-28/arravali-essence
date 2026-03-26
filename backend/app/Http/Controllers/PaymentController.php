<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\OrderTracking;
use App\Models\Cart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PaymentController extends Controller
{
    public function processPayment(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'address' => 'required|string|max:500',
            'city' => 'required|string|max:100',
            'postal_code' => 'required|string|max:20',
            'payment_method' => 'required|in:cod,card',
        ]);

        try {
            // Get cart items
            $cartItems = Cart::with('product')->get();
            
            if ($cartItems->isEmpty()) {
                return response()->json(['error' => 'Your cart is empty'], 400);
            }

            // Calculate total
            $total = $cartItems->sum(function ($item) {
                return $item->product->price * $item->quantity;
            });

            // Create order
            $order = Order::create([
                'user_id' => Auth::id(),
                'order_number' => 'ORD' . strtoupper(uniqid()),
                'total_amount' => $total,
                'status' => 'pending',
                'payment_method' => $request->payment_method,
                'shipping_address' => json_encode([
                    'name' => $request->name,
                    'email' => $request->email,
                    'phone' => $request->phone,
                    'address' => $request->address,
                    'city' => $request->city,
                    'postal_code' => $request->postal_code,
                ]),
            ]);

            // Create order items
            foreach ($cartItems as $cartItem) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $cartItem->product_id,
                    'quantity' => $cartItem->quantity,
                    'price' => $cartItem->product->price,
                ]);

                // Update product quantity
                $cartItem->product->decrement('quantity', $cartItem->quantity);
            }

            // Clear cart
            Cart::truncate();

            // Create initial tracking entry
            OrderTracking::create([
                'order_id' => $order->id,
                'status' => 'pending',
                'description' => 'Order has been received and is pending confirmation',
                'location' => 'Processing Center'
            ]);

            return response()->json([
                'success' => true,
                'order' => $order,
                'message' => 'Order placed successfully!'
            ]);

        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('PaymentController@processPayment: ' . $e->getMessage());
            return response()->json([
                'error' => 'Failed to process your order. Please try again or contact support.'
            ], 500);
        }
    }

    public function getOrder($orderNumber)
    {
        $order = Order::with('items.product')
            ->where('order_number', $orderNumber)
            ->first();

        if (!$order) {
            return response()->json(['error' => 'Order not found'], 404);
        }

        return response()->json($order);
    }
    public function createPaymentIntent(Request $request)
    {
        try {
            $user = Auth::user();
            $cartItems = Cart::where('user_id', $user->id)->with('product')->get();

            if ($cartItems->isEmpty()) {
                return response()->json(['error' => 'Cart is empty'], 400);
            }

            $subtotal = $cartItems->sum(function ($item) {
                return $item->product->price * $item->quantity;
            });

            // Calculate tax (assuming 20% VAT as per frontend)
            $tax = $subtotal * 0.20;
            
            // Shipping (simplified logic matching frontend)
            $shippingCost = 4.99; // Default standard shipping
            if ($request->has('shipping_method')) {
                // In a real app, validate shipping method and price from DB/Config
                $shippingCost = $request->input('shipping_cost', 4.99);
            }

            $total = $subtotal + $tax + $shippingCost;
            $amountInCents = round($total * 100);

            \Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));

            $paymentIntent = \Stripe\PaymentIntent::create([
                'amount' => $amountInCents,
                'currency' => 'gbp',
                'automatic_payment_methods' => [
                    'enabled' => true,
                ],
                'metadata' => [
                    'user_id' => $user->id,
                    'email' => $user->email,
                ],
            ]);

            return response()->json([
                'clientSecret' => $paymentIntent->client_secret,
                'amount' => $total,
            ]);

        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('PaymentController@createPaymentIntent: ' . $e->getMessage());
            return response()->json(['error' => 'Payment initialisation failed. Please try again.'], 500);
        }
    }
}
