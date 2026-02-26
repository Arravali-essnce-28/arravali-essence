<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CartController;
use App\Http\Controllers\API\OrderTrackingController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\AdminController;

Route::get('/', function () {
    return response()->json(['message' => 'Arravali Essence API is working!']);
});

// Public routes
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{id}', [CategoryController::class, 'show']);

// Cart routes (works with session for guests)
Route::get('/cart', [CartController::class, 'index']);
Route::post('/cart', [CartController::class, 'store']);
Route::put('/cart/{id}', [CartController::class, 'update']);
Route::delete('/cart/{id}', [CartController::class, 'destroy']);

// Payment routes
Route::post('/payment/process', [PaymentController::class, 'processPayment']);
Route::post('/payment/create-intent', [PaymentController::class, 'createPaymentIntent']);
Route::get('/order/{orderNumber}', [PaymentController::class, 'getOrder']);

// Order tracking routes
Route::get('/track/{orderNumber}', [OrderTrackingController::class, 'trackOrder']);
Route::get('/track/{orderNumber}/timeline', [OrderTrackingController::class, 'getTrackingTimeline']);

// Auth routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/email/verify/{id}/{hash}', [AuthController::class, 'verify'])
    ->middleware(['signed'])
    ->name('verification.verify');
Route::post('/email/resend', [AuthController::class, 'resendVerificationEmail'])
    ->name('verification.send');

// Google OAuth routes
Route::get('/auth/google', [AuthController::class, 'redirectToGoogle']);
Route::get('/auth/google/callback', [AuthController::class, 'handleGoogleCallback']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::apiResource('products', ProductController::class)->except(['index', 'show']);
    Route::apiResource('categories', CategoryController::class)->except(['index', 'show']);
    
    // User order tracking
    Route::get('/orders', [OrderTrackingController::class, 'getUserOrders']);
    Route::put('/track/{orderNumber}', [OrderTrackingController::class, 'updateTrackingStatus']);

    // Admin Routes
    Route::prefix('admin')->middleware(['auth:sanctum', 'admin'])->group(function () {
        Route::get('/dashboard', [AdminController::class, 'dashboard']);
        Route::get('/products', [AdminController::class, 'products']);
        Route::post('/products', [AdminController::class, 'storeProduct']);
        Route::get('/products/{product}', [AdminController::class, 'editProduct']); // Reusing editProduct to fetch single product for edit form
        Route::put('/products/{product}', [AdminController::class, 'updateProduct']);
        Route::delete('/products/{product}', [AdminController::class, 'deleteProduct']);
        
        // Order Management
        Route::get('/orders', [AdminController::class, 'orders']);
        Route::put('/orders/{order}/status', [AdminController::class, 'updateOrderStatus']);

        // User Management
        Route::get('/users', [AdminController::class, 'users']);
        Route::get('/users/{user}', [AdminController::class, 'userDetails']);
        Route::delete('/users/{user}', [AdminController::class, 'deleteUser']);
    });
});

// CORS preflight
Route::options('/{any}', function () {
    return response('', 200)
        ->header('Access-Control-Allow-Origin', '*')
        ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Session-ID');
})->where('any', '.*');