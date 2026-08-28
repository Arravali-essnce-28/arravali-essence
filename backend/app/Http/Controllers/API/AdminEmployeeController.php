<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;

class AdminEmployeeController extends Controller
{
    /**
     * Get available permission modules and presets.
     */
    public function getPermissionsList()
    {
        $permissions = [
            [
                'group' => 'Dashboard & Analytics',
                'description' => 'Access to administrative overview, statistics and performance metrics',
                'permissions' => [
                    ['id' => 'dashboard.view', 'label' => 'View Dashboard Overview & Stats', 'description' => 'View sales charts, order summaries, and store metrics'],
                ]
            ],
            [
                'group' => 'Products Management',
                'description' => 'Control inventory, add spices, update prices and manage stock',
                'permissions' => [
                    ['id' => 'products.view', 'label' => 'View Products Catalog', 'description' => 'Access and search product list and pricing'],
                    ['id' => 'products.create', 'label' => 'Create New Products', 'description' => 'Add new spice products with photos and descriptions'],
                    ['id' => 'products.edit', 'label' => 'Edit Existing Products', 'description' => 'Modify prices, stock, descriptions, and images'],
                    ['id' => 'products.delete', 'label' => 'Delete Products', 'description' => 'Remove products from the catalog permanently'],
                ]
            ],
            [
                'group' => 'Orders & Fulfillment',
                'description' => 'Process customer purchases, change status, and update shipment tracking',
                'permissions' => [
                    ['id' => 'orders.view', 'label' => 'View Orders & Details', 'description' => 'Inspect customer orders, items purchased, and shipping addresses'],
                    ['id' => 'orders.update', 'label' => 'Update Order Status & Tracking', 'description' => 'Change order status (pending, processing, shipped, delivered) and tracking'],
                ]
            ],
            [
                'group' => 'Customer Management',
                'description' => 'View customer accounts, purchase histories, and registered profiles',
                'permissions' => [
                    ['id' => 'users.view', 'label' => 'View Customers List', 'description' => 'Browse registered customer profiles and contact details'],
                    ['id' => 'users.delete', 'label' => 'Delete Customer Accounts', 'description' => 'Delete customer accounts if requested'],
                ]
            ],
            [
                'group' => 'Staff & Employee Administration',
                'description' => 'Manage employee accounts and permission controls (Admin privilege)',
                'permissions' => [
                    ['id' => 'employees.manage', 'label' => 'Manage Employee Accounts', 'description' => 'Full control to create, update, and manage employee accounts and permissions'],
                ]
            ],
        ];

        $presets = [
            [
                'id' => 'full_admin',
                'name' => 'Full Administrator',
                'description' => 'Unrestricted access across all pages, features, and staff management',
                'permissions' => [
                    'dashboard.view',
                    'products.view', 'products.create', 'products.edit', 'products.delete',
                    'orders.view', 'orders.update',
                    'users.view', 'users.delete',
                    'employees.manage'
                ]
            ],
            [
                'id' => 'order_manager',
                'name' => 'Order & Fulfillment Manager',
                'description' => 'Manage customer orders, track dispatches, and review dashboard metrics',
                'permissions' => [
                    'dashboard.view',
                    'orders.view', 'orders.update',
                    'products.view'
                ]
            ],
            [
                'id' => 'product_manager',
                'name' => 'Catalog & Inventory Manager',
                'description' => 'Full control over products, pricing, stock levels, and media',
                'permissions' => [
                    'dashboard.view',
                    'products.view', 'products.create', 'products.edit', 'products.delete'
                ]
            ],
            [
                'id' => 'customer_support',
                'name' => 'Customer Support Staff',
                'description' => 'View orders, check shipping details, and view customer records',
                'permissions' => [
                    'dashboard.view',
                    'orders.view',
                    'users.view'
                ]
            ],
        ];

        return response()->json([
            'modules' => $permissions,
            'presets' => $presets,
        ]);
    }

    /**
     * Display a listing of employees.
     */
    public function index(Request $request)
    {
        $currentUser = $request->user();
        if (!$currentUser || !$currentUser->isAdmin()) {
            return response()->json(['message' => 'Access restricted. Only Administrators can manage employees.'], 403);
        }

        $query = User::where(function ($q) {
            $q->where('role', 'employee')
              ->orWhere('role', 'admin')
              ->orWhere('is_admin', true)
              ->orWhereNotNull('permissions');
        });

        // Search
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%");
            });
        }

        // Status filter
        if ($request->filled('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        // Role filter
        if ($request->filled('role') && $request->role !== 'all') {
            if ($request->role === 'admin') {
                $query->where(function($q) {
                    $q->where('role', 'admin')->orWhere('is_admin', true);
                });
            } else {
                $query->where('role', $request->role);
            }
        }

        $employees = $query->latest()->paginate($request->input('per_page', 15));

        return response()->json($employees);
    }

    /**
     * Store a newly created employee.
     */
    public function store(Request $request)
    {
        $currentUser = $request->user();
        if (!$currentUser || !$currentUser->isAdmin()) {
            return response()->json(['message' => 'Access restricted. Only Administrators can create employee accounts.'], 403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'phone' => 'nullable|string|max:50',
            'password' => 'required|string|min:6',
            'role' => 'nullable|string|in:employee,admin',
            'permissions' => 'nullable|array',
            'permissions.*' => 'string',
            'status' => 'nullable|string|in:active,inactive',
        ]);

        $role = $validated['role'] ?? 'employee';
        $isAdmin = ($role === 'admin');

        $employee = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
            'password' => Hash::make($validated['password']),
            'role' => $role,
            'is_admin' => $isAdmin,
            'permissions' => $validated['permissions'] ?? [],
            'status' => $validated['status'] ?? 'active',
            'email_verified_at' => now(), // Pre-verified employee accounts
        ]);

        return response()->json([
            'message' => 'Employee account created successfully!',
            'employee' => $employee,
        ], 201);
    }

    /**
     * Display the specified employee.
     */
    public function show(Request $request, $id)
    {
        $currentUser = $request->user();
        if (!$currentUser || !$currentUser->isAdmin()) {
            return response()->json(['message' => 'Access restricted. Only Administrators can view employee details.'], 403);
        }

        $employee = User::findOrFail($id);

        return response()->json($employee);
    }

    /**
     * Update the specified employee.
     */
    public function update(Request $request, $id)
    {
        $currentUser = $request->user();
        if (!$currentUser || !$currentUser->isAdmin()) {
            return response()->json(['message' => 'Access restricted. Only Administrators can edit employee accounts.'], 403);
        }

        $employee = User::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('users', 'email')->ignore($employee->id),
            ],
            'phone' => 'nullable|string|max:50',
            'password' => 'nullable|string|min:6',
            'role' => 'nullable|string|in:employee,admin,customer',
            'permissions' => 'nullable|array',
            'permissions.*' => 'string',
            'status' => 'nullable|string|in:active,inactive',
        ]);

        $data = [
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
            'permissions' => $validated['permissions'] ?? [],
            'status' => $validated['status'] ?? $employee->status,
        ];

        if (isset($validated['role'])) {
            $data['role'] = $validated['role'];
            $data['is_admin'] = ($validated['role'] === 'admin');
        }

        if (!empty($validated['password'])) {
            $data['password'] = Hash::make($validated['password']);
        }

        $employee->update($data);

        return response()->json([
            'message' => 'Employee details updated successfully!',
            'employee' => $employee->fresh(),
        ]);
    }

    /**
     * Remove the specified employee.
     */
    public function destroy(Request $request, $id)
    {
        $currentUser = $request->user();
        if (!$currentUser || !$currentUser->isAdmin()) {
            return response()->json(['message' => 'Access restricted. Only Administrators can delete employee accounts.'], 403);
        }

        if ((int)$id === (int)$currentUser->id) {
            return response()->json(['message' => 'You cannot delete your own administrative account.'], 422);
        }

        $employee = User::findOrFail($id);
        $employee->delete();

        return response()->json([
            'message' => 'Employee deleted successfully!',
        ]);
    }
}
