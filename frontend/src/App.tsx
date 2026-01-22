import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from 'react-hot-toast';
import ErrorBoundary from './components/ErrorBoundary';
import EnhancedNavbar from './components/ui/EnhancedNavbar';
import EnhancedFooter from './components/ui/EnhancedFooter';
import WhatsAppWidget from './components/WhatsAppWidget';
import ScrollToTop from './components/ScrollToTop';
import EnhancedHomePage from './pages/EnhancedHomePage';
import EnhancedShopPage from './pages/EnhancedShopPage';
import EnhancedProductDetailPage from './pages/EnhancedProductDetailPage';
import EnhancedCartPage from './pages/EnhancedCartPage';
import EnhancedAboutPage from './pages/EnhancedAboutPage';
import EnhancedContactPage from './pages/EnhancedContactPage';
import BulkInquiryPage from './pages/BulkInquiryPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import OrdersPage from './pages/OrdersPage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import CheckoutPage from './pages/CheckoutPage';
import NotFoundPage from './pages/NotFoundPage';
import GoogleCallback from './components/auth/GoogleCallback';



const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <CartProvider>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex flex-col">
              <EnhancedNavbar />
              <main className="flex-1">
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
                  <Route path="/auth/google/callback" element={<GoogleCallback />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>
              <EnhancedFooter />
              <WhatsAppWidget />
              <ScrollToTop />
              <Toaster position="top-right" />
            </div>
          </CartProvider>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
};

export default App;