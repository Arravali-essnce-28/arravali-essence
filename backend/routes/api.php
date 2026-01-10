<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CartController;
use App\Http\Controllers\PaymentController;

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
Route::get('/order/{orderNumber}', [PaymentController::class, 'getOrder']);

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
});

// CORS preflight
Route::options('/{any}', function () {
    return response('', 200)
        ->header('Access-Control-Allow-Origin', '*')
        ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Session-ID');
})->where('any', '.*');