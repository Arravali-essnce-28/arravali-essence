@extends('layouts.admin')

@section('title', 'Add New Product')
@section('header', 'Add New Product')

@section('content')
<div class="max-w-5xl mx-auto space-y-8">
    <form action="{{ route('admin.products.store') }}" method="POST" enctype="multipart/form-data" class="space-y-8">
        @csrf

        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                    <h3 class="text-xl font-semibold text-gray-800">Product identity</h3>
                    <p class="text-sm text-gray-500">Name and categorize the product so it is easy to find later.</p>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="md:col-span-2">
                    <label for="name" class="block text-sm font-medium text-gray-700 mb-2">Product name *</label>
                    <input type="text" name="name" id="name" required
                           class="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                           value="{{ old('name') }}" placeholder="Summer Spice Blend">
                    @error('name')
                        <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <label for="category_id" class="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select name="category_id" id="category_id"
                            class="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                        <option value="">Select category</option>
                        @foreach($categories as $category)
                            <option value="{{ $category->id }}" {{ old('category_id') == $category->id ? 'selected' : '' }}>
                                {{ $category->name }}
                            </option>
                        @endforeach
                    </select>
                    @error('category_id')
                        <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <label for="weight" class="block text-sm font-medium text-gray-700 mb-2">Weight (grams)</label>
                    <input type="number" name="weight" id="weight" step="0.01"
                           class="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                           value="{{ old('weight') }}" placeholder="100">
                    @error('weight')
                        <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                    @enderror
                </div>
            </div>
        </div>

        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                    <h3 class="text-xl font-semibold text-gray-800">Pricing & inventory</h3>
                    <p class="text-sm text-gray-500">Control how the product is priced and stocked.</p>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label for="price" class="block text-sm font-medium text-gray-700 mb-2">Regular price ($) *</label>
                    <input type="number" name="price" id="price" step="0.01" required
                           class="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                           value="{{ old('price') }}" placeholder="19.99">
                    @error('price')
                        <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <label for="sale_price" class="block text-sm font-medium text-gray-700 mb-2">Sale price ($)</label>
                    <input type="number" name="sale_price" id="sale_price" step="0.01"
                           class="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                           value="{{ old('sale_price') }}" placeholder="15.99">
                    @error('sale_price')
                        <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <label for="quantity" class="block text-sm font-medium text-gray-700 mb-2">Stock quantity *</label>
                    <input type="number" name="quantity" id="quantity" required min="0"
                           class="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                           value="{{ old('quantity', 0) }}" placeholder="50">
                    @error('quantity')
                        <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Product status</label>
                    <div class="flex flex-wrap gap-6 mt-2">
                        <label class="flex items-center space-x-2">
                            <input type="checkbox" name="is_featured" value="1" {{ old('is_featured') ? 'checked' : '' }}
                                   class="rounded border-gray-300 text-primary-600 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50">
                            <span class="text-sm text-gray-700">Featured product</span>
                        </label>
                        <label class="flex items-center space-x-2">
                            <input type="checkbox" name="is_active" value="1" {{ old('is_active', true) ? 'checked' : '' }}
                                   class="rounded border-gray-300 text-primary-600 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50">
                            <span class="text-sm text-gray-700">Active</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                    <h3 class="text-xl font-semibold text-gray-800">Product imagery</h3>
                    <p class="text-sm text-gray-500">Upload clear photos of both the front and the back of the product.</p>
                </div>
                <span class="inline-flex items-center text-xs font-medium uppercase tracking-wide text-primary-600 bg-primary-50 px-3 py-1 rounded-full">Media</span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label for="image" class="block text-sm font-medium text-gray-700 mb-3">Front image *</label>
                    <div class="flex items-center space-x-4">
                        <div class="w-24 h-24 rounded-xl bg-gray-50 border border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-sm">
                            <span>Front</span>
                        </div>
                        <div class="flex-1">
                            <input type="file" name="image" id="image" accept="image/*" required
                                   class="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-600 hover:file:bg-primary-100">
                            <p class="mt-2 text-xs text-gray-500">JPG, PNG, GIF up to 2MB.</p>
                            @error('image')
                                <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                            @enderror
                        </div>
                    </div>
                </div>

                <div>
                    <label for="back_image" class="block text-sm font-medium text-gray-700 mb-3">Back image</label>
                    <div class="flex items-center space-x-4">
                        <div class="w-24 h-24 rounded-xl bg-gray-50 border border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-sm">
                            <span>Back</span>
                        </div>
                        <div class="flex-1">
                            <input type="file" name="back_image" id="back_image" accept="image/*"
                                   class="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-600 hover:file:bg-primary-100">
                            <p class="mt-2 text-xs text-gray-500">Optional but recommended for a complete view.</p>
                            @error('back_image')
                                <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                            @enderror
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                    <h3 class="text-xl font-semibold text-gray-800">Product copy</h3>
                    <p class="text-sm text-gray-500">Help customers understand why they should care.</p>
                </div>
            </div>

            <div class="space-y-6">
                <div>
                    <label for="short_description" class="block text-sm font-medium text-gray-700 mb-2">Short description</label>
                    <input type="text" name="short_description" id="short_description"
                           class="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                           value="{{ old('short_description') }}" placeholder="One-line teaser shown across the store">
                    @error('short_description')
                        <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <label for="description" class="block text-sm font-medium text-gray-700 mb-2">Full description *</label>
                    <textarea name="description" id="description" rows="5" required
                              class="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                              placeholder="Share ingredients, flavor notes, and serving suggestions">{{ old('description') }}</textarea>
                    @error('description')
                        <p class="mt-1 text-sm text-red-600">{{ $message }}</p>
                    @enderror
                </div>
            </div>
        </div>

        <div class="flex flex-col md:flex-row md:justify-end md:items-center gap-3 md:gap-4 pt-4">
            <a href="{{ route('admin.products') }}" class="inline-flex items-center justify-center px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">Cancel</a>
            <button type="submit" class="inline-flex items-center justify-center px-6 py-2.5 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-400">Create product</button>
        </div>
    </form>
</div>
@endsection