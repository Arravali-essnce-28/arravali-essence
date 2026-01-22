import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, Variants, AnimationGeneratorType } from 'framer-motion';
import { 
  ArrowRight, Star, Leaf, Shield, Truck, Award, Clock, Heart, 
  Sparkles, ChefHat, Users, TrendingUp, Zap, Globe, CheckCircle 
} from 'lucide-react';
import { getProducts } from '../data/products';
import { useCart } from '../contexts/CartContext';
import AdvancedHeroSection from '../components/ui/AdvancedHeroSection';
import EnhancedProductCard from '../components/ui/EnhancedProductCard';
import AnimatedButton from '../components/ui/AnimatedButton';
import TestimonialsSection from '../components/TestimonialsSection';
import NewsletterSection from '../components/NewsletterSection';
import FeedbackSection from '../components/FeedbackSection';
import ContactUsSection from '../components/ContactUsSection';
import type { Product } from '../types';

const EnhancedHomePage: React.FC = () => {
  const [visitorCount, setVisitorCount] = useState(45672);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -50]);
  
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadProducts();
  }, []);

  const featuredProducts = products.slice(0, 4);
  const bestSellers = [...products].sort((a, b) => b.rating - a.rating).slice(0, 4);
  const newArrivals = products.filter((p) => p.isNew).slice(0, 4);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisitorCount(prev => prev + Math.floor(Math.random() * 5));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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

  const itemVariants: Variants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as AnimationGeneratorType,
        stiffness: 100,
        damping: 12,
      },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-0 overflow-hidden">
      <AdvancedHeroSection />

      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="py-8 bg-gradient-to-r from-green-600 to-blue-600 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 text-center">
            
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-semibold text-sm sm:text-base">Free shipping worldwide</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-semibold text-sm sm:text-base">100% authentic</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-semibold text-sm sm:text-base">Premium quality</span>
            </div>
          </div>
        </div>
      </motion.section>

      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white relative">
        <motion.div style={{ y: y1 }} className="absolute inset-0 opacity-30">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-32 h-32 bg-gradient-to-r from-primary-200 to-orange-200 rounded-full"
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
        </motion.div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12 lg:mb-16"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-4 sm:mb-6">
              <Sparkles className="w-5 h-5" />
              <span className="font-semibold">Premium Collection</span>
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6">
              Our <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Spice</span> Collection
            </motion.h2>
            <motion.div variants={itemVariants} className="w-32 h-2 bg-gradient-to-r from-primary-600 to-orange-600 mx-auto rounded-full" />
          </motion.div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
          >
            {[
              { 
                name: 'Whole Spices', 
                count: '12+ Items', 
                image: 'images/products/whole-spices.png',
                color: 'from-amber-500'
              },
              { 
                name: 'Ground Spices', 
                count: '18+ Items', 
                image: 'images/products/ground-spices.png',
                color: 'from-red-500'
              },
              { 
                name: 'Spice Blends', 
                count: '8+ Varieties', 
                image: 'images/products/spice-blend.png',
                color: 'from-green-500'
              },
              { 
                name: 'Organic Range', 
                count: '15+ Products', 
                image: 'images/products/organic.png',
                color: 'from-purple-500'
              },
            ].map((category, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.05 }}
                className="group relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 h-64 sm:h-72 md:h-80"
              >
                <Link to="/shop" className="block h-full">
                  <div className="relative h-full overflow-hidden">
                    <motion.img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      whileHover={{ scale: 1.1 }}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="absolute bottom-4 left-4 right-4 text-white"
                    >
                      <h3 className="text-xl sm:text-2xl font-black mb-2">{category.name}</h3>
                      <p className="text-base sm:text-lg font-semibold opacity-90">{category.count}</p>
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-2 mt-3 text-sm font-medium"
                      >
                        <span>Explore Collection</span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    </motion.div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-center mb-16"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-8 h-8 text-yellow-500" />
                <span className="text-lg font-bold text-primary-600">Featured Collection</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900">Premium Spices</h2>
              <p className="text-lg sm:text-xl text-gray-600 mt-2">Hand-picked for exceptional quality</p>
            </div>
            <AnimatedButton
              as={Link}
              to="/shop"
              variant="gradient"
              size="lg"
              icon={<ArrowRight className="w-5 h-5" />}
              iconPosition="right"
              className="mt-6 sm:mt-0 md:mt-0"
            >
              View All Products
            </AnimatedButton>
          </motion.div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
          >
            {featuredProducts.map((product, index) => (
              <motion.div key={product.id} variants={itemVariants}>
                <EnhancedProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <TestimonialsSection />
      <NewsletterSection />
      <ContactUsSection />
      <FeedbackSection />
    </div>
  );
};

export default EnhancedHomePage;