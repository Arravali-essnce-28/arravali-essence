import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Heart, Eye, ShoppingCart, Zap, Award, Leaf } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import AnimatedButton from './AnimatedButton';
import type { Product } from '../../types';

interface EnhancedProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
  showQuickView?: boolean;
  showWishlist?: boolean;
}

const EnhancedProductCard: React.FC<EnhancedProductCardProps> = ({
  product,
  viewMode = 'grid',
  showQuickView = true,
  showWishlist = true
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showQuickViewModal, setShowQuickViewModal] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowQuickViewModal(true);
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 group"
      >
        <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
            onLoad={() => setImageLoaded(true)}
          />
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-xl" />
          )}
          {product.discount && (
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              -{product.discount}%
            </div>
          )}
        </div>
        
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between mb-2">
              <Link to={`/product/${product.id}`} className="hover:text-primary-600 transition-colors">
                <h3 className="text-xl font-bold text-gray-900 line-clamp-2">{product.name}</h3>
              </Link>
              {showWishlist && (
                <button
                  onClick={handleWishlist}
                  className={`p-2 rounded-full transition-all ${
                    isWishlisted ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              )}
            </div>
            
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
            
            <div className="flex items-center gap-4 mb-3">
              <div className="flex items-center">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                      className={i < product.rating ? 'text-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
              </div>
              
              <div className="flex gap-2">
                {product.isOrganic && (
                  <span className="flex items-center text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    <Leaf className="w-3 h-3 mr-1" />
                    Organic
                  </span>
                )}
                {product.isPremium && (
                  <span className="flex items-center text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                    <Award className="w-3 h-3 mr-1" />
                    Premium
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {product.originalPrice && (
                <span className="text-lg text-gray-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              <span className="text-2xl font-bold text-primary-600">
                ${product.price.toFixed(2)}
              </span>
            </div>
            
            <div className="flex gap-2">
              {showQuickView && (
                <AnimatedButton
                  variant="outline"
                  size="sm"
                  onClick={handleQuickView}
                  icon={<Eye className="w-4 h-4" />}
                >
                  Quick View
                </AnimatedButton>
              )}
              <AnimatedButton
                variant="primary"
                size="sm"
                onClick={handleAddToCart}
                icon={<ShoppingCart className="w-4 h-4" />}
              >
                Add to Cart
              </AnimatedButton>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -8 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 relative"
      >
        {/* Image Container */}
        <div className="relative overflow-hidden bg-gray-100">
          <Link to={`/product/${product.id}`}>
            <motion.img
              src={product.image}
              alt={product.name}
              className="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-700 group-hover:scale-110"
              onLoad={() => setImageLoaded(true)}
              whileHover={{ scale: 1.1 }}
            />
          </Link>
          
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}
          
          {/* Badges */}
          <div className="absolute top-2 sm:top-4 left-2 sm:left-4 flex flex-col gap-2">
            {product.isNew && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1"
              >
                <Zap className="w-3 h-3" />
                New
              </motion.span>
            )}
            {product.discount && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full"
              >
                -{product.discount}% OFF
              </motion.span>
            )}
            {product.isOrganic && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1"
              >
                <Leaf className="w-3 h-3" />
                Organic
              </motion.span>
            )}
          </div>
          
          {/* Action Buttons */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute top-2 sm:top-4 right-2 sm:right-4 flex flex-col gap-2"
              >
                {showWishlist && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleWishlist}
                    className={`p-3 rounded-full backdrop-blur-md transition-all ${
                      isWishlisted 
                        ? 'bg-red-500 text-white' 
                        : 'bg-white/90 text-gray-700 hover:bg-red-500 hover:text-white'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  </motion.button>
                )}
                {showQuickView && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleQuickView}
                    className="p-3 rounded-full bg-white/90 backdrop-blur-md text-gray-700 hover:bg-primary-500 hover:text-white transition-all"
                  >
                    <Eye className="w-5 h-5" />
                  </motion.button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Quick Add to Cart */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4"
              >
                <AnimatedButton
                  variant="primary"
                  size="md"
                  onClick={handleAddToCart}
                  className="w-full backdrop-blur-md"
                  icon={<ShoppingCart className="w-4 h-4" />}
                >
                  Add to Cart
                </AnimatedButton>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Content */}
        <div className="p-4 sm:p-6">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <Link to={`/product/${product.id}`} className="hover:text-primary-600 transition-colors">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 line-clamp-2 mb-1">{product.name}</h3>
              </Link>
              <p className="text-sm text-gray-500">{product.weight}g</p>
            </div>
            
            <div className="text-right">
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through block">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              <span className="text-lg sm:text-xl font-bold text-primary-600">
                ${product.price.toFixed(2)}
              </span>
            </div>
          </div>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                    className={i < product.rating ? 'text-yellow-400' : 'text-gray-300'}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500 ml-2">({product.reviews})</span>
            </div>
            
            <div className="flex gap-1">
              {product.isPremium && (
                <Award className="w-4 h-4 text-purple-500" />
              )}
              {product.isOrganic && (
                <Leaf className="w-4 h-4 text-green-500" />
              )}
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Quick View Modal */}
      <AnimatePresence>
        {showQuickViewModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowQuickViewModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex gap-6">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-64 h-64 object-cover rounded-xl"
                />
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h2>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                          className={i < product.rating ? 'text-yellow-400' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">({product.reviews} reviews)</span>
                  </div>
                  
                  <div className="flex items-center gap-4 mb-6">
                    {product.originalPrice && (
                      <span className="text-xl text-gray-400 line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                    <span className="text-3xl font-bold text-primary-600">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="flex gap-3">
                    <AnimatedButton
                      variant="primary"
                      size="lg"
                      onClick={handleAddToCart}
                      className="flex-1"
                      icon={<ShoppingCart className="w-5 h-5" />}
                    >
                      Add to Cart
                    </AnimatedButton>
                    <AnimatedButton
                      variant="outline"
                      size="lg"
                      onClick={() => setShowQuickViewModal(false)}
                    >
                      Close
                    </AnimatedButton>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EnhancedProductCard;