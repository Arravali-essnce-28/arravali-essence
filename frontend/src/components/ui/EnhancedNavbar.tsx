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

  // Mock search results
  const searchResults = [
    { id: 1, name: 'Turmeric Powder', category: 'Ground Spices', price: 12.99, image: 'https://images.unsplash.com/photo-1582734158340-b3c5c5b0c9b1?w=100' },
    { id: 2, name: 'Cardamom Pods', category: 'Whole Spices', price: 24.99, image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=100' },
    { id: 3, name: 'Garam Masala', category: 'Spice Blends', price: 18.99, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100' },
  ];

  // Mock notifications
  const notificationList = [
    { id: 1, title: 'New spice blend available!', message: 'Check out our premium curry powder', time: '2 hours ago', read: false },
    { id: 2, title: 'Order confirmed', message: 'Your bulk order #1234 has been confirmed', time: '5 hours ago', read: false },
    { id: 3, title: 'Special offer', message: 'Get 20% off on all whole spices', time: '1 day ago', read: true },
  ];

  const filteredResults = searchResults.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.user-menu')) {
        setIsUserDropdownOpen(false);
      }
      if (!target.closest('.notification-menu')) {
        setIsNotificationDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(target)) {
        setShowSearchResults(false);
      }
      // Close mobile menu when clicking outside
      if (isOpen && !target.closest('.mobile-menu-container')) {
        setIsOpen(false);
      }
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

  const navVariants: Variants = {
    hidden: { y: -100 },
    visible: {
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 20,
      },
    },
  };

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
      },
    },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className={`sticky top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/70 backdrop-blur-xl shadow-xl border border-white/30'
          : 'bg-white/40 backdrop-blur-lg shadow-lg border border-white/20'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/" className="flex items-center space-x-3">
              <div className="relative" style={{paddingBottom: "15px"}}>
                <img
                  src="/images/logo.png"
                  alt="Arravali Essence Logo"
                  className="h-20 w-auto"
                />
                
              </div>
              
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8" style={{marginLeft: '40px'}}>            
            <NavLink to="/shop" icon={<TrendingUp className="w-4 h-4" />}>Shop</NavLink>
            <NavLink to="/bulk-inquiry" icon={<Package className="w-4 h-4" />}>Bulk Inquiry</NavLink>
            <NavLink to="/blog" icon={<BookOpen className="w-4 h-4" />}>Blog</NavLink>
            <NavLink to="/about" icon={<Award className="w-4 h-4" />}>About</NavLink>
            <NavLink to="/notifications" icon={<Award className="w-4 h-4" />}>Notifications</NavLink>
            <NavLink to="/contact" icon={<Leaf className="w-4 h-4" />}>Contact</NavLink>
          </div>

          {/* Search Bar */}
          

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            

            {/* User Account */}
            {isLoading ? (
              <div className="hidden sm:flex items-center space-x-2 px-4 py-2 text-sm text-gray-400">
                <div className="h-10 w-10 rounded-full bg-gray-100 animate-pulse" />
                <span>Loading...</span>
              </div>
            ) : user ? (
              <div className="relative user-menu">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center space-x-2 p-2 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary-600 to-primary-700 flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <span className="hidden xl:inline text-sm font-medium text-gray-700 max-w-[120px] truncate">
                    {user.name || user.email}
                  </span>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </motion.button>

                <AnimatePresence>
                  {isUserDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-200 py-2 z-50"
                    >
                      <Link
                        to="/profile"
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        My Profile
                      </Link>
                      <Link
                        to="/orders"
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        My Orders
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <AnimatedButton
                as={Link}
                to="/login"
                variant="outline"
                size="sm"
                icon={<LogIn className="w-4 h-4" />}
                className="hidden sm:flex"
              >
                Login
              </AnimatedButton>
            )}

            {/* Cart */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/cart"
                className="relative flex items-center gap-2 p-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all shadow-lg hover:shadow-xl"
              >
                <ShoppingCart className="h-6 w-6" />
                <span className="hidden sm:inline font-semibold">Cart</span>
                {itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold"
                  >
                    {itemCount > 9 ? '9+' : itemCount}
                  </motion.span>
                )}
              </Link>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-primary-600 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="lg:hidden bg-white border-t border-gray-200 shadow-xl mobile-menu-container relative z-[50]"
          >
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Search */}
              <div className="mb-6">
                <form onSubmit={handleSearch} className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search spices..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </form>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50">

                
                {isLoading ? (
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse" />
                    <span className="text-sm text-gray-500">Loading account…</span>
                  </div>
                ) : user ? (
                  <>
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary-600 to-primary-700 flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{user.name || user.email}</p>
                        <Link to="/profile" onClick={() => setIsOpen(false)} className="text-xs text-primary-600 hover:underline">
                          View profile
                        </Link>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="text-xs font-semibold text-primary-600 hover:text-primary-700"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <AnimatedButton
                    as={Link}
                    to="/login"
                    variant="outline"
                    size="sm"
                    icon={<LogIn className="w-4 h-4" />}
                    className="flex-1 justify-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </AnimatedButton>
                )}
              </div>



              <MobileNavLink to="/" onClick={() => setIsOpen(false)}>
                <Star className="w-5 h-5" />
                Home
              </MobileNavLink>
              <MobileNavLink to="/shop" onClick={() => setIsOpen(false)}>
                <TrendingUp className="w-5 h-5" />
                Shop
              </MobileNavLink>
              <MobileNavLink to="/bulk-inquiry" onClick={() => setIsOpen(false)}>
                <Package className="w-5 h-5" />
                Bulk Inquiry
              </MobileNavLink>
              <MobileNavLink to="/blog" onClick={() => setIsOpen(false)}>
                <BookOpen className="w-5 h-5" />
                Blog
              </MobileNavLink>
              <MobileNavLink to="/about" onClick={() => setIsOpen(false)}>
                <Award className="w-5 h-5" />
                About
              </MobileNavLink>
              <MobileNavLink to="/notifications" onClick={() => setIsOpen(false)}>
                <Award className="w-5 h-5" />
                Notifications
              </MobileNavLink>
              <MobileNavLink to="/contact" onClick={() => setIsOpen(false)}>
                <Leaf className="w-5 h-5" />
                Contact
              </MobileNavLink>
              <MobileNavLink to="/cart" onClick={() => setIsOpen(false)}>
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-3">
                    <ShoppingCart className="w-5 h-5" />
                    <span>Cart</span>
                  </div>
                  {itemCount > 0 && (
                    <span className="bg-primary-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
                      {itemCount > 9 ? '9+' : itemCount}
                    </span>
                  )}
                </div>
              </MobileNavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const NavLink: React.FC<{ to: string; children: React.ReactNode; icon?: React.ReactNode }> = ({
  to,
  children,
  icon,
}) => (
  <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
    <Link
      to={to}
      className="flex items-center gap-2 text-gray-700 hover:text-primary-600 px-4 py-2 font-semibold transition-all duration-300 rounded-xl hover:bg-primary-50"
    >
      {icon}
      {children}
    </Link>
  </motion.div>
);

const MobileNavLink: React.FC<{
  to: string;
  children: React.ReactNode;
  onClick: () => void;
}> = ({ to, children, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-primary-600 hover:bg-primary-50 font-semibold transition-all duration-300 rounded-xl"
  >
    {children}
  </Link>
);

export default EnhancedNavbar;