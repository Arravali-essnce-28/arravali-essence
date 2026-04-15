// frontend/src/components/Navbar.tsx
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import { User, LogIn } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { itemCount = 0 } = useCart() || {};
  // Temporarily disabled auth until context is properly set up
  const user: { name?: string } | null = null;
  const logout = () => {};
  
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
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl transition-all duration-500 rounded-full ${
      isScrolled 
        ? 'bg-black/60 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-white/10' 
        : 'bg-black/30 backdrop-blur-xl border border-white/5'
    }`}>
      <div className="mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/images/logo.svg" 
              alt="Arravali Essence Logo" 
              className="h-8 w-auto hover:opacity-80 transition-opacity brightness-0 invert filter drop-shadow-md"
            />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/shop">Shop</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </div>
          
          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
              <input
                type="text"
                placeholder="Search premium spices..."
                className="w-full pl-10 pr-4 py-1.5 text-sm bg-white/10 text-white placeholder-white/40 border-none rounded-full focus:outline-none focus:ring-1 focus:ring-amber-500 focus:bg-white/20 transition-all shadow-inner backdrop-blur-md"
              />
            </div>
          </div>
          
          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* User Account */}
            {user ? (
              <div className="relative user-menu">
                <button 
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center space-x-2 p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  <div className="h-8 w-8 rounded-full bg-amber-600 flex items-center justify-center shadow-lg">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span className="hidden lg:inline text-sm font-medium text-white/90">
                    Account
                  </span>
                </button>
                
                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-1 z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsUserDropdownOpen(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsUserDropdownOpen(false)}
                    >
                      My Orders
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-1 text-white/80 hover:text-amber-400 transition-colors"
              >
                <LogIn className="h-5 w-5" />
                <span className="hidden sm:inline">Login</span>
              </Link>
            )}
            
            {/* Cart */}
            <Link to="/cart" className="relative p-2 text-white/80 hover:text-amber-400 transition-colors">
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-[0_0_10px_rgba(245,158,11,0.6)]">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-white/80 hover:text-amber-400 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-2 bg-black/80 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden mx-4 pb-4">
          <div className="px-4 py-4 space-y-2">
            <MobileNavLink to="/" onClick={() => setIsOpen(false)}>Home</MobileNavLink>
            <MobileNavLink to="/shop" onClick={() => setIsOpen(false)}>Shop</MobileNavLink>
            <MobileNavLink to="/about" onClick={() => setIsOpen(false)}>About</MobileNavLink>
            <MobileNavLink to="/contact" onClick={() => setIsOpen(false)}>Contact</MobileNavLink>
            <MobileNavLink to="/cart" onClick={() => setIsOpen(false)}>
              <div className="flex items-center justify-between">
                <span>Cart</span>
                {itemCount > 0 && (
                  <span className="bg-amber-500 text-black font-bold text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount > 9 ? '9+' : itemCount}
                  </span>
                )}
              </div>
            </MobileNavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link
    to={to}
    className="relative text-white/80 hover:text-white px-4 py-2 text-sm font-semibold uppercase tracking-widest transition-colors group rounded-full overflow-hidden"
  >
    <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full z-0"></div>
    <span className="relative z-10">{children}</span>
    <span className="absolute inset-x-4 bottom-1 h-[1px] bg-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-center shadow-[0_0_8px_rgba(251,191,36,0.8)] z-10"></span>
  </Link>
);

const MobileNavLink = ({ to, children, onClick }: { to: string; children: React.ReactNode; onClick: () => void }) => (
  <Link
    to={to}
    onClick={onClick}
    className="block px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 font-semibold uppercase tracking-wider transition-colors rounded-xl"
  >
    {children}
  </Link>
);

export default Navbar;
