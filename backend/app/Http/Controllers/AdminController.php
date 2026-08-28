<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Models\User;
use Cloudinary\Cloudinary;
use Cloudinary\Configuration\Configuration;


class AdminController extends Controller
{
    private function uploadToCloudinary(string $filePath): string
    {
        $cloudinary = new Cloudinary(env('CLOUDINARY_URL'));
        $result = $cloudinary->uploadApi()->upload($filePath, ['folder' => 'arravali/products']);
        return $result['secure_url'];
    }

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

        // Upload images to Cloudinary
        try {
            if (!$request->hasFile('image')) {
                throw new \Exception('Primary image missing.');
            }

            $imageUrl = $this->uploadToCloudinary($request->file('image')->getRealPath());

            $backImageUrl = null;
            if ($request->hasFile('back_image')) {
                $backImageUrl = $this->uploadToCloudinary($request->file('back_image')->getRealPath());
            }

            $product = Product::create([
                'name' => $request->name,
                'slug' => $slug,
                'category_id' => null,
                'description' => $request->description,
                'short_description' => $request->short_description,
                'price' => $request->price,
                'sale_price' => $request->sale_price,
                'quantity' => $request->quantity,
                'weight' => $request->weight,
                'image' => $imageUrl,
                'back_image' => $backImageUrl,
                'is_featured' => $request->has('is_featured'),
                'is_active' => true,
            ]);

            if ($request->wantsJson() || $request->is('api/*')) {
                return response()->json([
                    'message' => 'Product created successfully!',
                    'product' => $product
                ], 201);
            }

            return redirect()->route('admin.products')->with('success', 'Product created successfully!');
        } catch (\Exception $e) {
            if ($request->wantsJson() || $request->is('api/*')) {
                return response()->json([
                    'message' => 'Upload failed: ' . $e->getMessage()
                ], 422);
            }
            return redirect()->back()
                ->withInput()
                ->with('error', 'Upload failed: ' . $e->getMessage());
        }
    }

    public function editProduct(Product $product)
    {
        $categories = Category::where('is_active', true)->get();
        if (request()->wantsJson() || request()->is('api/*')) {
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
                'is_featured' => $request->boolean('is_featured'),
                'is_active' => $request->boolean('is_active'),
            ];

            if ($request->hasFile('image')) {
                $data['image'] = $this->uploadToCloudinary($request->file('image')->getRealPath());
            }

            if ($request->hasFile('back_image')) {
                $data['back_image'] = $this->uploadToCloudinary($request->file('back_image')->getRealPath());
            }

            $product->update($data);

            if ($request->wantsJson() || $request->is('api/*')) {
                return response()->json([
                    'message' => 'Product updated successfully!',
                    'product' => $product
                ]);
            }

            return redirect()->route('admin.products')->with('success', 'Product updated successfully!');
        } catch (\Exception $e) {
            if ($request->wantsJson() || $request->is('api/*')) {
                return response()->json([
                    'message' => 'Update failed: ' . $e->getMessage()
                ], 422);
            }
            return redirect()->back()
                ->withInput()
                ->with('error', 'Update failed: ' . $e->getMessage());
        }
    }

    public function deleteProduct(Product $product)
    {
        $product->delete();
        
        if (request()->wantsJson() || request()->is('api/*')) {
            return response()->json([
                'success' => true,
                'message' => 'Product deleted successfully!'
            ]);
        }

        return redirect()->route('admin.products')->with('success', 'Product deleted successfully!');
    }

    public function orders(Request $request)
    {
        $orders = Order::with(['user', 'items.product', 'tracking'])->latest()->paginate(10);
        if ($request->wantsJson() || $request->is('api/*')) {
            return response()->json($orders);
        }
        return view('admin.orders.index', compact('orders'));
    }

    public function showOrder(Request $request, Order $order)
    {
        $order->load(['user', 'items.product', 'tracking']);
        if ($request->wantsJson() || $request->is('api/*')) {
            return response()->json($order);
        }
        return view('admin.orders.show', compact('order'));
    }

    public function updateOrderStatus(Request $request, Order $order)
    {
        $request->validate([
            'status' => 'required|string|in:pending,processing,shipped,delivered,cancelled',
            'tracking_number' => 'nullable|string|max:255',
            'carrier' => 'nullable|string|max:255',
            'description' => 'nullable|string|max:500'
        ]);

        $order->update(['status' => $request->status]);

        // Create tracking entry
        $description = $request->description ?: ('Order status updated to ' . ucfirst($request->status));
        $order->tracking()->create([
            'status' => $request->status,
            'description' => $description,
            'location' => 'Admin Fulfillment Center'
        ]);

        if ($request->wantsJson() || $request->is('api/*')) {
            return response()->json([
                'message' => 'Order status updated successfully!',
                'order' => $order->load(['user', 'items.product', 'tracking'])
            ]);
        }

        return redirect()->back()->with('success', 'Order status updated successfully!');
    }

    public function users(Request $request)
    {
        $users = User::where('id', '!=', auth()->id())
            ->where(function($q) {
                $q->where('role', 'customer')
                  ->orWhereNull('role');
            })
            ->latest()
            ->paginate(10);
            
        if ($request->wantsJson() || $request->is('api/*')) {
            return response()->json($users);
        }
        return view('admin.users.index', compact('users'));
    }

    public function deleteUser(Request $request, User $user)
    {
        if ($user->id === auth()->id()) {
            if ($request->wantsJson() || $request->is('api/*')) {
                return response()->json(['message' => 'You cannot delete your own account.'], 422);
            }
            return redirect()->back()->with('error', 'You cannot delete your own account');
        }

        $user->delete();

        if ($request->wantsJson() || $request->is('api/*')) {
            return response()->json([
                'message' => 'User deleted successfully!'
            ]);
        }

        return redirect()->back()->with('success', 'User deleted successfully');
    }

    public function userDetails(Request $request, User $user)
    {
        $user->load(['orders' => function($query) {
            $query->latest();
        }, 'orders.items.product']);

        if ($request->wantsJson() || $request->is('api/*')) {
            return response()->json($user);
        }

        return view('admin.users.show', compact('user'));
    }
}