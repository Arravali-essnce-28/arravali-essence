import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Gift, CheckCircle, Sparkles, Star, Award, Users, TrendingUp } from 'lucide-react';
import AnimatedButton from './ui/AnimatedButton';

const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [subscriberCount, setSubscriberCount] = useState(12847);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError('');
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    
    setIsLoading(true);
    
    setTimeout(() => {
      setIsSubscribed(true);
      setEmail('');
      setIsLoading(false);
      setSubscriberCount(prev => prev + 1);
      setTimeout(() => setIsSubscribed(false), 5000);
    }, 1500);
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSubscriberCount(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-gradient-to-br from-primary-50 via-orange-50 to-yellow-50 relative overflow-hidden">
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              rotate: [0, 360],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 2,
            }}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-primary-200 to-orange-200 rounded-full opacity-20" />
          </motion.div>
        ))}
        
        {[Gift, Sparkles, Star, Award].map((Icon, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${20 + i * 20}%`,
              top: `${10 + i * 15}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              rotate: [-5, 5, -5],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Icon className="w-8 h-8 text-primary-300 opacity-30" />
          </motion.div>
        ))}
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl p-12 border border-white/50 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-orange-500/5 to-yellow-500/5 animate-pulse" />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex justify-center items-center gap-8 mb-8 flex-wrap"
          >
            <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full">
              <Users className="w-4 h-4" />
              <span className="font-semibold">{subscriberCount.toLocaleString()}+ Subscribers</span>
            </div>
            <div className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
              <TrendingUp className="w-4 h-4" />
              <span className="font-semibold">Growing Daily</span>
            </div>
            <div className="flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full">
              <Award className="w-4 h-4" />
              <span className="font-semibold">Premium Content</span>
            </div>
          </motion.div>
          
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="relative inline-block mb-6"
          >
            <Gift className="w-20 h-20 text-primary-600 mx-auto" />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
            >
              <Sparkles className="w-3 h-3 text-white" />
            </motion.div>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-4xl md:text-6xl font-black text-gray-900 mb-6 leading-tight"
          >
            Get <span className="bg-gradient-to-r from-primary-600 via-orange-500 to-red-500 bg-clip-text text-transparent">15% Off</span>
            <br />Your First Order
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            Join our <span className="font-bold text-primary-600">premium spice family</span> and receive exclusive recipes, 
            cooking tips, and special offers delivered to your inbox.
          </motion.p>

          <AnimatePresence mode="wait">
            {!isSubscribed ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                onSubmit={handleSubmit}
                className="max-w-lg mx-auto"
              >
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                  <div className="flex-1 relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setEmailError('');
                      }}
                      placeholder="Enter your premium email"
                      className={`w-full pl-12 pr-4 py-5 rounded-2xl border-2 transition-all text-gray-900 placeholder-gray-500 text-lg ${
                        emailError 
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
                          : 'border-gray-200 focus:border-primary-500 focus:ring-primary-500/20'
                      } focus:ring-4 focus:outline-none`}
                    />
                  </div>
                  <AnimatedButton
                    type="submit"
                    variant="gradient"
                    size="lg"
                    loading={isLoading}
                    glow
                    className="px-10 py-5 text-lg font-bold rounded-2xl shadow-xl"
                  >
                    {isLoading ? 'Subscribing...' : 'Get 15% Off'}
                  </AnimatedButton>
                </div>
                
                {emailError && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mb-4 text-center"
                  >
                    {emailError}
                  </motion.p>
                )}
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="flex items-center justify-center gap-4 text-gray-500 text-sm"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>No spam</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Unsubscribe anytime</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Privacy protected</span>
                  </div>
                </motion.div>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-center"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6, repeat: 2 }}
                  className="inline-block mb-4"
                >
                  <CheckCircle className="w-16 h-16 text-green-600 mx-auto" />
                </motion.div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  🎉 Welcome to the Spice Family!
                </h3>
                <p className="text-lg text-gray-600 mb-4">
                  Check your email for your <span className="font-bold text-green-600">15% discount code</span>
                </p>
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 inline-block">
                  <p className="text-green-700 font-semibold">Your premium benefits are now active!</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-700"
          >
            {[
              { icon: <Star className="w-6 h-6" />, title: 'Exclusive Recipes', desc: 'Chef-curated recipes weekly' },
              { icon: <TrendingUp className="w-6 h-6" />, title: 'Early Access to Sales', desc: 'Be first to grab deals' },
              { icon: <Award className="w-6 h-6" />, title: 'Cooking Tips & Tricks', desc: 'Master spice techniques' },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.2 + index * 0.2, duration: 0.6 }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="flex flex-col items-center text-center p-6 bg-white/50 rounded-2xl border border-white/50 backdrop-blur-sm hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-orange-500 rounded-full flex items-center justify-center text-white mb-4">
                  {benefit.icon}
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{benefit.title}</h4>
                <p className="text-sm text-gray-600">{benefit.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;