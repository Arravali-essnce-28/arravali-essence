import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Heart, ShoppingCart, Minus, Plus, Truck, Shield, Award, ArrowLeft, Share2, Zap } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../contexts/CartContext';
import AnimatedButton from '../components/ui/AnimatedButton';
import EnhancedProductCard from '../components/ui/EnhancedProductCard';

const EnhancedProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  const product = products.find(p => p.id === id);
  const relatedProducts = products.filter(p => p.id !== id && p.category === product?.category).slice(0, 4);

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <Link to="/shop" className="text-primary-600 hover:text-primary-700">
            Return to Shop
          </Link>
        </div>
      </div>
    );
  }

  const images = [product.image, product.image, product.image]; // Mock multiple images

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 12 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Breadcrumb */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-b"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-primary-600">Home</Link>
            <span className="text-gray-300">/</span>
            <Link to="/shop" className="text-gray-500 hover:text-primary-600">Shop</Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-semibold">{product.name}</span>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16"
        >
          {/* Product Images */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="relative overflow-hidden rounded-3xl bg-gray-100 aspect-square">
              <motion.img
                key={selectedImage}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.discount && (
                <div className="absolute top-6 left-6 bg-red-500 text-white px-4 py-2 rounded-full font-bold">
                  -{product.discount}% OFF
                </div>
              )}
              {product.isNew && (
                <div className="absolute top-6 right-6 bg-green-500 text-white px-4 py-2 rounded-full font-bold flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  New
                </div>
              )}
            </div>
            
            <div className="flex gap-4">
              {images.map((image, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === index ? 'border-primary-500' : 'border-gray-200'
                  }`}
                >
                  <img src={image} alt="" className="w-full h-full object-cover" />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                        className={i < product.rating ? 'text-yellow-400' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600">({product.reviews} reviews)</span>
                </div>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600">{product.weight}g</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {product.originalPrice && (
                <span className="text-2xl text-gray-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              <span className="text-4xl font-black text-primary-600">
                ${product.price.toFixed(2)}
              </span>
              {product.discount && (
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-bold">
                  Save ${((product.originalPrice || 0) - product.price).toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-lg text-gray-600 leading-relaxed">{product.description}</p>

            {/* Quantity & Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-semibold text-gray-900">Quantity:</span>
                <div className="flex items-center bg-gray-100 rounded-xl">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-200 rounded-l-xl transition-colors"
                  >
                    <Minus className="w-5 h-5" />
                  </motion.button>
                  <span className="px-6 py-3 font-bold text-xl">{quantity}</span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-gray-200 rounded-r-xl transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              <div className="flex gap-4">
                <AnimatedButton
                  onClick={handleAddToCart}
                  variant="gradient"
                  size="lg"
                  icon={<ShoppingCart className="w-5 h-5" />}
                  className="flex-1 text-lg font-bold py-4"
                >
                  Add to Cart - ${(product.price * quantity).toFixed(2)}
                </AnimatedButton>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    isWishlisted 
                      ? 'bg-red-50 border-red-200 text-red-600' 
                      : 'bg-white border-gray-200 text-gray-600 hover:border-red-200 hover:text-red-600'
                  }`}
                >
                  <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-current' : ''}`} />
                </motion.button>
              </div>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t">
              {[
                { icon: <Truck className="w-5 h-5" />, text: 'Free Shipping', color: 'text-blue-600' },
                { icon: <Shield className="w-5 h-5" />, text: '30-Day Returns', color: 'text-green-600' },
                { icon: <Award className="w-5 h-5" />, text: 'Premium Quality', color: 'text-purple-600' },
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className={benefit.color}>{benefit.icon}</div>
                  <span className="font-semibold text-gray-700">{benefit.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Product Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-xl p-8 mb-16"
        >
          <div className="flex border-b mb-8">
            {[
              { id: 'description', label: 'Description' },
              { id: 'ingredients', label: 'Ingredients' },
              { id: 'reviews', label: 'Reviews' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-600 hover:text-primary-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="prose max-w-none"
            >
              {activeTab === 'description' && (
                <div>
                  <h3 className="text-2xl font-bold mb-4">Product Description</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {product.description} This premium spice is carefully sourced from the finest farms 
                    and processed using traditional methods to preserve its authentic flavor and aroma.
                  </p>
                </div>
              )}
              {activeTab === 'ingredients' && (
                <div>
                  <h3 className="text-2xl font-bold mb-4">Ingredients</h3>
                  <p className="text-gray-600">100% Pure {product.name} - No additives, preservatives, or artificial colors.</p>
                </div>
              )}
              {activeTab === 'reviews' && (
                <div>
                  <h3 className="text-2xl font-bold mb-4">Customer Reviews</h3>
                  <p className="text-gray-600">Reviews feature coming soon. Current rating: {product.rating}/5 stars from {product.reviews} customers.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-black text-gray-900 mb-8 text-center">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <EnhancedProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default EnhancedProductDetailPage;