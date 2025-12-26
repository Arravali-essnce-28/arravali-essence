import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Filter, Grid, List, Search, SlidersHorizontal, Sparkles, TrendingUp } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../contexts/CartContext';
import EnhancedProductCard from '../components/ui/EnhancedProductCard';
import AnimatedButton from '../components/ui/AnimatedButton';

const categories = [
  { id: 'All', name: 'All Spices', count: products.length, color: 'from-gray-500 to-gray-600' },
  { id: 'Whole Spices', name: 'Whole Spices', count: 12, color: 'from-amber-500 to-orange-600' },
  { id: 'Ground Spices', name: 'Ground Spices', count: 18, color: 'from-red-500 to-pink-600' },
  { id: 'Spice Blends', name: 'Spice Blends', count: 8, color: 'from-green-500 to-teal-600' },
  { id: 'Organic', name: 'Organic Range', count: 15, color: 'from-purple-500 to-indigo-600' },
];

const EnhancedShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const category = searchParams.get('category') || 'All';
  const { addToCart } = useCart();

  useEffect(() => {
    const search = searchParams.get('search');
    if (search) {
      setSearchQuery(search);
    }
  }, [searchParams]);

  const filteredProducts = products.filter(product => {
    const matchesCategory = category === 'All' || product.category?.toLowerCase() === category.toLowerCase();
    const matchesSearch = !searchQuery || product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesCategory && matchesSearch && matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
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
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
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
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Enhanced Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-80 flex-shrink-0"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-8">
              {/* Search */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Search Products
                </h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search spices..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-primary-500/20 focus:ring-4 transition-all"
                  />
                </div>
              </div>
              
              {/* Categories */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Categories
                </h3>
                <div className="space-y-3">
                  {categories.map((cat) => (
                    <motion.button
                      key={cat.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSearchParams(cat.id === 'All' ? {} : { category: cat.id })}
                      className={`block w-full text-left p-4 rounded-xl transition-all ${
                        category === cat.id
                          ? `bg-gradient-to-r ${cat.color} text-white shadow-lg`
                          : 'text-gray-700 hover:bg-gray-50 border-2 border-gray-100 hover:border-primary-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">{cat.name}</span>
                        <span className={`text-sm px-2 py-1 rounded-full ${
                          category === cat.id ? 'bg-white/20' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {cat.count}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
              
              {/* Price Range */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Price Range</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
              
              {/* Filter Button */}
              <AnimatedButton
                variant="outline"
                size="lg"
                onClick={() => setShowFilters(!showFilters)}
                icon={<SlidersHorizontal className="w-5 h-5" />}
                className="w-full"
              >
                Advanced Filters
              </AnimatedButton>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Enhanced Controls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-xl p-6 mb-8"
            >
              <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary-600" />
                    <span className="font-semibold text-gray-900">
                      {filteredProducts.length} Products Found
                    </span>
                  </div>
                  
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border-2 border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-medium"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                    <option value="newest">Newest First</option>
                  </select>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-600">View:</span>
                  <div className="flex bg-gray-100 rounded-xl p-1">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setViewMode('grid')}
                      className={`p-3 rounded-lg transition-all ${
                        viewMode === 'grid' 
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
                      className={`p-3 rounded-lg transition-all ${
                        viewMode === 'list' 
                          ? 'bg-primary-600 text-white shadow-lg' 
                          : 'text-gray-600 hover:text-primary-600'
                      }`}
                    >
                      <List className="h-5 w-5" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Products Grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${viewMode}-${category}-${sortBy}`}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className={viewMode === 'grid' 
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8' 
                  : 'space-y-6'
                }
              >
                {sortedProducts.length > 0 ? (
                  sortedProducts.map((product, index) => (
                    <motion.div key={product.id} variants={itemVariants}>
                      <EnhancedProductCard 
                        product={product} 
                        viewMode={viewMode}
                        showQuickView={true}
                        showWishlist={true}
                      />
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="col-span-full text-center py-16"
                  >
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
                    <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
                    <AnimatedButton
                      variant="primary"
                      onClick={() => {
                        setSearchQuery('');
                        setSearchParams({});
                        setPriceRange([0, 100]);
                      }}
                    >
                      Clear All Filters
                    </AnimatedButton>
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