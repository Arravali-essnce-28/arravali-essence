import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Filter, Grid, List, Search, SlidersHorizontal, Sparkles, TrendingUp } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import EnhancedProductCard from '../components/ui/EnhancedProductCard';
import AnimatedButton from '../components/ui/AnimatedButton';
import SEO from '../components/SEO';
import api from '../services/api';

const categories = [
  { id: 'all', name: 'All Products', icon: '✨' },
  { id: 'whole-spices', name: 'Whole Spices', icon: '🌱' },
  { id: 'ground-spices', name: 'Ground Spices', icon: '🌶️' },
  { id: 'spice-blends', name: 'Spice Blends', icon: '🍲' },
  { id: 'organic', name: 'Organic Range', icon: '🍃' }
];

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  price: number;
  sale_price?: number;
  final_price: number;
  has_discount: boolean;
  discount_percentage?: number;
  in_stock: boolean;
  category: { id: number; name: string };
  rating: number;
  reviews: number;
  image: string;
  quantity?: number;
  weight?: number;
  isNew?: boolean;
  discount?: number;
  isOrganic?: boolean;
  isPremium?: boolean;
}

const EnhancedShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  const categoryParam = searchParams.get('category');
  const searchParam = searchParams.get('search');

  // Keep search input in sync when searchParam changes (e.g. from navbar search)
  useEffect(() => {
    setSearchQuery(searchParams.get('search') || '');
  }, [searchParams]);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const responseData = await api.getProducts();
        
        // Products are already transformed by the api service
        const transformedProducts = (responseData.data || []).map((product: any) => ({
          ...product,
          // Add frontend-only flags if needed
          isNew: product.isNew ?? Math.random() > 0.8,
          isOrganic: product.isOrganic ?? product.category?.name?.includes('Organic'),
          isPremium: product.isPremium ?? product.category?.name?.includes('Premium'),
        }));

        setProducts(transformedProducts);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    // 1. Filter by category
    if (categoryParam) {
      const productCat = typeof product.category === 'string' 
        ? product.category 
        : product.category?.name || '';
      
      const catLower = categoryParam.toLowerCase();
      const prodCatLower = productCat.toLowerCase();

      if (catLower === 'whole-spices' && !prodCatLower.includes('whole')) return false;
      if (catLower === 'ground-spices' && !prodCatLower.includes('ground')) return false;
      if (catLower === 'spice-blends' && !prodCatLower.includes('blend') && !prodCatLower.includes('masala')) return false;
      if (catLower === 'organic' && !prodCatLower.includes('organic')) return false;
      
      if (
        catLower !== 'whole-spices' && 
        catLower !== 'ground-spices' && 
        catLower !== 'spice-blends' && 
        catLower !== 'organic' &&
        !prodCatLower.includes(catLower)
      ) {
        return false;
      }
    }

    // 2. Filter by search query
    if (searchParam) {
      const query = searchParam.toLowerCase().trim();
      const name = (product.name || '').toLowerCase();
      const desc = (product.description || '').toLowerCase();
      const shortDesc = (product.short_description || '').toLowerCase();
      
      if (!name.includes(query) && !desc.includes(query) && !shortDesc.includes(query)) {
        return false;
      }
    }

    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    if (sortBy === 'newest') return String(b.id).localeCompare(String(a.id));
    return 0;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <SEO
        title="Shop Premium Indian Spices"
        description="Browse our wide collection of whole spices, ground spices, and unique spice blends. High-quality, authentic Indian spices delivered across the UK."
        keywords="buy spices online, ground spices, whole spices, spice blends, masala powders, organic seasonings"
      />
      {/* Enhanced Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-primary-600 via-orange-600 to-red-600 text-white py-20 relative overflow-hidden"
      >
        <div className="absolute inset-0">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-32 h-32 bg-white/10 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0.8, 1.2, 0.8],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 10 + Math.random() * 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles className="w-8 h-8 text-yellow-300" />
              <span className="text-lg font-bold text-yellow-300">Premium Collection</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              Our Spice <span className="text-yellow-300">Collection</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Discover authentic flavors from around the world. Premium quality, ethically sourced.
            </p>
          </motion.div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col gap-8">
          {/* Main Content */}
          <div className="flex-1 w-full">
            {/* Active Filters Display */}
            {(categoryParam || searchParam) && (
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="text-sm font-semibold text-gray-500">Active Filters:</span>
                {categoryParam && (
                  <span className="flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-1.5 rounded-full text-xs font-bold border border-orange-200">
                    Category: {categories.find(c => c.id === categoryParam.toLowerCase())?.name || categoryParam}
                    <button 
                      onClick={() => {
                        const params = new URLSearchParams(searchParams);
                        params.delete('category');
                        setSearchParams(params);
                      }}
                      className="hover:text-red-600 font-black ml-1 cursor-pointer"
                    >
                      ×
                    </button>
                  </span>
                )}
                {searchParam && (
                  <span className="flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-1.5 rounded-full text-xs font-bold border border-orange-200">
                    Search: "{searchParam}"
                    <button 
                      onClick={() => {
                        const params = new URLSearchParams(searchParams);
                        params.delete('search');
                        setSearchParams(params);
                      }}
                      className="hover:text-red-600 font-black ml-1 cursor-pointer"
                    >
                      ×
                    </button>
                  </span>
                )}
                <button
                  onClick={() => {
                    setSearchParams({});
                  }}
                  className="text-sm font-bold text-red-600 hover:text-red-700 transition-colors ml-2 cursor-pointer"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Enhanced Controls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-xl p-6 mb-8"
            >
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full md:w-auto">
                  <div className="relative flex-1 sm:flex-initial">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search spices..."
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        const params = new URLSearchParams(searchParams);
                        if (e.target.value) {
                          params.set('search', e.target.value);
                        } else {
                          params.delete('search');
                        }
                        setSearchParams(params);
                      }}
                      className="pl-12 pr-4 py-2.5 w-full sm:w-64 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-medium outline-none transition-all"
                    />
                  </div>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border-2 border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-medium outline-none cursor-pointer"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                    <option value="newest">Newest First</option>
                  </select>
                </div>

                <div className="flex items-center justify-between w-full md:w-auto gap-6">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary-600" />
                    <span className="font-semibold text-gray-900 whitespace-nowrap">
                      {loading ? 'Loading products...' : `${filteredProducts.length} Products Found`}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-600">View:</span>
                    <div className="flex bg-gray-100 rounded-xl p-1">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setViewMode('grid')}
                        className={`p-3 rounded-lg transition-all cursor-pointer ${viewMode === 'grid'
                          ? 'bg-primary-600 text-white shadow-lg'
                          : 'text-gray-600 hover:text-primary-600'
                          }`}
                      >
                        <Grid className="h-5 w-5" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setViewMode('list')}
                        className={`p-3 rounded-lg transition-all cursor-pointer ${viewMode === 'list'
                          ? 'bg-primary-600 text-white shadow-lg'
                          : 'text-gray-600 hover:text-primary-600'
                          }`}
                      >
                        <List className="h-5 w-5" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Products Grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${viewMode}-${sortBy}-${categoryParam}-${searchParam}`}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className={viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'
                  : 'space-y-6'
                }
              >
                {loading ? (
                  [...Array(8)].map((_, index) => (
                    <div key={index} className="bg-white rounded-3xl shadow-xl overflow-hidden animate-pulse h-96 flex flex-col border border-gray-100">
                      <div className="bg-gray-200/80 w-full h-56 flex-shrink-0" />
                      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-3">
                          <div className="h-6 bg-gray-200/80 rounded-full w-3/4" />
                          <div className="h-4 bg-gray-200/80 rounded-full w-1/2" />
                        </div>
                        <div className="flex justify-between items-center mt-auto">
                          <div className="h-6 bg-gray-200/80 rounded-full w-1/4" />
                          <div className="h-10 bg-gray-200/80 rounded-xl w-1/3" />
                        </div>
                      </div>
                    </div>
                  ))
                ) : sortedProducts.length > 0 ? (
                  sortedProducts.map((product, index) => {
                    const mappedProduct: import("../types/index").Product = {
                      ...product,
                      category: typeof product.category === 'string'
                        ? product.category
                        : (product.category as any)?.name || 'Uncategorized',
                    };

                    return (
                      <motion.div key={product.id} variants={itemVariants}>
                        <EnhancedProductCard
                          product={mappedProduct as any}
                          viewMode={viewMode}
                          showQuickView={true}
                          showWishlist={false}
                        />
                      </motion.div>
                    );
                  })
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="col-span-full text-center py-20 bg-white rounded-3xl shadow-xl border border-gray-100"
                  >
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
                    <p className="text-gray-600 mb-6">There are currently no products matching your criteria</p>
                    <button
                      onClick={() => setSearchParams({})}
                      className="px-6 py-2.5 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-full font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
                    >
                      Clear Filters
                    </button>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedShopPage;