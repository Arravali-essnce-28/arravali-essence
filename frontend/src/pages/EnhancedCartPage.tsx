import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Gift, Truck, Shield } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import AnimatedButton from '../components/ui/AnimatedButton';

const EnhancedCartPage: React.FC = () => {
  const { cart: items, updateQuantity, removeFromCart, cartTotal, itemCount } = useCart();

  const getTotalPrice = () => cartTotal;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring' as const, stiffness: 100, damping: 12 } }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto px-4"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-32 h-32 bg-gradient-to-r from-primary-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <ShoppingBag className="w-16 h-16 text-white" />
          </motion.div>
          <h2 className="text-3xl font-black text-gray-900 mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-8">Discover our premium spice collection and add some flavor to your cart!</p>
          <AnimatedButton
            as={Link}
            to="/shop"
            variant="gradient"
            size="lg"
            icon={<ArrowRight className="w-5 h-5" />}
            iconPosition="right"
          >
            Start Shopping
          </AnimatedButton>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary-600 to-orange-600 text-white py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-black mb-2">Shopping Cart</h1>
              <p className="text-xl text-white/90">{itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart</p>
            </div>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="hidden md:block"
            >
              <ShoppingBag className="w-16 h-16 text-white/50" />
            </motion.div>
          </div>
        </div>
      </motion.section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.product.id}
                    variants={itemVariants}
                    exit={{ opacity: 0, x: -100, transition: { duration: 0.3 } }}
                    layout
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6"
                  >
                    <div className="flex items-center gap-6">
                      <div className="relative">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-24 h-24 object-cover rounded-xl"
                        />
                        {item.product.discount && (
                          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                            -{item.product.discount}%
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{item.product.name}</h3>
                        <p className="text-gray-600 text-sm mb-2">{item.product.weight}g</p>
                        <div className="flex items-center gap-4">
                          {item.product.originalPrice && (
                            <span className="text-gray-400 line-through">${item.product.originalPrice.toFixed(2)}</span>
                          )}
                          <span className="text-2xl font-bold text-primary-600">${item.product.price.toFixed(2)}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="flex items-center bg-gray-100 rounded-xl">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateQuantity(Number(item.product.id), Math.max(0, item.quantity - 1))}
                            className="p-3 hover:bg-gray-200 rounded-l-xl transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </motion.button>
                          <span className="px-6 py-3 font-bold text-lg">{item.quantity}</span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateQuantity(Number(item.product.id), item.quantity + 1)}
                            className="p-3 hover:bg-gray-200 rounded-r-xl transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </motion.button>
                        </div>
                        
                        <motion.button
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removeFromCart(Number(item.product.id))}
                          className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-xl p-8 sticky top-8"
            >
              <h2 className="text-2xl font-black text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({itemCount} items)</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-semibold">Free</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>${(getTotalPrice() * 0.08).toFixed(2)}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span>${(getTotalPrice() * 1.08).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <AnimatedButton
                as={Link}
                to="/checkout"
                variant="gradient"
                size="lg"
                className="w-full mb-4 text-lg font-bold py-4"
                icon={<ArrowRight className="w-5 h-5" />}
                iconPosition="right"
              >
                Proceed to Checkout
              </AnimatedButton>

              <AnimatedButton
                as={Link}
                to="/shop"
                variant="outline"
                size="lg"
                className="w-full"
              >
                Continue Shopping
              </AnimatedButton>

              {/* Benefits */}
              <div className="mt-8 space-y-4">
                <h3 className="font-bold text-gray-900">Your Benefits:</h3>
                {[
                  { icon: <Truck className="w-5 h-5" />, text: 'Free worldwide shipping', color: 'text-blue-600' },
                  { icon: <Shield className="w-5 h-5" />, text: '30-day money back guarantee', color: 'text-green-600' },
                  { icon: <Gift className="w-5 h-5" />, text: 'Exclusive member discounts', color: 'text-purple-600' },
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3 text-sm">
                    <div className={benefit.color}>{benefit.icon}</div>
                    <span className="text-gray-600">{benefit.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedCartPage;