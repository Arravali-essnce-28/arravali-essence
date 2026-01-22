<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);

$kernel->bootstrap();

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\User;
use App\Models\OrderTracking;

// Create or get a test user
$user = User::firstOrCreate([
    'email' => 'test@example.com'
], [
    'name' => 'Test User',
    'password' => bcrypt('password123')
]);

// Get a product
$product = Product::first();
if (!$product) {
    echo "No products found. Please seed products first.\n";
    exit;
}

// Create a test order
$order = Order::create([
    'user_id' => $user->id,
    'order_number' => 'ORD-' . strtoupper(uniqid()),
    'status' => 'shipped',
    'total_amount' => $product->price * 2,
    'shipping_address' => json_encode([
        'name' => 'Test User',
        'email' => 'test@example.com',
        'phone' => '+1234567890',
        'address' => '123 Test Street',
        'city' => 'Test City',
        'postal_code' => '12345'
    ]),
    'billing_address' => json_encode([
        'name' => 'Test User',
        'email' => 'test@example.com',
        'phone' => '+1234567890',
        'address' => '123 Test Street',
        'city' => 'Test City',
        'postal_code' => '12345'
    ]),
    'payment_method' => 'card',
    'payment_status' => 'paid'
]);

// Create order items
OrderItem::create([
    'order_id' => $order->id,
    'product_id' => $product->id,
    'quantity' => 2,
    'price' => $product->price,
    'total' => $product->price * 2
]);

// Create tracking history
$trackingSteps = [
    [
        'status' => 'pending',
        'description' => 'Order has been received and is pending confirmation',
        'location' => 'Processing Center',
        'created_at' => now()->subDays(3)
    ],
    [
        'status' => 'confirmed',
        'description' => 'Order has been confirmed and is being processed',
        'location' => 'Processing Center',
        'created_at' => now()->subDays(3)->addHours(2)
    ],
    [
        'status' => 'processing',
        'description' => 'Order is being prepared for shipment',
        'location' => 'Warehouse',
        'created_at' => now()->subDays(3)->addHours(6)
    ],
    [
        'status' => 'packed',
        'description' => 'Order has been packed and is ready for shipment',
        'location' => 'Warehouse',
        'created_at' => now()->subDays(3)->addHours(12)
    ],
    [
        'status' => 'shipped',
        'description' => 'Order has been shipped',
        'location' => 'Distribution Center',
        'tracking_number' => 'TRK' . strtoupper(uniqid()),
        'carrier' => 'Express Delivery',
        'estimated_delivery' => now()->addDays(2),
        'created_at' => now()->subDays(2)
    ]
];

foreach ($trackingSteps as $step) {
    OrderTracking::create(array_merge($step, ['order_id' => $order->id]));
}

echo "Test order created successfully!\n";
echo "Order Number: {$order->order_number}\n";
echo "Status: {$order->status}\n";
echo "Total: {$order->total_amount}\n";
echo "Tracking Entries: " . count($trackingSteps) . "\n";

// Test API endpoint
echo "\n=== TESTING API ENDPOINT ===\n";
$app->make('Illuminate\Contracts\Http\Kernel')
    ->handle(Illuminate\Http\Request::create("/api/track/{$order->order_number}", 'GET'));
