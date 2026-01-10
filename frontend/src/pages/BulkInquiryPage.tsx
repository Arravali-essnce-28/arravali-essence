import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Send, Phone, Mail, Clock, Users, Truck, Calculator, FileText, CheckCircle, Star, Quote, Globe, Shield, Award, TrendingUp, HelpCircle, DollarSign, Ship, Warehouse, Leaf, Zap, Target, AlertCircle, TrendingDown, Timer, Crown, Flame } from 'lucide-react';
import AnimatedButton from '../components/ui/AnimatedButton';

const BulkInquiryPage: React.FC = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    businessType: '',
    products: '',
    quantity: '',
    frequency: '',
    budget: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
      setIsSubmitting(false);
      setFormData({ 
        companyName: '', 
        contactName: '', 
        email: '', 
        phone: '', 
        businessType: '', 
        products: '', 
        quantity: '', 
        frequency: '', 
        budget: '', 
        message: '' 
      });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 12 } }
  };

  const benefits = [
    {
      icon: <Truck className="w-6 h-6" />,
      title: 'Free Shipping',
      description: 'On orders over $500',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Calculator className="w-6 h-6" />,
      title: 'Volume Discounts',
      description: 'Up to 30% off bulk orders',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Dedicated Support',
      description: 'Personal account manager',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Custom Packaging',
      description: 'Branded options available',
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-primary-600 via-orange-600 to-red-600 text-white py-24 relative overflow-hidden"
      >
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                rotate: [0, 360],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 15 + Math.random() * 10,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Package className="w-6 h-6 text-white/20" />
            </motion.div>
          ))}
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-black mb-6">
              Bulk <span className="text-yellow-300">Inquiry</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Partner with us for premium spices at wholesale prices. Perfect for restaurants, retailers, and distributors.
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-black text-gray-900 mb-4">Why Choose Bulk Orders?</h2>
            <p className="text-xl text-gray-600">Get exclusive benefits when you order in bulk</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl p-6 border border-gray-100"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${benefit.color} rounded-2xl flex items-center justify-center text-white mb-4`}>
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Urgency & Priority Section */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-orange-600 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                rotate: [0, 360],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 20 + Math.random() * 10,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Flame className="w-6 h-6 text-white/10" />
            </motion.div>
          ))}
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                <AlertCircle className="w-12 h-12 text-white" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Don't Wait - <span className="text-yellow-300">Act Now!</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto mb-8">
              Limited-time bulk pricing expires soon. Secure your competitive advantage before your competitors do.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
            >
              <div className="flex items-center gap-3 mb-4">
                <Timer className="w-8 h-8 text-yellow-300" />
                <h3 className="text-2xl font-bold">Time-Sensitive</h3>
              </div>
              <p className="text-white/90 mb-4">
                Current bulk pricing tiers expire in <span className="font-black text-yellow-300">7 days</span>
              </p>
              <div className="text-sm text-white/80">
                Lock in current rates before seasonal price increases take effect
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
            >
              <div className="flex items-center gap-3 mb-4">
                <TrendingDown className="w-8 h-8 text-yellow-300" />
                <h3 className="text-2xl font-bold">Price Protection</h3>
              </div>
              <p className="text-white/90 mb-4">
                Secure <span className="font-black text-yellow-300">30% savings</span> vs retail pricing
              </p>
              <div className="text-sm text-white/80">
                Market prices are rising - protect your business with locked-in bulk rates
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
            >
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-8 h-8 text-yellow-300" />
                <h3 className="text-2xl font-bold">Competitive Edge</h3>
              </div>
              <p className="text-white/90 mb-4">
                <span className="font-black text-yellow-300">87% of businesses</span> lose to competitors with better sourcing
              </p>
              <div className="text-sm text-white/80">
                Join successful businesses already saving thousands with bulk purchasing
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-12 text-center"
          >
            <div className="bg-yellow-400 text-gray-900 rounded-2xl p-6 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Crown className="w-6 h-6" />
                <h3 className="text-2xl font-black">Priority Processing</h3>
              </div>
              <p className="font-semibold mb-4">
                Submit your inquiry now and get <span className="text-2xl font-black">VIP treatment</span>
              </p>
              <div className="text-sm space-y-1">
                <p>✓ Skip the queue - Immediate response from senior account managers</p>
                <p>✓ Free sample kit with your inquiry ($199 value)</p>
                <p>✓ Exclusive access to limited stock premium spices</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Limited Time Offers Section */}
      <section className="py-16 bg-yellow-50 border-y-4 border-yellow-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full mb-4">
              <Zap className="w-5 h-5" />
              <span className="font-bold">LIMITED TIME</span>
            </div>
            <h2 className="text-4xl font-black text-gray-900 mb-4">Exclusive Bulk Offers</h2>
            <p className="text-xl text-gray-600">These deals won't last - secure them before they're gone</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Starter Package Deal",
                originalPrice: "$599",
                newPrice: "$399",
                savings: "33%",
                deadline: "48 hours",
                items: ["5kg Premium Spices Bundle", "Free Shipping", "Quality Reports"],
                urgency: "Only 12 packages left"
              },
              {
                title: "Business Growth Pack",
                originalPrice: "$1,299",
                newPrice: "$799",
                savings: "38%",
                deadline: "3 days",
                items: ["25kg Assorted Spices", "Custom Labeling", "Priority Support"],
                urgency: "8 packages claimed today"
              },
              {
                title: "Enterprise Solution",
                originalPrice: "$2,999",
                newPrice: "$1,499",
                savings: "50%",
                deadline: "5 days",
                items: ["100kg Bulk Selection", "Dedicated Manager", "R&D Consultation"],
                urgency: "Limited to first 10 businesses"
              }
            ].map((offer, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white rounded-2xl shadow-xl hover:shadow-2xl p-6 border-2 border-red-200 relative"
              >
                <div className="absolute -top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                  {offer.deadline} left
                </div>
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{offer.title}</h3>
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-gray-400 line-through">{offer.originalPrice}</span>
                    <span className="text-3xl font-black text-red-600">{offer.newPrice}</span>
                  </div>
                  <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold inline-block mt-2">
                    Save {offer.savings}
                  </div>
                </div>
                <ul className="space-y-2 mb-4">
                  {offer.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="bg-red-50 text-red-700 px-3 py-2 rounded-lg text-sm font-semibold text-center">
                  ⚠️ {offer.urgency}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Signals Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-black mb-4">Why 1,247+ Businesses Trust Spicees</h2>
            <p className="text-xl text-gray-300">Join the leaders in premium spice sourcing</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {[
              { number: "1,247", label: "Active Business Clients", icon: <Users className="w-6 h-6" /> },
              { number: "50,000+", label: "kg Spices Shipped Monthly", icon: <Package className="w-6 h-6" /> },
              { number: "98%", label: "Customer Satisfaction", icon: <Star className="w-6 h-6" /> },
              { number: "15+", label: "Years in Business", icon: <Award className="w-6 h-6" /> }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="flex justify-center mb-3 text-primary-400">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-black text-primary-400 mb-2">{stat.number}</div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Shield className="w-8 h-8 text-yellow-300" />
              <h3 className="text-2xl font-bold">Risk-Free Guarantee</h3>
            </div>
            <p className="text-xl mb-6">
              Not satisfied? Get a <span className="font-black text-yellow-300">100% refund</span> within 30 days
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <CheckCircle className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <p className="font-semibold">Quality Assurance</p>
                <p className="text-gray-300">Premium grade guaranteed</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <CheckCircle className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <p className="font-semibold">On-Time Delivery</p>
                <p className="text-gray-300">Or your shipping is free</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <CheckCircle className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <p className="font-semibold">Price Match</p>
                <p className="text-gray-300">Beat any competitor's price</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Inquiry Form Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-black text-gray-900 mb-4">Secure Your Bulk Pricing NOW</h2>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                ⚠️ Limited Time: 7 Days Left
              </div>
              <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
                ✓ Instant Response Guaranteed
              </div>
            </div>
            <p className="text-xl text-gray-600">Fill out the form below and lock in your savings before prices increase</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100"
          >
            {isSubmitted ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-12"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6, repeat: 2 }}
                  className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <CheckCircle className="w-8 h-8 text-white" />
                </motion.div>
                <h4 className="text-2xl font-bold text-gray-900 mb-2">🎉 Priority Access Secured!</h4>
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
                  <p className="text-green-800 font-semibold mb-2">Your inquiry has been flagged for IMMEDIATE priority processing</p>
                  <p className="text-green-700 text-sm">Senior account manager will contact you within 2 hours during business</p>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4">
                  <p className="text-yellow-800 font-bold mb-1">⏰ IMPORTANT: Your pricing lock-in is reserved</p>
                  <p className="text-yellow-700 text-sm">Current bulk rates held for 48 hours exclusively for you</p>
                </div>
                <p className="text-gray-600 mb-4">Watch your email for your exclusive bulk pricing package!</p>
                <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>+1 (555) 123-BULK</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>bulk@spicees.com</span>
                  </div>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Company Name *</label>
                    <input
                      type="text"
                      name="companyName"
                      required
                      value={formData.companyName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-primary-500/20 focus:ring-4 transition-all"
                      placeholder="Your company name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Contact Name *</label>
                    <input
                      type="text"
                      name="contactName"
                      required
                      value={formData.contactName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-primary-500/20 focus:ring-4 transition-all"
                      placeholder="Your full name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-primary-500/20 focus:ring-4 transition-all"
                      placeholder="business@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-primary-500/20 focus:ring-4 transition-all"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Business Type *</label>
                  <select
                    name="businessType"
                    required
                    value={formData.businessType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-primary-500/20 focus:ring-4 transition-all"
                  >
                    <option value="">Select business type</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="retail">Retail Store</option>
                    <option value="distributor">Distributor</option>
                    <option value="manufacturer">Food Manufacturer</option>
                    <option value="ecommerce">E-commerce</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Products Interested In *</label>
                  <textarea
                    name="products"
                    required
                    rows={3}
                    value={formData.products}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-primary-500/20 focus:ring-4 transition-all resize-none"
                    placeholder="List the spices/products you're interested in (e.g., Turmeric Powder, Cardamom Pods, etc.)"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Estimated Quantity *</label>
                    <select
                      name="quantity"
                      required
                      value={formData.quantity}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-primary-500/20 focus:ring-4 transition-all"
                    >
                      <option value="">Select quantity range</option>
                      <option value="10-50">10-50 kg/month</option>
                      <option value="50-100">50-100 kg/month</option>
                      <option value="100-500">100-500 kg/month</option>
                      <option value="500+">500+ kg/month</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Order Frequency *</label>
                    <select
                      name="frequency"
                      required
                      value={formData.frequency}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-primary-500/20 focus:ring-4 transition-all"
                    >
                      <option value="">Select frequency</option>
                      <option value="weekly">Weekly</option>
                      <option value="biweekly">Bi-weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="quarterly">Quarterly</option>
                      <option value="onetime">One-time order</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Estimated Budget</label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-primary-500/20 focus:ring-4 transition-all"
                  >
                    <option value="">Select budget range (optional)</option>
                    <option value="500-1000">$500 - $1,000/month</option>
                    <option value="1000-5000">$1,000 - $5,000/month</option>
                    <option value="5000-10000">$5,000 - $10,000/month</option>
                    <option value="10000+">$10,000+/month</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Additional Message</label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-primary-500/20 focus:ring-4 transition-all resize-none"
                    placeholder="Any specific requirements, questions, or additional information..."
                  />
                </div>
                
                <AnimatedButton
                  type="submit"
                  variant="gradient"
                  size="lg"
                  loading={isSubmitting}
                  icon={<Send className="w-5 h-5" />}
                  iconPosition="right"
                  className="w-full text-lg font-bold py-4"
                >
                  {isSubmitting ? 'Locking In Your Rates...' : '🔒 SECURE BULK PRICING NOW'}
                </AnimatedButton>
              </form>
            )}
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white mx-auto mb-4">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Call Us</h3>
              <p className="text-gray-600">+1 (555) 123-BULK</p>
              <p className="text-sm text-gray-500">Mon-Fri 9AM-6PM EST</p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center text-white mx-auto mb-4">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-600">bulk@spicees.com</p>
              <p className="text-sm text-gray-500">24/7 support</p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-white mx-auto mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Response Time</h3>
              <p className="text-gray-600">Within 24 hours</p>
              <p className="text-sm text-gray-500">Business days only</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Product Categories Showcase */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-black text-gray-900 mb-4">Premium Spice Categories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Source from our extensive collection of high-quality spices, herbs, and blends</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Ground Spices",
                description: "Finely milled powders for consistent flavor and color",
                items: ["Turmeric", "Cumin", "Coriander", "Chili Powder", "Garam Masala"],
                icon: <Package className="w-8 h-8" />,
                color: "from-orange-500 to-red-500"
              },
              {
                title: "Whole Spices",
                description: "Premium whole spices for maximum freshness and aroma",
                items: ["Cardamom Pods", "Cloves", "Cinnamon Sticks", "Peppercorns", "Star Anise"],
                icon: <Globe className="w-8 h-8" />,
                color: "from-green-500 to-emerald-500"
              },
              {
                title: "Specialty Blends",
                description: "Expertly crafted spice blends for authentic flavors",
                items: ["Curry Powder", "Tandoori Masala", "Chaat Masala", "Sambhar Powder", "Panch Phoran"],
                icon: <Award className="w-8 h-8" />,
                color: "from-purple-500 to-pink-500"
              },
              {
                title: "Herbs & Leaves",
                description: "Aromatic herbs and leaves for culinary excellence",
                items: ["Bay Leaves", "Curry Leaves", "Fenugreek Leaves", "Mint", "Oregano"],
                icon: <Leaf className="w-8 h-8" />,
                color: "from-lime-500 to-green-500"
              },
              {
                title: "Seeds & Grains",
                description: "Premium quality seeds and grains for diverse cuisines",
                items: ["Mustard Seeds", "Fenugreek Seeds", "Poppy Seeds", "Sesame Seeds", "Fennel Seeds"],
                icon: <Calculator className="w-8 h-8" />,
                color: "from-yellow-500 to-orange-500"
              },
              {
                title: "Exotic Spices",
                description: "Rare and exotic spices for gourmet applications",
                items: ["Saffron", "Vanilla Beans", "Nutmeg", "Mace", "Long Pepper"],
                icon: <Star className="w-8 h-8" />,
                color: "from-indigo-500 to-purple-500"
              }
            ].map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white rounded-2xl shadow-xl hover:shadow-2xl p-8 border border-gray-100"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-2xl flex items-center justify-center text-white mb-6`}>
                  {category.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{category.title}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <div className="space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Tiers Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-black text-gray-900 mb-4">Volume Pricing Tiers</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">The more you order, the more you save. Competitive pricing for all business sizes.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                tier: "Starter",
                minOrder: "10-50 kg",
                discount: "5-10%",
                features: ["Standard packaging", "Email support", "2-3 week delivery"],
                color: "from-blue-500 to-cyan-500",
                popular: false
              },
              {
                tier: "Business",
                minOrder: "50-100 kg",
                discount: "10-15%",
                features: ["Custom labeling", "Priority support", "1-2 week delivery", "Quality reports"],
                color: "from-green-500 to-emerald-500",
                popular: true
              },
              {
                tier: "Professional",
                minOrder: "100-500 kg",
                discount: "15-20%",
                features: ["Branded packaging", "Dedicated account manager", "1 week delivery", "Batch testing", "Flexible payment"],
                color: "from-purple-500 to-pink-500",
                popular: false
              },
              {
                tier: "Enterprise",
                minOrder: "500+ kg",
                discount: "20-30%",
                features: ["Fully custom solutions", "VIP support", "Express delivery", "R&D collaboration", "Exclusive pricing"],
                color: "from-orange-500 to-red-500",
                popular: false
              }
            ].map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className={`relative bg-white rounded-2xl shadow-xl hover:shadow-2xl p-8 border-2 ${
                  tier.popular ? 'border-primary-500' : 'border-gray-100'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                      Most Popular
                    </div>
                  </div>
                )}
                <div className={`w-16 h-16 bg-gradient-to-r ${tier.color} rounded-2xl flex items-center justify-center text-white mx-auto mb-6`}>
                  <DollarSign className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.tier}</h3>
                <p className="text-3xl font-black text-primary-600 mb-4">{tier.discount} OFF</p>
                <p className="text-gray-600 mb-6">Min. {tier.minOrder}</p>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-black text-gray-900 mb-4">What Our Partners Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Trusted by leading restaurants, retailers, and manufacturers worldwide</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Maria Rodriguez",
                position: "Executive Chef",
                company: "La Bella Vista Restaurant",
                content: "The quality of spices from Spicees has transformed our kitchen. The consistency in flavor and color is unmatched, and their bulk pricing has helped us reduce costs significantly.",
                rating: 5,
                avatar: "MR"
              },
              {
                name: "James Chen",
                position: "Purchasing Manager",
                company: "Global Foods Distributors",
                content: "We've been partnering with Spicees for over 3 years. Their reliable supply chain, competitive pricing, and exceptional customer service make them our preferred spice supplier.",
                rating: 5,
                avatar: "JC"
              },
              {
                name: "Priya Sharma",
                position: "CEO",
                company: "Authentic Spice Co.",
                content: "The custom blending services and quality control from Spicees have helped us launch several successful product lines. They truly understand the B2B spice business.",
                rating: 5,
                avatar: "PS"
              },
              {
                name: "Michael Thompson",
                position: "Operations Director",
                company: "Restaurant Group Inc.",
                content: "Managing spice inventory across 50 restaurants was challenging until we found Spicees. Their bulk ordering system and consistent delivery schedules have streamlined our operations.",
                rating: 5,
                avatar: "MT"
              },
              {
                name: "Sarah Johnson",
                position: "Product Developer",
                company: "Gourmet Foods Manufacturing",
                content: "The R&D team at Spicees has been invaluable in developing custom spice blends for our products. Their expertise and flexibility are second to none.",
                rating: 5,
                avatar: "SJ"
              },
              {
                name: "David Kim",
                position: "Store Manager",
                company: "International Market Chain",
                content: "Our customers love the premium quality spices we stock from Spicees. The branded packaging and consistent quality have helped us build a loyal customer base.",
                rating: 5,
                avatar: "DK"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white rounded-2xl shadow-xl hover:shadow-2xl p-8 border border-gray-100"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-primary-200 mb-4" />
                <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.position}</p>
                    <p className="text-xs text-primary-600">{testimonial.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-black text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Everything you need to know about bulk spice ordering</p>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: "What is the minimum order quantity for bulk purchases?",
                answer: "Our minimum order quantity starts at 10kg per spice. However, we offer better pricing tiers for larger orders - 50kg, 100kg, and 500+kg categories with increasing discounts."
              },
              {
                question: "How long does shipping take for bulk orders?",
                answer: "Shipping times vary based on order size and location. Standard bulk orders (10-100kg) typically take 2-3 weeks, while larger orders (100kg+) may take 1-2 weeks. Express shipping options are available for urgent requirements."
              },
              {
                question: "Do you provide custom spice blending services?",
                answer: "Yes! We offer custom blending services for orders above 50kg. Our R&D team can work with you to create unique spice blends tailored to your specific requirements and flavor profiles."
              },
              {
                question: "What quality certifications do your spices have?",
                answer: "All our spices are ISO 22000, HACCP, and FDA certified. We provide comprehensive quality reports with each batch, including purity tests, moisture content, and microbiological analysis."
              },
              {
                question: "Can I get samples before placing a bulk order?",
                answer: "Absolutely! We provide complimentary samples for serious bulk inquiries. Sample sizes are typically 100-250g per spice, allowing you to evaluate quality before making a larger commitment."
              },
              {
                question: "What payment terms do you offer for bulk orders?",
                answer: "We offer flexible payment terms including NET 30, NET 60, and letter of credit options for qualified customers. For new customers, we typically require 50% upfront with 50% on delivery."
              },
              {
                question: "Do you offer private labeling and custom packaging?",
                answer: "Yes, private labeling is available for orders above 100kg. We can work with your branding requirements and offer various packaging options from 100g to 25kg sizes."
              },
              {
                question: "How do you ensure consistent quality across batches?",
                answer: "We implement strict quality control measures including batch testing, standardized sourcing from trusted farms, and advanced storage facilities. Each batch comes with a certificate of analysis."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl p-6 border border-gray-100"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{faq.question}</h3>
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Shipping & Logistics Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-black text-gray-900 mb-4">Shipping & Logistics</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Global delivery solutions tailored to your business needs</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Ship className="w-8 h-8 text-primary-600" />
                  Global Shipping Network
                </h3>
                <div className="space-y-4">
                  {[
                    "North America: 2-5 business days",
                    "Europe: 5-10 business days", 
                    "Asia Pacific: 7-14 business days",
                    "Middle East & Africa: 10-15 business days",
                    "South America: 10-20 business days"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Warehouse className="w-8 h-8 text-primary-600" />
                  Storage & Warehousing
                </h3>
                <p className="text-gray-600 mb-4">
                  Our state-of-the-art warehousing facilities ensure optimal spice preservation:
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "Climate-controlled storage",
                    "Pest control systems",
                    "First-in-first-out inventory",
                    "Real-time stock monitoring"
                  ].map((feature, index) => (
                    <div key={index} className="bg-gray-50 rounded-xl p-4">
                      <Shield className="w-6 h-6 text-primary-600 mb-2" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Package className="w-8 h-8 text-primary-600" />
                  Packaging Options
                </h3>
                <div className="space-y-4">
                  {[
                    { size: "100g - 1kg", type: "Retail packaging", ideal: "Small businesses" },
                    { size: "5kg - 25kg", type: "Bulk bags", ideal: "Restaurants" },
                    { size: "50kg - 100kg", type: "Industrial drums", ideal: "Manufacturers" },
                    { size: "200kg+", type: "Custom containers", ideal: "Distributors" }
                  ].map((option, index) => (
                    <div key={index} className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-4 border border-gray-200">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-bold text-gray-900">{option.size}</h4>
                          <p className="text-sm text-gray-600">{option.type}</p>
                        </div>
                        <span className="text-xs bg-primary-100 text-primary-700 px-3 py-1 rounded-full">
                          {option.ideal}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Truck className="w-8 h-8 text-primary-600" />
                  Delivery Options
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { name: "Standard Ground", time: "5-10 days", cost: "Most economical" },
                    { name: "Express Air", time: "2-5 days", cost: "For urgent orders" },
                    { name: "Ocean Freight", time: "15-30 days", cost: "Large volumes" },
                    { name: "White Glove", time: "Scheduled", cost: "Premium service" }
                  ].map((service, index) => (
                    <div key={index} className="flex items-center justify-between bg-white rounded-xl p-4 shadow-md border border-gray-100">
                      <div>
                        <h4 className="font-bold text-gray-900">{service.name}</h4>
                        <p className="text-sm text-gray-600">{service.time}</p>
                      </div>
                      <span className="text-sm text-primary-600 font-medium">{service.cost}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BulkInquiryPage;
