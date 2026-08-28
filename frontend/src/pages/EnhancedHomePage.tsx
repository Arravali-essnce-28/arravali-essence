import React, { useEffect, useState, useMemo } from 'react';
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
  const [loading, setLoading] = useState(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -50]);

  const floatingBlobs = useMemo(
    () =>
      Array.from({ length: 8 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 10 + Math.random() * 5,
      })),
    []
  );

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
      "https://www.facebook.com/Aravalli-essence",
      "https://www.instagram.com/aravalli_essence"
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
    "description": "Best spices in UK. Authentic Indian spices online shop with delivery across London, Birmingham, Leicester, Manchester and all UK cities.",
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
    "areaServed": [
      { "@type": "City", "name": "London" },
      { "@type": "City", "name": "Birmingham" },
      { "@type": "City", "name": "Leicester" },
      { "@type": "City", "name": "Manchester" },
      { "@type": "City", "name": "Leeds" },
      { "@type": "City", "name": "Bristol" },
      { "@type": "Country", "name": "United Kingdom" }
    ],
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
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
        title="Best Spices in UK | Buy Authentic Indian Spices Online"
        description="Arravali Essence – the best spices website in the UK. Buy authentic Indian spices online. Fast delivery to London, Birmingham, Leicester, Manchester & all UK cities."
        keywords="best spices in uk, spices in uk, spices website uk, buy spices uk, best spices in london, spices london, spices birmingham, spices leicester, spices manchester, indian spices uk, uk spice shop, spice delivery uk"
      />
      <AdvancedHeroSection />

      {/* Trust & Guarantee Banner */}
      <section className="bg-white border-y border-stone-200/70 py-6 sm:py-7">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-700 shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-xs sm:text-sm text-stone-900 leading-tight">Fast UK Delivery</p>
                <p className="text-[11px] text-stone-500 mt-0.5">Dispatched quickly across UK</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-700 shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-xs sm:text-sm text-stone-900 leading-tight">100% Authentic</p>
                <p className="text-[11px] text-stone-500 mt-0.5">Sourced direct from farms</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-700 shrink-0">
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-xs sm:text-sm text-stone-900 leading-tight">Pure & Natural</p>
                <p className="text-[11px] text-stone-500 mt-0.5">No fillers or additives</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-700 shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-xs sm:text-sm text-stone-900 leading-tight">Premium Grade</p>
                <p className="text-[11px] text-stone-500 mt-0.5">Aroma-sealed freshness</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curated Spice Collection Section */}
      <section className="py-16 sm:py-20 bg-stone-50/60 border-b border-stone-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-10 sm:mb-14"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-amber-900 bg-amber-100/80 border border-amber-200/80 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Premium Collection</span>
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 tracking-tight">
              Explore Our Spice Collection
            </motion.h2>
            <motion.p variants={itemVariants} className="text-sm sm:text-base text-stone-600 mt-2.5">
              Hand-selected from heritage farms, packed fresh to preserve essential oils, rich flavor, and authentic aroma.
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
          >
            {[
              {
                name: 'Whole Spices',
                count: '12+ Items',
                image: '/images/products/whole-spices.jpg',
                description: 'Intact pods, seeds & barks for deep infused flavor',
                href: '/shop?category=whole-spices'
              },
              {
                name: 'Ground Spices',
                count: '18+ Items',
                image: '/images/products/ground-spices.jpg',
                description: 'Finely milled pure powders with vibrant colors',
                href: '/shop?category=ground-spices'
              },
              {
                name: 'Spice Blends',
                count: '8+ Varieties',
                image: '/images/products/spice-blend.jpg',
                description: 'Traditional master mixes crafted for authentic dishes',
                href: '/shop?category=spice-blends'
              },
              {
                name: 'Organic Range',
                count: '15+ Products',
                image: '/images/products/organic.jpg',
                description: 'Certified organic spices grown sustainably',
                href: '/shop?category=organic'
              },
            ].map((category, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative overflow-hidden rounded-2xl bg-white border border-stone-200/80 shadow-xs hover:shadow-xl hover:border-stone-300 transition-all duration-300 flex flex-col"
              >
                <Link to={category.href} className="block relative aspect-[4/3] overflow-hidden bg-stone-100">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/hero.jpg';
                    }}
                  />
                  <div className="absolute top-3 right-3 bg-stone-900/70 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-0.5 rounded-full">
                    {category.count}
                  </div>
                </Link>

                <div className="p-4 flex flex-col flex-1 justify-between bg-white">
                  <div>
                    <h3 className="font-semibold text-stone-900 text-base group-hover:text-amber-700 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-xs text-stone-500 mt-1 leading-relaxed line-clamp-2">
                      {category.description}
                    </p>
                  </div>
                  <Link 
                    to={category.href}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-stone-800 group-hover:text-amber-700 mt-4 transition-colors pt-2 border-t border-stone-100"
                  >
                    <span>Browse Collection</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* UK-Specific SEO Section */}
      <section className="py-16 sm:py-20 bg-white overflow-hidden border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full inline-block mb-3">
                Nationwide Delivery
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 tracking-tight leading-tight mb-4">
                UK's Leading Supplier of <span className="text-amber-700">Authentic Indian Spices</span>
              </h2>
              <p className="text-sm sm:text-base text-stone-600 mb-4 leading-relaxed">
                Searching for the best spices in the UK? Arravali Essence brings the vibrant spice markets of India directly to your doorstep across London, Leicester, Birmingham, Manchester, and throughout the United Kingdom.
              </p>
              <p className="text-xs sm:text-sm text-stone-500 mb-6 leading-relaxed">
                As a premier UK spice shop, we specialise in hand-picked, premium-grade spices sourced from sustainable farms. Whether you need bulk spices for your restaurant or exquisite blends for your kitchen, our quality remains unmatched.
              </p>
              <div className="grid grid-cols-2 gap-3.5 pt-2">
                <div className="flex items-center gap-2 text-xs font-medium text-stone-800">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Fast UK Delivery</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-stone-800">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Bespoke Spice Blends</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-stone-800">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% Purity Guarantee</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-stone-800">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Ethically Sourced</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <div className="rounded-2xl overflow-hidden shadow-xl border border-stone-200 bg-stone-100">
                <img
                  src="/images/banner-2.jpg"
                  alt="Authentic Spices UK"
                  className="w-full h-80 sm:h-96 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/hero.jpg';
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <TestimonialsSection />

      {/* City-targeted SEO section */}
      <section className="py-12 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 text-center">
            The Best Spices Website in the UK – Delivered to Your Door
          </h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-8">
            Whether you're searching for <strong>spices in London</strong>, <strong>spices in Birmingham</strong>, <strong>spices in Leicester</strong>, <strong>spices in Manchester</strong>, or anywhere across the UK – Arravali Essence is your trusted online spice shop. We deliver premium, authentic Indian spices to every UK city.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
            {['London', 'Birmingham', 'Leicester', 'Manchester', 'Leeds', 'Bristol'].map(city => (
              <div key={city} className="bg-white rounded-xl p-4 shadow-sm border border-amber-100">
                <p className="font-semibold text-gray-800 text-sm">Spices in {city}</p>
                <p className="text-xs text-primary-600 mt-1">Fast UK Delivery</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <NewsletterSection />
      <ContactUsSection />
      <FeedbackSection />
    </div>
  );
};

export default EnhancedHomePage;