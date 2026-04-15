import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import {
  ShoppingCart, Menu, X, Search, User, LogIn, Bell,
  ChevronDown, Sparkles, Award, Leaf, Star, TrendingUp, Package, BookOpen
} from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import AnimatedButton from './AnimatedButton';

const EnhancedNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const { itemCount = 0 } = useCart() || {};
  const { user, logout, isLoading } = useAuth();
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.user-menu')) setIsUserDropdownOpen(false);
      // Close mobile menu when clicking outside
      if (isOpen && !target.closest('.mobile-menu-container')) setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setShowSearchResults(false);
      setSearchQuery('');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsUserDropdownOpen(false);
    } catch (error) {
      console.error('Failed to logout', error);
    }
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 w-full ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 py-1'
          : 'bg-white/80 backdrop-blur-sm border-b border-gray-200/50 py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img
              src="/images/logo.png"
              alt="Arravali Essence Logo"
              className="h-12 w-auto object-contain transition-transform hover:scale-105 duration-300"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center space-x-6 flex-1 px-8">
            <NavLink to="/shop">Shop</NavLink>
            <NavLink to="/bulk-inquiry">Bulk Inquiry</NavLink>
            <NavLink to="/blog">Blog</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-5 shrink-0">
            {/* User Account */}
            {isLoading ? (
              <div className="hidden sm:block h-8 w-8 rounded-full bg-gray-200 animate-pulse" />
            ) : user ? (
              <div className="relative user-menu">
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <div className="h-8 w-8 rounded-full bg-stone-800 flex items-center justify-center text-white">
                    <User className="h-4 w-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isUserDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 overflow-hidden"
                    >
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-stone-50 hover:text-amber-600 transition-colors"
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        My Profile
                      </Link>
                      <Link
                        to="/orders"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-stone-50 hover:text-amber-600 transition-colors"
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        My Orders
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-stone-50 hover:text-amber-600 transition-colors"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden sm:flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-700 hover:text-amber-600 transition-colors"
              >
                <LogIn className="h-4 w-4" />
                <span>Login</span>
              </Link>
            )}

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-1 text-gray-700 hover:text-amber-600 transition-colors group"
            >
              <ShoppingCart className="h-5 w-5 transform group-hover:scale-110 transition-transform" />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-white text-[10px] font-bold px-1.5 rounded-full min-w-[18px] h-[18px] flex items-center justify-center shadow-sm">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-1 text-gray-700 hover:text-amber-600 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white border-t border-gray-100 shadow-xl overflow-hidden mobile-menu-container absolute w-full left-0 top-full"
          >
            <div className="px-4 py-6 space-y-2">
              {!user && !isLoading && (
                <div className="pb-2 mb-2 border-b border-gray-100">
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-2.5 bg-stone-900 text-white rounded-lg text-sm font-bold uppercase tracking-wider hover:bg-stone-800 transition-colors"
                  >
                    <LogIn className="h-4 w-4" />
                    <span>Login / Register</span>
                  </Link>
                </div>
              )}

              <MobileNavLink to="/shop" onClick={() => setIsOpen(false)}>Shop</MobileNavLink>
              <MobileNavLink to="/bulk-inquiry" onClick={() => setIsOpen(false)}>Bulk Inquiry</MobileNavLink>
              <MobileNavLink to="/blog" onClick={() => setIsOpen(false)}>Blog</MobileNavLink>
              <MobileNavLink to="/about" onClick={() => setIsOpen(false)}>About</MobileNavLink>
              <MobileNavLink to="/contact" onClick={() => setIsOpen(false)}>Contact</MobileNavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const NavLink: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => (
  <Link
    to={to}
    className="relative text-[11px] md:text-xs font-bold uppercase tracking-[0.15em] text-gray-600 hover:text-stone-900 px-3 py-2 transition-colors group"
  >
    {children}
    <span className="absolute left-1/2 bottom-0 w-0 h-[2px] bg-amber-500 group-hover:w-[calc(100%-1.5rem)] transition-all duration-300 transform -translate-x-1/2"></span>
  </Link>
);

const MobileNavLink: React.FC<{ to: string; children: React.ReactNode; onClick: () => void }> = ({ to, children, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="block px-4 py-3 text-sm font-bold uppercase tracking-wider text-gray-700 hover:text-amber-600 hover:bg-gray-50 rounded-lg transition-colors"
  >
    {children}
  </Link>
);

export default EnhancedNavbar;