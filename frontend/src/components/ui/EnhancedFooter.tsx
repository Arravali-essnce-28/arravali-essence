import React, { useState } from 'react';
import { motion, type Variants, type AnimationGeneratorType } from 'framer-motion';
import { 
  Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, 
  Send, Heart, Star, Award, Truck, Shield, Clock, ArrowUp,
  Sparkles, ChefHat, Leaf, Globe, MessageSquare, Music
} from 'lucide-react';
import AnimatedButton from './AnimatedButton';

const EnhancedFooter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribed(true);
    setEmail('');
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => {
          const positions = [
            { left: '5%', top: '10%' },
            { left: '15%', top: '25%' },
            { left: '25%', top: '5%' },
            { left: '35%', top: '40%' },
            { left: '45%', top: '15%' },
            { left: '55%', top: '35%' },
            { left: '65%', top: '20%' },
            { left: '75%', top: '45%' },
            { left: '85%', top: '10%' },
            { left: '95%', top: '30%' },
            { left: '10%', top: '60%' },
            { left: '20%', top: '80%' },
            { left: '30%', top: '70%' },
            { left: '40%', top: '90%' },
            { left: '50%', top: '65%' },
            { left: '60%', top: '85%' },
            { left: '70%', top: '75%' },
            { left: '80%', top: '95%' },
            { left: '90%', top: '55%' },
            { left: '95%', top: '85%' },
          ];
          
          return (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: positions[i].left,
                top: positions[i].top,
              }}
              animate={{
                rotate: [0, 360],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 15 + (i * 0.5),
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {i % 4 === 0 && <Sparkles className="w-6 h-6 text-yellow-400" />}
              {i % 4 === 1 && <ChefHat className="w-6 h-6 text-orange-400" />}
              {i % 4 === 2 && <Leaf className="w-6 h-6 text-green-400" />}
              {i % 4 === 3 && <Star className="w-6 h-6 text-blue-400" />}
            </motion.div>
          );
        })}
      </div>

      {/* Newsletter Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-primary-600 via-orange-600 to-red-600 py-16 relative"
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="inline-block mb-6"
            >
              <div className="relative">
                <Mail className="w-16 h-16 text-white mx-auto" />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center"
                >
                  <Sparkles className="w-3 h-3 text-white" />
                </motion.div>
              </div>
            </motion.div>
            
            <h3 className="text-3xl md:text-4xl font-black mb-4">
              Share Your <span className="text-yellow-300">Experience</span>
            </h3>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Your feedback helps us improve and serve you better. We value every opinion and suggestion from our spice family.
            </p>
            
            {!isSubscribed ? (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row max-w-lg mx-auto gap-4">
                <div className="flex-1 relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email for feedback"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-white/30 text-lg"
                  />
                </div>
                <AnimatedButton
                  type="submit"
                  variant="outline"
                  size="lg"
                  icon={<Send className="w-5 h-5" />}
                  className="bg-white text-primary-600 hover:bg-gray-100 border-white px-8 py-4 rounded-2xl font-bold"
                >
                  Send Feedback
                </AnimatedButton>
              </form>
            ) : (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center justify-center gap-3 text-white"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6, repeat: 2 }}
                >
                  <Heart className="w-8 h-8 text-red-400 fill-current" />
                </motion.div>
                <span className="text-xl font-bold">Thank you for your feedback!</span>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Main Footer Content */}
      <div className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 footer-grid"
            >
            {/* Company Info */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-3 mb-6">
                <div className="relative">
                  <img src="/images/logo.png" alt="Arravali Essence Logo" className="h-32 w-auto" />
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center"
                  >
                    <Sparkles className="w-2 h-2 text-white" />
                  </motion.div>
                </div>
                <div>
                  <h3 className="text-2xl font-black bg-gradient-to-r from-primary-400 to-orange-400 bg-clip-text text-transparent">
                    Arravali Essence
                  </h3>
                  <p className="text-sm text-gray-400">Premium Spice Blends</p>
                </div>
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                Your premium destination for authentic spices from around the world. 
                Quality guaranteed, flavor delivered with passion since 1995.
              </p>
              
              <div className="flex space-x-4">
                {[
                  { icon: Facebook, color: 'hover:text-blue-400', bg: 'hover:bg-blue-400/10' },
                  { icon: Twitter, color: 'hover:text-sky-400', bg: 'hover:bg-sky-400/10' },
                  { icon: Instagram, color: 'hover:text-pink-400', bg: 'hover:bg-pink-400/10' },
                  { icon: Music, color: 'hover:text-gray-400', bg: 'hover:bg-gray-400/10' },
                  { icon: Youtube, color: 'hover:text-red-400', bg: 'hover:bg-red-400/10' },
                ].map(({ icon: Icon, color, bg }, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-3 rounded-xl bg-gray-800 text-gray-400 ${color} ${bg} transition-all duration-300`}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div variants={itemVariants}>
              <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Phone className="w-5 h-5 text-primary-400" />
                Contact Info
              </h4>
              <div className="space-y-4">
                {[
                  {
                    icon: MapPin,
                    text: 'Unit 7 Slater Street, Leicester, UK, LE3 5AS',
                    color: 'text-red-400',
                  },
                  {
                    icon: Phone,
                    text: '07774836106',
                    color: 'text-green-400',
                  },
                  {
                    icon: Mail,
                    text: 'sales@arravaliessence.com',
                    color: 'text-blue-400',
                  },
                ].map(({ icon: Icon, text, color }, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 5 }}
                    className="flex items-start space-x-3 group cursor-pointer"
                  >
                    <Icon className={`w-5 h-5 ${color} mt-1 group-hover:scale-110 transition-transform`} />
                    <span className="text-gray-300 group-hover:text-white transition-colors">
                      {text}
                    </span>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-8">
                <h5 className="font-bold mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary-400" />
                  Business Hours
                </h5>
                <div className="text-gray-300 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span>Mon - Fri:</span>
                    <span className="text-green-400 font-semibold">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span className="text-yellow-400 font-semibold">10:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span className="text-yellow-400 font-semibold">10:00 AM - 5:00 PM</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants}>
              <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary-400" />
                Quick Links
              </h4>
              <ul className="space-y-3">
                {[
                  { name: 'Home', href: '/' },
                  { name: 'Shop', href: '/shop' },
                  { name: 'About Us', href: '/about' },
                  { name: 'Contact', href: '/contact' },
                  { name: 'Recipes', href: '/recipes' },
                  { name: 'Blog', href: '/blog' },
                ].map((link, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-primary-400 transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 bg-primary-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Features Banner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 pt-12 border-t border-gray-700"
          >
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: Truck, title: 'Free Shipping', desc: 'On orders over $50', color: 'text-blue-400' },
                { icon: Award, title: 'Premium Quality', desc: 'ISO certified', color: 'text-yellow-400' },
                { icon: Shield, title: '100% Secure', desc: 'Safe payments', color: 'text-green-400' },
                { icon: Clock, title: 'Fast Delivery', desc: '24-48 hours', color: 'text-purple-400' },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="text-center group"
                >
                  <div className={`w-12 h-12 ${feature.color} mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-full h-full" />
                  </div>
                  <h6 className="font-bold text-white mb-1">{feature.title}</h6>
                  <p className="text-sm text-gray-400">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 py-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-gray-400 text-sm text-center md:text-left"
            >
              © 2024 Arravali Essence. All rights reserved. Made with{' '}
              <Heart className="inline w-4 h-4 text-red-400 fill-current mx-1" />
              for spice lovers worldwide.
            </motion.div>
            
            {/* Sticky Social Media Buttons */}
            <div className="flex items-center gap-3">
              {[
                { icon: Instagram, color: 'hover:text-pink-400', bg: 'hover:bg-pink-400/10' },
                { icon: Youtube, color: 'hover:text-red-400', bg: 'hover:bg-red-400/10' },
                { icon: Facebook, color: 'hover:text-blue-400', bg: 'hover:bg-blue-400/10' },
              ].map(({ icon: Icon, color, bg }, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-2 rounded-full bg-gray-800 text-gray-400 ${color} ${bg} transition-all duration-300 sticky`}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
            
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="bg-primary-600 hover:bg-primary-700 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default EnhancedFooter;