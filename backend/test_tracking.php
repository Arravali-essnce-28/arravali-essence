<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);

$kernel->bootstrap();

// Get all orders
$orders = App\Models\Order::with('tracking')->get();

echo "=== ORDERS ===\n";
foreach ($orders as $order) {
    echo "Order Number: {$order->order_number}\n";
    echo "Status: {$order->status}\n";
    echo "Total: {$order->total_amount}\n";
    echo "Tracking Entries: " . $order->tracking->count() . "\n";
    echo "---\n";
}

// Test tracking for first order
if ($orders->count() > 0) {
    $firstOrder = $orders->first();
    echo "\n=== TRACKING TEST FOR {$firstOrder->order_number} ===\n";
    
    $tracking = $firstOrder->tracking;
    foreach ($tracking as $track) {
        echo "Status: {$track->status} - {$track->description}\n";
        echo "Location: {$track->location}\n";
        echo "Time: {$track->created_at}\n";
        echo "---\n";
    }
}
