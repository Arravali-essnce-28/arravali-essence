@extends('layouts.admin')

@section('title', 'Add New Product')
@section('header', 'Add New Product')

@section('content')
<div class="max-w-6xl mx-auto">
    <!-- Header -->
    <div class="mb-8">
        <div class="flex items-center justify-between">
            <div>
                <h2 class="text-3xl font-bold text-gray-800">Add New Product</h2>
                <p class="text-gray-600 mt-2">Create a new spice product for your inventory</p>
            </div>
            <a href="{{ route('admin.products') }}" class="text-gray-600 hover:text-gray-800 transition-colors">
                <i class="fas fa-arrow-left mr-2"></i>Back to Products
            </a>
        </div>
    </div>

    <form action="{{ route('admin.products.store') }}" method="POST" enctype="multipart/form-data" class="space-y-8">
        @csrf

        <!-- Basic Information -->
        <div class="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div class="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-4">
                <h3 class="text-lg font-semibold flex items-center">
                    <i class="fas fa-info-circle mr-2"></i>Basic Information
                </h3>
            </div>
            
            <div class="p-6 space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="md:col-span-2">
                        <label for="name" class="block text-sm font-semibold text-gray-700 mb-2">Product Name *</label>
                        <input type="text" name="name" id="name" required
                               class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                               value="{{ old('name') }}" placeholder="Premium Green Cardamom Pods">
                        @error('name')
                            <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                        @enderror
                    </div>



                    <div>
                        <label for="weight" class="block text-sm font-semibold text-gray-700 mb-2">Weight (grams)</label>
                        <input type="number" name="weight" id="weight" min="1"
                               class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                               value="{{ old('weight', 100) }}" placeholder="100">
                        @error('weight')
                            <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                        @enderror
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label for="short_description" class="block text-sm font-semibold text-gray-700 mb-2">Short Description *</label>
                        <textarea name="short_description" id="short_description" rows="3" required
                                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                                  placeholder="Brief description for product listings">{{ old('short_description') }}</textarea>
                        @error('short_description')
                            <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                        @enderror
                    </div>

                    <div>
                        <label for="description" class="block text-sm font-semibold text-gray-700 mb-2">Full Description *</label>
                        <textarea name="description" id="description" rows="3" required
                                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                                  placeholder="Detailed product description">{{ old('description') }}</textarea>
                        @error('description')
                            <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                        @enderror
                    </div>
                </div>
            </div>
        </div>

        <!-- Pricing & Inventory -->
        <div class="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div class="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-4">
                <h3 class="text-lg font-semibold flex items-center">
                    <i class="fas fa-dollar-sign mr-2"></i>Pricing & Inventory
                </h3>
            </div>
            
            <div class="p-6 space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div>
                        <label for="price" class="block text-sm font-semibold text-gray-700 mb-2">Regular Price ($) *</label>
                        <input type="number" name="price" id="price" step="0.01" min="0" required
                               class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                               value="{{ old('price') }}" placeholder="24.99">
                        @error('price')
                            <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                        @enderror
                    </div>

                    <div>
                        <label for="sale_price" class="block text-sm font-semibold text-gray-700 mb-2">Sale Price ($)</label>
                        <input type="number" name="sale_price" id="sale_price" step="0.01" min="0"
                               class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                               value="{{ old('sale_price') }}" placeholder="19.99">
                        @error('sale_price')
                            <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                        @enderror
                    </div>

                    <div>
                        <label for="quantity" class="block text-sm font-semibold text-gray-700 mb-2">Stock Quantity *</label>
                        <input type="number" name="quantity" id="quantity" min="0" required
                               class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                               value="{{ old('quantity', 50) }}" placeholder="50">
                        @error('quantity')
                            <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                        @enderror
                    </div>

                    <div>
                        <label for="sku" class="block text-sm font-semibold text-gray-700 mb-2">SKU</label>
                        <input type="text" name="sku" id="sku"
                               class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                               value="{{ old('sku') }}" placeholder="SPICE-001">
                        @error('sku')
                            <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                        @enderror
                    </div>
                </div>
            </div>
        </div>

        <!-- Media -->
        <div class="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div class="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-4">
                <h3 class="text-lg font-semibold flex items-center">
                    <i class="fas fa-image mr-2"></i>Product Images
                </h3>
            </div>
            
            <div class="p-6 space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <!-- Main Image -->
                    <div>
                        <label for="image" class="block text-sm font-semibold text-gray-700 mb-2">Main Image (Front View) *</label>
                        <div class="mt-1 flex flex-col items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg bg-gray-50 hover:bg-white transition-all cursor-pointer" onclick="document.getElementById('image').click()">
                            <i class="fas fa-camera-retro text-3xl text-gray-400 mb-2"></i>
                            <span class="text-sm text-purple-600 font-medium">Click to select front photo</span>
                            <p class="text-xs text-gray-400 mt-1">Max size: 2MB (PNG, JPG, WEBP)</p>
                            <input id="image" name="image" type="file" class="hidden" required accept="image/*" onchange="previewImage(this, 'front-preview')">
                        </div>
                        @error('image')
                            <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                        @enderror
                        <div id="front-preview" class="mt-4 hidden h-40 w-full rounded-lg overflow-hidden border-2 border-primary-100 shadow-sm">
                            <img src="" class="h-full w-full object-cover">
                        </div>
                    </div>

                    <!-- Back Image -->
                    <div>
                        <label for="back_image" class="block text-sm font-semibold text-gray-700 mb-2">Back Image (Optional)</label>
                        <div class="mt-1 flex flex-col items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg bg-gray-50 hover:bg-white transition-all cursor-pointer" onclick="document.getElementById('back_image').click()">
                            <i class="fas fa-file-image text-3xl text-gray-400 mb-2"></i>
                            <span class="text-sm text-purple-600 font-medium">Click to select back photo</span>
                            <input id="back_image" name="back_image" type="file" class="hidden" accept="image/*" onchange="previewImage(this, 'back-preview')">
                        </div>
                        @error('back_image')
                            <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                        @enderror
                        <div id="back-preview" class="mt-4 hidden h-40 w-full rounded-lg overflow-hidden border-2 border-primary-100 shadow-sm">
                            <img src="" class="h-full w-full object-cover">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <script>
            function previewImage(input, previewId) {
                const preview = document.getElementById(previewId);
                const img = preview.querySelector('img');
                
                if (input.files && input.files[0]) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        img.src = e.target.result;
                        preview.classList.remove('hidden');
                    }
                    reader.readAsDataURL(input.files[0]);
                } else {
                    preview.classList.add('hidden');
                }
            }
        </script>

        <!-- Settings -->
        <div class="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div class="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-4">
                <h3 class="text-lg font-semibold flex items-center">
                    <i class="fas fa-cog mr-2"></i>Product Settings
                </h3>
            </div>
            
            <div class="p-6 space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="flex items-center space-x-3">
                        <input type="checkbox" name="is_active" id="is_active" value="1" {{ old('is_active', '1') ? 'checked' : '' }}
                               class="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500">
                        <label for="is_active" class="text-sm font-medium text-gray-700">Active Product</label>
                    </div>

                    <div class="flex items-center space-x-3">
                        <input type="checkbox" name="is_featured" id="is_featured" value="1" {{ old('is_featured') ? 'checked' : '' }}
                               class="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500">
                        <label for="is_featured" class="text-sm font-medium text-gray-700">Featured Product</label>
                    </div>
                </div>
            </div>
        </div>

        <!-- Submit Actions -->
        <div class="flex justify-end space-x-4">
            <a href="{{ route('admin.products') }}" class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Cancel
            </a>
            <button type="submit" class="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-3 rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all duration-200 transform hover:scale-105 shadow-lg">
                <i class="fas fa-save mr-2"></i>Create Product
            </button>
        </div>
    </form>
</div>
@endsection