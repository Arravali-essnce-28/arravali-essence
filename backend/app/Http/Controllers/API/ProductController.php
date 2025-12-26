<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\ProductCollection;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index(): ProductCollection
    {
        $products = Product::with('category')
            ->when(request()->has('search'), function ($query) {
                $search = request('search');
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhere('sku', 'like', "%{$search}%");
            })
            ->when(request()->has('category_id'), function ($query) {
                $query->where('category_id', request('category_id'));
            })
            ->when(request()->has('is_featured'), function ($query) {
                $query->where('is_featured', request()->boolean('is_featured'));
            })
            ->when(request()->has('is_active'), function ($query) {
                $query->where('is_active', request()->boolean('is_active'));
            })
            ->when(request()->has('min_price'), function ($query) {
                $query->where('price', '>=', request('min_price'));
            })
            ->when(request()->has('max_price'), function ($query) {
                $query->where('price', '<=', request('max_price'));
            })
            ->when(request()->has('in_stock'), function ($query) {
                $query->where('quantity', '>', 0);
            })
            ->when(request()->has('sort_by'), function ($query) {
                $sortOrder = request('sort_order', 'asc');
                $query->orderBy(request('sort_by'), $sortOrder);
            }, function ($query) {
                $query->latest();
            });

        $perPage = request('per_page', 15);
        $products = $products->paginate($perPage);

        return new ProductCollection($products);
    }

    public function store(StoreProductRequest $request): JsonResponse
    {
        $data = $request->validated();

        // Handle main image upload
        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('products', 'public');
        }

        // Handle gallery images
        if ($request->hasFile('gallery')) {
            $gallery = [];
            foreach ($request->file('gallery') as $image) {
                $gallery[] = $image->store('products/gallery', 'public');
            }
            $data['gallery'] = $gallery;
        }

        // Generate unique slug
        $baseSlug = Str::slug($data['name']);
        $slug = $baseSlug;
        $count = 1;

        while (Product::where('slug', $slug)->exists()) {
            $slug = $baseSlug . '-' . $count;
            $count++;
        }

        $data['slug'] = $slug;

        $product = Product::create($data);

        return response()->json([
            'message' => 'Product created successfully',
            'data' => new ProductResource($product->load('category'))
        ], 201);
    }

    public function show(Product $product): JsonResponse
    {
        return response()->json([
            'data' => new ProductResource($product->load('category'))
        ]);
    }

    public function update(UpdateProductRequest $request, Product $product): JsonResponse
    {
        $data = $request->validated();

        // Handle main image update
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($product->image) {
                Storage::disk('public')->delete($product->image);
            }
            $data['image'] = $request->file('image')->store('products', 'public');
        }

        // Handle gallery images update
        if ($request->hasFile('gallery')) {
            // Delete old gallery images if they exist
            if ($product->gallery) {
                foreach ($product->gallery as $image) {
                    Storage::disk('public')->delete($image);
                }
            }

            $gallery = [];
            foreach ($request->file('gallery') as $image) {
                $gallery[] = $image->store('products/gallery', 'public');
            }
            $data['gallery'] = $gallery;
        }

        $product->update($data);

        return response()->json([
            'message' => 'Product updated successfully',
            'data' => new ProductResource($product->load('category'))
        ]);
    }

    public function destroy(Product $product): JsonResponse
    {
        // Delete associated images if they exist
        if ($product->image) {
            Storage::disk('public')->delete($product->image);
        }

        if ($product->gallery) {
            foreach ($product->gallery as $image) {
                Storage::disk('public')->delete($image);
            }
        }

        $product->delete();

        return response()->json([
            'message' => 'Product deleted successfully'
        ], 204);
    }
}