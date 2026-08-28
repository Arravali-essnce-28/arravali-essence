import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { Toaster } from 'react-hot-toast';
import ErrorBoundary from './components/ErrorBoundary';
import EnhancedNavbar from './components/ui/EnhancedNavbar';
import EnhancedFooter from './components/ui/EnhancedFooter';
import WhatsAppWidget from './components/WhatsAppWidget';
import ScrollToTop from './components/ScrollToTop';
import EnhancedHomePage from './pages/EnhancedHomePage';
import AdminRoute from './components/admin/AdminRoute';

// Public pages
const EnhancedShopPage = lazy(() => import('./pages/EnhancedShopPage'));
const EnhancedProductDetailPage = lazy(() => import('./pages/EnhancedProductDetailPage'));
const EnhancedCartPage = lazy(() => import('./pages/EnhancedCartPage'));
const EnhancedAboutPage = lazy(() => import('./pages/EnhancedAboutPage'));
const EnhancedContactPage = lazy(() => import('./pages/EnhancedContactPage'));
const BulkInquiryPage = lazy(() => import('./pages/BulkInquiryPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const LoginPage = lazy(() => import('./pages/EnhancedLoginPage'));
const RegisterPage = lazy(() => import('./pages/EnhancedRegisterPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const OrdersPage = lazy(() => import('./pages/OrdersPage'));
const OrderTrackingPage = lazy(() => import('./pages/OrderTrackingPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const NotificationsPage = lazy(() => import('./pages/NotificationsPage'));
const GoogleCallback = lazy(() => import('./components/auth/GoogleCallback'));

// Admin pages (Full React SPA)
const AdminDashboardPage = lazy(() => import('./pages/admin/AdminDashboardPage'));
const AdminProductsPage = lazy(() => import('./pages/admin/AdminProductsPage'));
const AdminOrdersPage = lazy(() => import('./pages/admin/AdminOrdersPage'));
const AdminUsersPage = lazy(() => import('./pages/admin/AdminUsersPage'));
const AdminUserDetailsPage = lazy(() => import('./pages/admin/AdminUserDetailsPage'));
const AdminEmployeesPage = lazy(() => import('./pages/admin/AdminEmployeesPage'));

const AppContent: React.FC = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className={`min-h-screen flex flex-col ${isAdminRoute ? 'bg-stone-100' : 'bg-gradient-to-br from-gray-50 to-white'}`}>
      {!isAdminRoute && <EnhancedNavbar />}
      
      <main className="flex-1">
        <Suspense fallback={<div className="flex h-[50vh] items-center justify-center text-amber-600 font-medium">Loading Arravali Essence...</div>}>
          <Routes>
            {/* Public Storefront Routes */}
            <Route path="/" element={<EnhancedHomePage />} />
            <Route path="/shop" element={<EnhancedShopPage />} />
            <Route path="/product/:id" element={<EnhancedProductDetailPage />} />
            <Route path="/cart" element={<EnhancedCartPage />} />
            <Route path="/about" element={<EnhancedAboutPage />} />
            <Route path="/contact" element={<EnhancedContactPage />} />
            <Route path="/bulk-inquiry" element={<BulkInquiryPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/track/:orderNumber" element={<OrderTrackingPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/auth/google/callback" element={<GoogleCallback />} />

            {/* Admin & Staff Panel Routes with Granular Permissions */}
            <Route
              path="/admin"
              element={
                <AdminRoute requiredPermission="dashboard.view">
                  <AdminDashboardPage />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <AdminRoute requiredPermission="dashboard.view">
                  <AdminDashboardPage />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/products"
              element={
                <AdminRoute requiredPermission="products.view">
                  <AdminProductsPage />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <AdminRoute requiredPermission="orders.view">
                  <AdminOrdersPage />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <AdminRoute requiredPermission="users.view">
                  <AdminUsersPage />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/users/:id"
              element={
                <AdminRoute requiredPermission="users.view">
                  <AdminUserDetailsPage />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/employees"
              element={
                <AdminRoute adminOnly requiredPermission="employees.manage">
                  <AdminEmployeesPage />
                </AdminRoute>
              }
            />

            {/* 404 Catch All */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>

      {!isAdminRoute && (
        <>
          <EnhancedFooter />
          <WhatsAppWidget />
          <ScrollToTop />
        </>
      )}

      <Toaster position="top-right" />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <Router>
          <AuthProvider>
            <NotificationProvider>
              <CartProvider>
                <AppContent />
              </CartProvider>
            </NotificationProvider>
          </AuthProvider>
        </Router>
      </ErrorBoundary>
    </HelmetProvider>
  );
};

export default App;