<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="google-site-verification" content="google-site-verification=K-NFn9PGt4KPwVK1XNwi4EtohQR7raT3o8bbEUKecbo" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>@yield('title', 'Admin Panel') - Arravali Essence</title>

    <!-- PWA -->
    <link rel="manifest" href="/manifest.json">
    <meta name="theme-color" content="#ea580c">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <meta name="apple-mobile-web-app-title" content="AE Admin">
    <link rel="apple-touch-icon" href="/favicon.ico">

    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        /* Mobile Admin Styles */
        @media (max-width: 768px) {
            .mobile-sidebar {
                transform: translateX(-100%);
                transition: transform 0.3s ease;
            }

            .mobile-sidebar.open {
                transform: translateX(0);
            }

            .mobile-overlay {
                display: none;
            }

            .mobile-overlay.show {
                display: block;
            }
        }
    </style>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: {
                            50: '#fef7ee',
                            500: '#f97316',
                            600: '#ea580c',
                            700: '#c2410c',
                        }
                    }
                }
            }
        }
    </script>
</head>

<body class="bg-gray-50">
    <div class="flex h-screen relative">
        <!-- Mobile Overlay -->
        <div class="mobile-overlay fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onclick="toggleSidebar()"></div>

        <!-- Sidebar -->
        <div class="mobile-sidebar fixed lg:relative lg:transform-none z-50 w-64 bg-white shadow-lg h-full">
            <div class="p-4 sm:p-6 border-b">
                <div class="flex items-center justify-between">
                    <div>
                        <h1 class="text-xl sm:text-2xl font-bold text-gray-800">Arravali Essence</h1>
                        <p class="text-xs sm:text-sm text-gray-600">Admin Panel</p>
                    </div>
                    <button onclick="toggleSidebar()" class="lg:hidden text-gray-500 hover:text-gray-700">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
            </div>
            <nav class="mt-4 sm:mt-6">
                <a href="{{ route('admin.dashboard') }}"
                    class="flex items-center px-4 sm:px-6 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 {{ request()->routeIs('admin.dashboard') ? 'bg-primary-50 text-primary-600 border-r-2 border-primary-600' : '' }}">
                    <i class="fas fa-chart-bar mr-2 sm:mr-3 text-sm sm:text-base"></i>
                    <span class="text-sm sm:text-base">Dashboard</span>
                </a>
                <a href="{{ route('admin.products') }}"
                    class="flex items-center px-4 sm:px-6 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 {{ request()->routeIs('admin.products*') ? 'bg-primary-50 text-primary-600 border-r-2 border-primary-600' : '' }}">
                    <i class="fas fa-box mr-2 sm:mr-3 text-sm sm:text-base"></i>
                    <span class="text-sm sm:text-base">Products</span>
                </a>
                <a href="{{ route('admin.orders') }}"
                    class="flex items-center px-4 sm:px-6 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 {{ request()->routeIs('admin.orders*') ? 'bg-primary-50 text-primary-600 border-r-2 border-primary-600' : '' }}">
                    <i class="fas fa-shopping-cart mr-2 sm:mr-3 text-sm sm:text-base"></i>
                    <span class="text-sm sm:text-base">Orders</span>
                </a>
                <a href="{{ route('admin.users') }}"
                    class="flex items-center px-4 sm:px-6 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 {{ request()->routeIs('admin.users*') ? 'bg-primary-50 text-primary-600 border-r-2 border-primary-600' : '' }}">
                    <i class="fas fa-users mr-2 sm:mr-3 text-sm sm:text-base"></i>
                    <span class="text-sm sm:text-base">Users</span>
                </a>
            </nav>
        </div>

        <!-- Main Content -->
        <div class="flex-1 flex flex-col overflow-hidden">
            <!-- Header -->
            <header class="bg-white shadow-sm border-b px-4 sm:px-6 py-3 sm:py-4">
                <div class="flex justify-between items-center">
                    <div class="flex items-center space-x-4">
                        <button onclick="toggleSidebar()" class="lg:hidden text-gray-500 hover:text-gray-700">
                            <i class="fas fa-bars text-xl"></i>
                        </button>
                        <h2 class="text-lg sm:text-xl font-semibold text-gray-800">@yield('header', 'Dashboard')</h2>
                    </div>
                    <div class="flex items-center space-x-2 sm:space-x-4">
                        <span class="text-xs sm:text-sm text-gray-600 hidden sm:inline">Welcome, Admin</span>
                        <div class="w-6 h-6 sm:w-8 sm:h-8 bg-primary-500 rounded-full flex items-center justify-center">
                            <i class="fas fa-user text-white text-xs sm:text-sm"></i>
                        </div>
                        <form method="POST" action="{{ route('logout') }}" class="inline">
                            @csrf
                            <button type="submit"
                                class="text-xs sm:text-sm text-red-600 hover:text-red-800 font-medium">
                                <i class="fas fa-sign-out-alt mr-1"></i>
                                <span class="hidden sm:inline">Logout</span>
                            </button>
                        </form>
                    </div>
                </div>
            </header>

            <!-- Content -->
            <main class="flex-1 overflow-y-auto p-4 sm:p-6 min-h-0">
                @if(session('success'))
                    <div
                        class="bg-green-100 border border-green-400 text-green-700 px-3 sm:px-4 py-2 sm:py-3 rounded mb-4 sm:mb-6">
                        {{ session('success') }}
                    </div>
                @endif

                @if(session('error'))
                    <div
                        class="bg-red-100 border border-red-400 text-red-700 px-3 sm:px-4 py-2 sm:py-3 rounded mb-4 sm:mb-6">
                        {{ session('error') }}
                    </div>
                @endif

                @yield('content')
            </main>
        </div>
    </div>

    <!-- PWA Install Banner -->
    <div id="pwa-banner" class="hidden fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 z-50 bg-white border border-orange-200 rounded-2xl shadow-xl p-4 flex items-start gap-3">
        <div class="p-2 bg-orange-100 rounded-xl flex-shrink-0">
            <i class="fas fa-mobile-alt text-orange-600"></i>
        </div>
        <div class="flex-1">
            <p class="font-semibold text-gray-900 text-sm">Install Admin App</p>
            <p id="pwa-banner-msg" class="text-xs text-gray-500 mt-0.5">Install for quick access — works offline too.</p>
            <button id="pwa-install-btn" class="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold rounded-lg transition-colors">
                <i class="fas fa-download text-xs"></i> Install Now
            </button>
        </div>
        <button onclick="dismissPWA()" class="text-gray-400 hover:text-gray-600 flex-shrink-0">
            <i class="fas fa-times"></i>
        </button>
    </div>

    <script>
        function toggleSidebar() {
            const sidebar = document.querySelector('.mobile-sidebar');
            const overlay = document.querySelector('.mobile-overlay');

            sidebar.classList.toggle('open');
            overlay.classList.toggle('show');
        }

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', function (event) {
            const sidebar = document.querySelector('.mobile-sidebar');
            const overlay = document.querySelector('.mobile-overlay');
            const menuButton = event.target.closest('button[onclick="toggleSidebar()"]');

            if (window.innerWidth < 1024 && !sidebar.contains(event.target) && !menuButton && sidebar.classList.contains('open')) {
                toggleSidebar();
            }
        });

        // Close sidebar on window resize if open
        window.addEventListener('resize', function () {
            const sidebar = document.querySelector('.mobile-sidebar');
            const overlay = document.querySelector('.mobile-overlay');

            if (window.innerWidth >= 1024) {
                sidebar.classList.remove('open');
                overlay.classList.remove('show');
            }
        });
    </script>

    <script>
        // PWA Service Worker
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js').catch(() => {});
            });
        }

        // PWA Install prompt
        let deferredPrompt = null;
        const banner = document.getElementById('pwa-banner');
        const installBtn = document.getElementById('pwa-install-btn');

        function dismissPWA() {
            banner.classList.add('hidden');
            sessionStorage.setItem('pwa-dismissed', '1');
        }

        // Don't show if already installed or dismissed
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
        const isDismissed = sessionStorage.getItem('pwa-dismissed');

        if (!isStandalone && !isDismissed) {
            // iOS
            const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
            if (isIOS && !window.navigator.standalone) {
                document.getElementById('pwa-banner-msg').textContent = 'Tap Share then "Add to Home Screen" to install.';
                installBtn.classList.add('hidden');
                banner.classList.remove('hidden');
            }

            // Android / Desktop Chrome
            window.addEventListener('beforeinstallprompt', (e) => {
                e.preventDefault();
                deferredPrompt = e;
                banner.classList.remove('hidden');
            });

            installBtn.addEventListener('click', async () => {
                if (!deferredPrompt) return;
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                if (outcome === 'accepted') banner.classList.add('hidden');
                deferredPrompt = null;
            });
        }
    </script>
</body>

</html>