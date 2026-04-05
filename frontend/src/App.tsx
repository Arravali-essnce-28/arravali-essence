import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <Router>
          <AuthProvider>
            <NotificationProvider>
              <CartProvider>
                <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex flex-col">
                  <EnhancedNavbar />
                  <main className="flex-1">
                    <Suspense fallback={<div className="flex h-[50vh] items-center justify-center text-primary-600 font-medium">Loading Arravali Essence...</div>}>
                      <Routes>
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
                        <Route path="*" element={<NotFoundPage />} />
                      </Routes>
                    </Suspense>
                  </main>
                  <EnhancedFooter />
                  <WhatsAppWidget />
                  <ScrollToTop />
                  <Toaster position="top-right" />
                </div>
              </CartProvider>
            </NotificationProvider>
          </AuthProvider>
        </Router>
      </ErrorBoundary>
    </HelmetProvider>
  );
};

export default App;