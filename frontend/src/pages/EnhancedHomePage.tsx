import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform, Variants, AnimationGeneratorType } from 'framer-motion';
import {
  ArrowRight, Star, Leaf, Shield, Truck, Award, Clock, Heart,
  Sparkles, ChefHat, Users, TrendingUp, Zap, Globe, CheckCircle
} from 'lucide-react';
import AdvancedHeroSection from '../components/ui/AdvancedHeroSection';
import TestimonialsSection from '../components/TestimonialsSection';
import NewsletterSection from '../components/NewsletterSection';
import FeedbackSection from '../components/FeedbackSection';
import ContactUsSection from '../components/ContactUsSection';
import SEO from '../components/SEO';

const EnhancedHomePage: React.FC = () => {
  const [visitorCount, setVisitorCount] = useState(45672);
  const [loading, setLoading] = useState(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -50]);





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

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Arravali Essence",
    "url": window.location.origin,
    "logo": `${window.location.origin}/logo.png`,
    "sameAs": [
      "https://facebook.com/arravaliessence",
      "https://instagram.com/arravaliessence"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+44 7774 836106",
      "contactType": "customer service"
    }
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Arravali Essence",
    "image": `${window.location.origin}/og-image.jpg`,
    "@id": window.location.origin,
    "url": window.location.origin,
    "telephone": "+44 7774 836106",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Unit 7 Slater Street",
      "addressLocality": "Leicester",
      "addressRegion": "Leicestershire",
      "postalCode": "LE3 5AS",
      "addressCountry": "GB"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    }
  };

  return (
    <div className="space-y-0 overflow-hidden">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
      </Helmet>
      <SEO
        title="Premium Authentic Indian Spices & Herbs"
        description="Experience the true flavors of India with Arravali Essence. We offer premium saffron, authentic spice blends, and organic herbs delivered worldwide."
        keywords="premium saffron, authentic indian spices, organic herbs, buy spices uk, uk spice shop, london spice delivery, arravali essence uk, online spice shopping uk"
      />
      <AdvancedHeroSection />

      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="py-8 bg-gradient-to-r from-stone-900 to-black text-white relative overflow-hidden border-y border-stone-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12 text-center">

            <div className="flex items-center gap-3">
              <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500" />
              <span className="font-semibold text-sm sm:text-base text-stone-200 uppercase tracking-widest">Great Shipping</span>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500" />
              <span className="font-semibold text-sm sm:text-base text-stone-200 uppercase tracking-widest">100% Authentic</span>
            </div>
            <div className="flex items-center gap-3">
              <Award className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500" />
              <span className="font-semibold text-sm sm:text-base text-stone-200 uppercase tracking-widest">Premium Quality</span>
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
                image: '/images/products/whole-spices.png',
                color: 'from-amber-500'
              },
              {
                name: 'Ground Spices',
                count: '18+ Items',
                image: '/images/products/ground-spices.png',
                color: 'from-red-500'
              },
              {
                name: 'Spice Blends',
                count: '8+ Varieties',
                image: '/images/products/spice-blend.png',
                color: 'from-green-500'
              },
              {
                name: 'Organic Range',
                count: '15+ Products',
                image: '/images/products/organic.png',
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

      {/* UK-Specific SEO Section */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6 uppercase tracking-wider">
                UK's Leading Supplier of <span className="text-primary-600">Authentic Indian Spices</span>
              </h2>
              <div className="w-20 h-1.5 bg-primary-600 mb-8 rounded-full" />
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Searching for the best <strong>spices in the UK</strong>? Arravali Essence brings the vibrant markets of India directly to your doorstep in <strong>London, Leicester, Birmingham</strong>, and across the United Kingdom.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                As a premier <strong>UK spice shop</strong>, we specialise in hand-picked, premium-grade spices sourced from sustainable farms. Whether you need <strong>bulk spices for your restaurant</strong> or exquisite blends for your home kitchen, our quality remains unmatched.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-bold text-gray-900">Next Day UK Delivery</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-bold text-gray-900">Bespoke Spice Blends</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-bold text-gray-900">100% Purity Guarantee</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-bold text-gray-900">Ethically Sourced</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:w-1/2 relative"
            >
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl transform lg:rotate-3 hover:rotate-0 transition-transform duration-500">
                <img
                  src="/images/banner-2.png"
                  alt="Authentic Spices UK"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
            </motion.div>
          </div>
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