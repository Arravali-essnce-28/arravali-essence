import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Filter, Grid, List, Search, SlidersHorizontal, Sparkles, TrendingUp } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import EnhancedProductCard from '../components/ui/EnhancedProductCard';
import AnimatedButton from '../components/ui/AnimatedButton';
import SEO from '../components/SEO';

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
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/products`);
        const data = await response.json();

        // Transform API data to match the expected Product interface
        const transformedProducts = (data.data || []).map((product: any) => ({
          id: String(product.id),
          name: product.name,
          slug: product.slug,
          description: product.description,
          short_description: product.short_description,
          price: product.price,
          sale_price: product.sale_price,
          final_price: product.final_price,
          has_discount: product.has_discount,
          discount_percentage: product.discount_percentage,
          in_stock: product.in_stock,
          category: product.category,
          rating: product.rating || 4.5,
          reviews: product.reviews || Math.floor(Math.random() * 100) + 10,
          image: product.image || 'https://images.unsplash.com/photo-1599909533730-b5b6e4b5b5b5?w=500&h=500&fit=crop',
          quantity: product.quantity,
          weight: product.weight || 100,
          isNew: Math.random() > 0.8,
          discount: product.discount_percentage,
          isOrganic: product.category?.name.includes('Organic'),
          isPremium: product.category?.name.includes('Premium'),
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

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
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
                      {products.length} Products Found
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
                      className={`p-3 rounded-lg transition-all ${viewMode === 'grid'
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
                      className={`p-3 rounded-lg transition-all ${viewMode === 'list'
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
                key={`${viewMode}-${sortBy}`}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className={viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'
                  : 'space-y-6'
                }
              >
                {sortedProducts.length > 0 ? (
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
                          showWishlist={true}
                        />
                      </motion.div>
                    );
                  })
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="col-span-full text-center py-16"
                  >
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
                    <p className="text-gray-600 mb-6">There are currently no products available</p>
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