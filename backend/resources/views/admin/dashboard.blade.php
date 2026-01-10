@extends('layouts.admin')

@section('title', 'Dashboard')
@section('header', 'Dashboard')

@section('content')
<!-- Stats Overview -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
    <!-- Total Products -->
    <div class="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg p-4 sm:p-6 text-white transform hover:scale-105 transition-transform duration-200">
        <div class="flex items-center justify-between">
            <div>
                <p class="text-blue-100 text-xs sm:text-sm font-medium">Total Products</p>
                <p class="text-2xl sm:text-3xl font-bold mt-1 sm:mt-2">{{ $stats['total_products'] }}</p>
                <p class="text-blue-100 text-xs mt-1">Active inventory</p>
            </div>
            <div class="bg-white/20 p-2 sm:p-3 rounded-full">
                <i class="fas fa-box text-lg sm:text-2xl"></i>
            </div>
        </div>
    </div>

    <!-- Total Categories -->
    <div class="bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-lg p-4 sm:p-6 text-white transform hover:scale-105 transition-transform duration-200">
        <div class="flex items-center justify-between">
            <div>
                <p class="text-green-100 text-xs sm:text-sm font-medium">Categories</p>
                <p class="text-2xl sm:text-3xl font-bold mt-1 sm:mt-2">{{ $stats['total_categories'] }}</p>
                <p class="text-green-100 text-xs mt-1">Product types</p>
            </div>
            <div class="bg-white/20 p-2 sm:p-3 rounded-full">
                <i class="fas fa-tags text-lg sm:text-2xl"></i>
            </div>
        </div>
    </div>

    <!-- Total Orders -->
    <div class="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg shadow-lg p-4 sm:p-6 text-white transform hover:scale-105 transition-transform duration-200">
        <div class="flex items-center justify-between">
            <div>
                <p class="text-purple-100 text-xs sm:text-sm font-medium">Total Orders</p>
                <p class="text-2xl sm:text-3xl font-bold mt-1 sm:mt-2">{{ $stats['total_orders'] }}</p>
                <p class="text-purple-100 text-xs mt-1">All time sales</p>
            </div>
            <div class="bg-white/20 p-2 sm:p-3 rounded-full">
                <i class="fas fa-shopping-cart text-lg sm:text-2xl"></i>
            </div>
        </div>
    </div>

    <!-- Pending Orders -->
    <div class="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg shadow-lg p-4 sm:p-6 text-white transform hover:scale-105 transition-transform duration-200">
        <div class="flex items-center justify-between">
            <div>
                <p class="text-orange-100 text-xs sm:text-sm font-medium">Pending Orders</p>
                <p class="text-2xl sm:text-3xl font-bold mt-1 sm:mt-2">{{ $stats['pending_orders'] }}</p>
                <p class="text-orange-100 text-xs mt-1">Need attention</p>
            </div>
            <div class="bg-white/20 p-2 sm:p-3 rounded-full">
                <i class="fas fa-clock text-lg sm:text-2xl"></i>
            </div>
        </div>
    </div>
</div>

<!-- Quick Actions & Recent Activity -->
<div class="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
    <!-- Quick Actions -->
    <div class="lg:col-span-2 bg-white rounded-lg shadow-lg p-4 sm:p-6">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-2">
            <h3 class="text-lg font-semibold text-gray-800">Quick Actions</h3>
            <span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">Admin Tools</span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <a href="{{ route('admin.products.create') }}" class="group flex items-center p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg hover:from-blue-100 hover:to-blue-200 transition-all duration-200">
                <div class="bg-blue-500 p-2 sm:p-3 rounded-lg group-hover:bg-blue-600 transition-colors">
                    <i class="fas fa-plus text-white text-sm sm:text-base"></i>
                </div>
                <div class="ml-3 sm:ml-4">
                    <p class="font-semibold text-gray-800 text-sm sm:text-base">Add Product</p>
                    <p class="text-sm text-gray-600">Create new item</p>
                </div>
            </a>
            
            <a href="{{ route('admin.products') }}" class="group flex items-center p-3 sm:p-4 bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-lg hover:from-green-100 hover:to-green-200 transition-all duration-200">
                <div class="bg-green-500 p-2 sm:p-3 rounded-lg group-hover:bg-green-600 transition-colors">
                    <i class="fas fa-list text-white text-sm sm:text-base"></i>
                </div>
                <div class="ml-3 sm:ml-4">
                    <p class="font-semibold text-gray-800 text-sm sm:text-base">Manage Products</p>
                    <p class="text-sm text-gray-600">View all items</p>
                </div>
            </a>
            
            <a href="#" class="group flex items-center p-3 sm:p-4 bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-lg hover:from-purple-100 hover:to-purple-200 transition-all duration-200">
                <div class="bg-purple-500 p-2 sm:p-3 rounded-lg group-hover:bg-purple-600 transition-colors">
                    <i class="fas fa-chart-line text-white text-sm sm:text-base"></i>
                </div>
                <div class="ml-3 sm:ml-4">
                    <p class="font-semibold text-gray-800 text-sm sm:text-base">Analytics</p>
                    <p class="text-sm text-gray-600">View reports</p>
                </div>
            </a>
            
            <a href="#" class="group flex items-center p-3 sm:p-4 bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-lg hover:from-orange-100 hover:to-orange-200 transition-all duration-200">
                <div class="bg-orange-500 p-2 sm:p-3 rounded-lg group-hover:bg-orange-600 transition-colors">
                    <i class="fas fa-users text-white text-sm sm:text-base"></i>
                </div>
                <div class="ml-3 sm:ml-4">
                    <p class="font-semibold text-gray-800 text-sm sm:text-base">Customers</p>
                    <p class="text-sm text-gray-600">Manage users</p>
                </div>
            </a>
        </div>
    </div>

    <!-- System Status -->
    <div class="bg-white rounded-lg shadow-lg p-4 sm:p-6">
        <div class="flex items-center justify-between mb-4 sm:mb-6">
            <h3 class="text-lg font-semibold text-gray-800">System Status</h3>
            <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        </div>
        <div class="space-y-3 sm:space-y-4">
            <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">API Status</span>
                <span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Online</span>
            </div>
            <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">Database</span>
                <span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Connected</span>
            </div>
            <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">Storage</span>
                <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">45% Used</span>
            </div>
            <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">Last Backup</span>
                <span class="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">2 hrs ago</span>
            </div>
        </div>
    </div>
</div>

<!-- Recent Orders & Top Products -->
<div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
    <!-- Recent Orders -->
    <div class="bg-white rounded-lg shadow-lg p-4 sm:p-6">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-2">
            <h3 class="text-lg font-semibold text-gray-800">Recent Orders</h3>
            <a href="#" class="text-sm text-blue-600 hover:text-blue-800">View All</a>
        </div>
        <div class="space-y-2 sm:space-y-3">
            @if(isset($recentOrders) && count($recentOrders) > 0)
                @foreach($recentOrders as $order)
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors gap-2">
                    <div>
                        <p class="font-medium text-gray-800 text-sm sm:text-base">{{ $order->order_number }}</p>
                        <p class="text-sm text-gray-600">${{ number_format($order->total_amount, 2) }}</p>
                    </div>
                    <span class="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">{{ $order->status }}</span>
                </div>
                @endforeach
            @else
                <div class="text-center py-6 sm:py-8">
                    <i class="fas fa-shopping-cart text-gray-300 text-3xl sm:text-4xl mb-3"></i>
                    <p class="text-gray-500 text-sm sm:text-base">No recent orders</p>
                </div>
            @endif
        </div>
    </div>

    <!-- Top Products -->
    <div class="bg-white rounded-lg shadow-lg p-4 sm:p-6">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-2">
            <h3 class="text-lg font-semibold text-gray-800">Top Products</h3>
            <a href="{{ route('admin.products') }}" class="text-sm text-blue-600 hover:text-blue-800">Manage</a>
        </div>
        <div class="space-y-2 sm:space-y-3">
            @if(isset($topProducts) && count($topProducts) > 0)
                @foreach($topProducts as $product)
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors gap-2">
                    <div class="flex items-center">
                        <div class="w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                            <i class="fas fa-box text-orange-600 text-sm sm:text-base"></i>
                        </div>
                        <div>
                            <p class="font-medium text-gray-800 text-sm sm:text-base">{{ Str::limit($product->name, 20) }}</p>
                            <p class="text-sm text-gray-600">${{ number_format($product->price, 2) }}</p>
                        </div>
                    </div>
                    <span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">In Stock</span>
                </div>
                @endforeach
            @else
                <div class="text-center py-6 sm:py-8">
                    <i class="fas fa-box text-gray-300 text-3xl sm:text-4xl mb-3"></i>
                    <p class="text-gray-500 text-sm sm:text-base">No products available</p>
                </div>
            @endif
        </div>
    </div>
</div>
@endsection