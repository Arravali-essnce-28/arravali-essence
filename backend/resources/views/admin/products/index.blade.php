@extends('layouts.admin')

@section('title', 'Products')
@section('header', 'Products Management')

@section('content')
<!-- Header Actions -->
<div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-4">
    <div>
        <h3 class="text-xl sm:text-2xl font-bold text-gray-800">Product Inventory</h3>
        <p class="text-gray-600 mt-1 text-sm sm:text-base">Manage your spice collection</p>
    </div>
    <a href="{{ route('admin.products.create') }}" class="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all duration-200 transform hover:scale-105 shadow-lg text-sm sm:text-base">
        <i class="fas fa-plus mr-2"></i>Add New Product
    </a>
</div>

<!-- Search and Filters -->
<div class="bg-white rounded-lg shadow p-3 sm:p-4 mb-4 sm:mb-6">
    <div class="flex flex-col lg:flex-row gap-3 sm:gap-4">
        <div class="flex-1">
            <div class="relative">
                <input type="text" placeholder="Search products..." class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm">
                <i class="fas fa-search absolute left-3 top-3 text-gray-400 text-sm"></i>
            </div>
        </div>
        <select class="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm">
            <option>All Categories</option>
            <option>Whole Spices</option>
            <option>Ground Spices</option>
            <option>Spice Blends</option>
            <option>Herbs</option>
            <option>Premium Collection</option>
        </select>
        <select class="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm">
            <option>All Status</option>
            <option>In Stock</option>
            <option>Low Stock</option>
            <option>Out of Stock</option>
        </select>
    </div>
</div>

<!-- Products Table -->
<div class="bg-white rounded-lg shadow-lg overflow-hidden">
    <div class="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-4">
        <div class="flex items-center justify-between">
            <h4 class="font-semibold">Products List</h4>
            <span class="text-sm bg-white/20 px-3 py-1 rounded-full">{{ $products->count() }} items</span>
        </div>
    </div>
    
    <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
                <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
                @foreach($products as $product)
                <tr class="hover:bg-gray-50 transition-colors">
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                            <div class="flex-shrink-0 h-16 w-16">
                                <img class="h-16 w-16 rounded-lg object-cover shadow-sm" src="{{ $product->image }}" alt="{{ $product->name }}">
                            </div>
                            <div class="ml-4">
                                <div class="text-sm font-semibold text-gray-900">{{ $product->name }}</div>
                                <div class="text-sm text-gray-500">{{ Str::limit($product->short_description, 60) }}</div>
                                @if($product->is_featured)
                                    <span class="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full mt-1 inline-block">
                                        <i class="fas fa-star mr-1"></i>Featured
                                    </span>
                                @endif
                            </div>
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        @if($product->category)
                            <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                {{ $product->category->name }}
                            </span>
                        @else
                            <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-600">
                                Uncategorized
                            </span>
                        @endif
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        @if($product->sale_price)
                            <div class="flex flex-col">
                                <span class="line-through text-gray-400 text-sm">${{ number_format($product->price, 2) }}</span>
                                <span class="text-red-600 font-bold">${{ number_format($product->sale_price, 2) }}</span>
                                <span class="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full mt-1">
                                    {{ round((1 - $product->sale_price / $product->price) * 100) }}% OFF
                                </span>
                            </div>
                        @else
                            <span class="text-lg font-semibold text-gray-900">${{ number_format($product->price, 2) }}</span>
                        @endif
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                            <span class="px-3 py-1 text-sm rounded-full font-medium {{ $product->quantity > 20 ? 'bg-green-100 text-green-800' : ($product->quantity > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800') }}">
                                {{ $product->quantity }} units
                            </span>
                            @if($product->quantity <= 10 && $product->quantity > 0)
                                <i class="fas fa-exclamation-triangle text-yellow-500 ml-2" title="Low Stock"></i>
                            @endif
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex flex-col gap-1">
                            <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full {{ $product->is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800' }}">
                                {{ $product->is_active ? 'Active' : 'Inactive' }}
                            </span>
                            @if($product->weight)
                                <span class="text-xs text-gray-500">{{ $product->weight }}g</span>
                            @endif
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div class="flex items-center space-x-3">
                            <a href="{{ route('admin.products.edit', $product) }}" class="text-blue-600 hover:text-blue-800 transition-colors" title="Edit">
                                <i class="fas fa-edit"></i>
                            </a>
                            <button onclick="window.open('{{ $product->image }}', '_blank')" class="text-green-600 hover:text-green-800 transition-colors" title="View Image">
                                <i class="fas fa-eye"></i>
                            </button>
                            <form action="{{ route('admin.products.delete', $product) }}" method="POST" class="inline" onsubmit="return confirm('Are you sure you want to delete this product? This action cannot be undone.')">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="text-red-600 hover:text-red-800 transition-colors" title="Delete">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </form>
                        </div>
                    </td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>
    
    <!-- Pagination -->
    @if($products->hasPages())
        <div class="px-6 py-4 border-t bg-gray-50">
            <div class="flex items-center justify-between">
                <div class="text-sm text-gray-700">
                    Showing {{ $products->firstItem() }} to {{ $products->lastItem() }} of {{ $products->total() }} results
                </div>
                {{ $products->links() }}
            </div>
        </div>
    @endif
</div>

<!-- Quick Stats -->
<div class="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
    <div class="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
        <div class="flex items-center justify-between">
            <div>
                <p class="text-blue-100 text-sm">Total Value</p>
                <p class="text-xl font-bold">${{ number_format($products->sum(function($p) { return $p->price * $p->quantity; }), 2) }}</p>
            </div>
            <i class="fas fa-dollar-sign text-2xl text-blue-200"></i>
        </div>
    </div>
    
    <div class="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
        <div class="flex items-center justify-between">
            <div>
                <p class="text-green-100 text-sm">In Stock</p>
                <p class="text-xl font-bold">{{ $products->where('quantity', '>', 0)->count() }}</p>
            </div>
            <i class="fas fa-check-circle text-2xl text-green-200"></i>
        </div>
    </div>
    
    <div class="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg p-4 text-white">
        <div class="flex items-center justify-between">
            <div>
                <p class="text-yellow-100 text-sm">Low Stock</p>
                <p class="text-xl font-bold">{{ $products->where('quantity', '>', 0)->where('quantity', '<=', 10)->count() }}</p>
            </div>
            <i class="fas fa-exclamation-triangle text-2xl text-yellow-200"></i>
        </div>
    </div>
    
    <div class="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 text-white">
        <div class="flex items-center justify-between">
            <div>
                <p class="text-purple-100 text-sm">Featured</p>
                <p class="text-xl font-bold">{{ $products->where('is_featured', true)->count() }}</p>
            </div>
            <i class="fas fa-star text-2xl text-purple-200"></i>
        </div>
    </div>
</div>
@endsection