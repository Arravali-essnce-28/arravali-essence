@extends('layouts.admin')

@section('title', 'Order Details')
@section('header')
<div class="flex items-center gap-4">
    <a href="{{ route('admin.orders') }}" class="text-gray-500 hover:text-gray-700">
        <i class="fas fa-arrow-left"></i>
    </a>
    Order #{{ $order->order_number }}
</div>
@endsection

@section('content')
<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <!-- Order Information -->
    <div class="lg:col-span-2 space-y-6">
        <!-- Items -->
        <div class="bg-white rounded-lg shadow-sm p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Order Items</h3>
            <div class="divide-y divide-gray-200">
                @foreach($order->items as $item)
                <div class="py-4 flex items-center">
                    <div class="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img src="{{ $item->product ? $item->product->image : 'https://via.placeholder.com/150' }}" 
                             alt="{{ $item->product_name }}" 
                             class="h-full w-full object-cover object-center">
                    </div>
                    <div class="ml-4 flex-1">
                        <div class="flex justify-between text-base font-medium text-gray-900">
                            <h3>{{ $item->product_name }}</h3>
                            <p>£{{ number_format($item->price * $item->quantity, 2) }}</p>
                        </div>
                        <p class="mt-1 text-sm text-gray-500">Qty {{ $item->quantity }} x £{{ number_format($item->price, 2) }}</p>
                    </div>
                </div>
                @endforeach
            </div>
            <div class="border-t border-gray-200 mt-4 pt-4">
                <div class="flex justify-between text-base font-medium text-gray-900">
                    <p>Total</p>
                    <p>£{{ number_format($order->total_amount, 2) }}</p>
                </div>
            </div>
        </div>

        <!-- Shipping Address -->
        <div class="bg-white rounded-lg shadow-sm p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Shipping Information</h3>
            <dl class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 text-sm">
                <div>
                    <dt class="font-medium text-gray-500">Name</dt>
                    <dd class="mt-1 text-gray-900">{{ $order->shipping_address['first_name'] }} {{ $order->shipping_address['last_name'] }}</dd>
                </div>
                <div>
                    <dt class="font-medium text-gray-500">Email</dt>
                    <dd class="mt-1 text-gray-900">{{ $order->shipping_address['email'] }}</dd>
                </div>
                <div>
                    <dt class="font-medium text-gray-500">Phone</dt>
                    <dd class="mt-1 text-gray-900">{{ $order->shipping_address['phone'] ?? 'N/A' }}</dd>
                </div>
                <div class="sm:col-span-2">
                    <dt class="font-medium text-gray-500">Address</dt>
                    <dd class="mt-1 text-gray-900">
                        {{ $order->shipping_address['address'] }}<br>
                        {{ $order->shipping_address['city'] }}, {{ $order->shipping_address['state'] }} {{ $order->shipping_address['postal_code'] }}<br>
                        {{ $order->shipping_address['country'] }}
                    </dd>
                </div>
            </dl>
        </div>
    </div>

    <!-- Actions -->
    <div class="lg:col-span-1 space-y-6">
        <!-- Status -->
        <div class="bg-white rounded-lg shadow-sm p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Order Status</h3>
            <form action="{{ route('admin.orders.update-status', $order) }}" method="POST">
                @csrf
                @method('PUT')
                <div class="space-y-4">
                    <div>
                        <label for="status" class="block text-sm font-medium text-gray-700">Current Status</label>
                        <select name="status" id="status" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                            <option value="pending" {{ $order->status === 'pending' ? 'selected' : '' }}>Pending</option>
                            <option value="processing" {{ $order->status === 'processing' ? 'selected' : '' }}>Processing</option>
                            <option value="shipped" {{ $order->status === 'shipped' ? 'selected' : '' }}>Shipped</option>
                            <option value="delivered" {{ $order->status === 'delivered' ? 'selected' : '' }}>Delivered</option>
                            <option value="cancelled" {{ $order->status === 'cancelled' ? 'selected' : '' }}>Cancelled</option>
                        </select>
                    </div>
                    <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Update Status
                    </button>
                </div>
            </form>
        </div>

        <!-- Customer -->
        <div class="bg-white rounded-lg shadow-sm p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Customer</h3>
            @if($order->user)
                <div class="flex items-center">
                    <div class="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
                        {{ substr($order->user->name, 0, 1) }}
                    </div>
                    <div class="ml-3">
                        <p class="text-sm font-medium text-gray-900">{{ $order->user->name }}</p>
                        <p class="text-sm text-gray-500">{{ $order->user->email }}</p>
                        <a href="{{ route('admin.users.show', $order->user) }}" class="text-xs text-indigo-600 hover:text-indigo-900 mt-1 block">View Profile</a>
                    </div>
                </div>
            @else
                <p class="text-sm text-gray-500">Guest Checkout</p>
            @endif
        </div>
    </div>
</div>
@endsection
