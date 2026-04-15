<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Models\User;


class AdminController extends Controller
{
    public function dashboard()
    {
        $stats = [
            'total_products' => Product::count(),
            'total_orders' => Order::count(),
            'pending_orders' => Order::where('status', 'pending')->count(),
        ];

        // Get recent orders
        $recentOrders = Order::with('items.product')
            ->latest()
            ->take(5)
            ->get();

        // Get top products (featured or most recent)
        $topProducts = Product::where('is_featured', true)
            ->orWhere('quantity', '>', 0)
            ->latest()
            ->take(5)
            ->get();

        if (request()->wantsJson()) {
            return response()->json([
                'stats' => $stats,
                'recentOrders' => $recentOrders,
                'topProducts' => $topProducts
            ]);
        }

        return view('admin.dashboard', compact('stats', 'recentOrders', 'topProducts'));
    }

    public function products()
    {
        $products = Product::with('category')->paginate(10);
        if (request()->wantsJson()) {
            return response()->json($products);
        }
        return view('admin.products.index', compact('products'));
    }

    public function createProduct()
    {
        $categories = Category::where('is_active', true)->get();
        return view('admin.products.create', compact('categories'));
    }

    public function storeProduct(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'short_description' => 'nullable|string|max:255',
            'price' => 'required|numeric|min:0',
            'sale_price' => 'nullable|numeric|min:0',
            'quantity' => 'required|integer|min:0',
            'weight' => 'nullable|numeric|min:0',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'back_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        $baseSlug = Str::slug($request->name);
        $slug = $baseSlug;
        $count = 1;

        while(Product::where('slug', $slug)->exists()) {
            $slug = $baseSlug . '-' . $count;
            $count++;
        }

        // Improved upload handling
        try {
            if (!$request->hasFile('image')) {
                throw new \Exception('Primary image missing.');
            }

            $imagePath = $request->file('image')->store('products', 'public');
            $backImagePath = $request->hasFile('back_image')
                ? $request->file('back_image')->store('products', 'public')
                : null;

            $product = Product::create([
                'name' => $request->name,
                'slug' => $slug,
                'category_id' => null, // No longer using categories
                'description' => $request->description,
                'short_description' => $request->short_description,
                'price' => $request->price,
                'sale_price' => $request->sale_price,
                'quantity' => $request->quantity,
                'weight' => $request->weight,
                'image' => $imagePath,
                'back_image' => $backImagePath ?: null,
                'is_featured' => $request->has('is_featured'),
                'is_active' => $request->has('is_active'),
            ]);

            return redirect()->route('admin.products')->with('success', 'Product created successfully!');
        } catch (\Exception $e) {
            return redirect()->back()
                ->withInput()
                ->with('error', 'Upload failed: ' . $e->getMessage());
        }
    }

    public function editProduct(Product $product)
    {
        $categories = Category::where('is_active', true)->get();
        if (request()->wantsJson()) {
            $product->load('category');
            return response()->json([
                'product' => $product,
                'categories' => $categories
            ]);
        }
        return view('admin.products.edit', compact('product', 'categories'));
    }

    public function updateProduct(Request $request, Product $product)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'short_description' => 'nullable|string|max:255',
            'price' => 'required|numeric|min:0',
            'sale_price' => 'nullable|numeric|min:0',
            'quantity' => 'required|integer|min:0',
            'weight' => 'nullable|numeric|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'back_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        try {
            $data = [
                'name' => $request->name,
                'category_id' => null, // Explicitly nullify for clarity
                'description' => $request->description,
                'short_description' => $request->short_description,
                'price' => $request->price,
                'sale_price' => $request->sale_price,
                'quantity' => $request->quantity,
                'weight' => $request->weight,
                'is_featured' => $request->has('is_featured'),
                'is_active' => $request->has('is_active'),
            ];

            if ($request->hasFile('image')) {
                $data['image'] = $request->file('image')->store('products', 'public');
            }

            if ($request->hasFile('back_image')) {
                $data['back_image'] = $request->file('back_image')->store('products', 'public');
            }

            $product->update($data);

            return redirect()->route('admin.products')->with('success', 'Product updated successfully!');
        } catch (\Exception $e) {
            return redirect()->back()
                ->withInput()
                ->with('error', 'Update failed: ' . $e->getMessage());
        }
    }

    public function deleteProduct(Product $product)
    {
        $product->delete();
        
        if (request()->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Product deleted successfully!'
            ]);
        }

        return redirect()->route('admin.products')->with('success', 'Product deleted successfully!');
    }

    public function orders()
    {
        $orders = Order::with(['user', 'items.product'])->latest()->paginate(10);
        return view('admin.orders.index', compact('orders'));
    }

    public function showOrder(Order $order)
    {
        $order->load(['user', 'items.product', 'tracking']);
        return view('admin.orders.show', compact('order'));
    }

    public function updateOrderStatus(Request $request, Order $order)
    {
        $request->validate([
            'status' => 'required|string|in:pending,processing,shipped,delivered,cancelled'
        ]);

        $order->update(['status' => $request->status]);

        // Create tracking entry
        $order->tracking()->create([
            'status' => $request->status,
            'description' => 'Order status updated to ' . ucfirst($request->status),
            'location' => 'Admin Panel'
        ]);

        return redirect()->back()->with('success', 'Order status updated successfully!');
    }

    public function users()
    {
        $users = User::where('id', '!=', auth()->id())
            ->latest()
            ->paginate(10);
            
        return view('admin.users.index', compact('users'));
    }

    public function deleteUser(User $user)
    {
        if ($user->id === auth()->id()) {
            return redirect()->back()->with('error', 'You cannot delete your own account');
        }

        $user->delete();

        return redirect()->back()->with('success', 'User deleted successfully');
    }

    public function userDetails(User $user)
    {
        $user->load(['orders' => function($query) {
            $query->latest();
        }, 'orders.items.product']);

        return view('admin.users.show', compact('user'));
    }
}