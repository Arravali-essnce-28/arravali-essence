<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next, ?string $permission = null)
    {
        $user = $request->user() ?: Auth::user();

        if (!$user) {
            if ($request->expectsJson() || $request->is('api/*')) {
                return response()->json(['message' => 'Unauthenticated.'], 401);
            }
            return redirect('/login')->with('error', 'Please sign in to access this page.');
        }

        // Check if account is active
        if (isset($user->status) && $user->status === 'inactive') {
            if ($request->expectsJson() || $request->is('api/*')) {
                return response()->json(['message' => 'Your account is deactivated. Please contact an administrator.'], 403);
            }
            return redirect('/login')->with('error', 'Your account is deactivated.');
        }

        // Must be admin or employee
        if (!$user->isAdmin() && !$user->isEmployee()) {
            if ($request->expectsJson() || $request->is('api/*')) {
                return response()->json(['message' => 'Forbidden: Administrative access required.'], 403);
            }
            return redirect('/login')->with('error', 'You do not have permission to access the admin area.');
        }

        // Check specific permission if specified
        if ($permission && !$user->hasPermission($permission)) {
            if ($request->expectsJson() || $request->is('api/*')) {
                return response()->json(['message' => "Forbidden: You do not have '{$permission}' permission."], 403);
            }
            return redirect('/admin')->with('error', 'You do not have permission to access this feature.');
        }
        
        return $next($request);
    }
}
