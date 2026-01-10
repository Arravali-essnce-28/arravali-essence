<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login - Arravali Essence</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        body { font-family: 'Inter', sans-serif; }
    </style>
</head>
<body class="bg-gradient-to-br from-orange-50 to-amber-50 min-h-screen flex items-center justify-center">
    <div class="max-w-md w-full mx-4">
        <!-- Logo and Brand -->
        <div class="text-center mb-8">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mb-4">
                <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 7a2 2 0 11-4 0 2 2 0 014 0zm8 0a2 2 0 11-4 0 2 2 0 014 0zm-8 6a2 2 0 11-4 0 2 2 0 014 0zm8 0a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
            </div>
            <h1 class="text-3xl font-bold text-gray-900">Arravali Essence</h1>
            <p class="text-gray-600 mt-2">Admin Panel Login</p>
        </div>

        <!-- Login Form -->
        <div class="bg-white rounded-2xl shadow-xl p-8">
            @if ($errors->any())
                <div class="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    @foreach ($errors->all() as $error)
                        <p class="text-red-600 text-sm">{{ $error }}</p>
                    @endforeach
                </div>
            @endif

            <form method="POST" action="{{ route('login.post') }}">
                @csrf
                
                <div class="mb-6">
                    <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                    </label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        required
                        autofocus
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                        placeholder="admin@arravaliessence.com"
                        value="{{ old('email') }}"
                    >
                </div>

                <div class="mb-6">
                    <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        required
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                        placeholder="••••••••"
                    >
                </div>

                <button
                    type="submit"
                    class="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold py-3 px-4 rounded-lg hover:from-orange-600 hover:to-amber-600 transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                >
                    Sign In to Admin Panel
                </button>
            </form>

            <!-- Demo Credentials -->
            <div class="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
                <p class="text-sm font-medium text-orange-800 mb-2">Demo Credentials:</p>
                <p class="text-xs text-orange-700">Email: admin@arravaliessence.com</p>
                <p class="text-xs text-orange-700">Password: admin123</p>
            </div>
        </div>

        <!-- Footer -->
        <div class="text-center mt-8">
            <p class="text-sm text-gray-500">
                © 2024 Arravali Essence. Premium Indian Spices.
            </p>
        </div>
    </div>
</body>
</html>
