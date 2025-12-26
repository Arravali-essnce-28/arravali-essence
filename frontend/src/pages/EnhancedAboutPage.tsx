import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Globe, Heart, Leaf, Star, ChefHat, Truck } from 'lucide-react';

const EnhancedAboutPage: React.FC = () => {
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
              className="absolute w-2 h-2 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
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
              Our <span className="text-yellow-300">Story</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              From humble beginnings to premium spice excellence - discover the passion behind Arravali Essence
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
                Premium Quality Since <span className="text-primary-600">1995</span>
              </h2>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                What started as a small family business has grown into a trusted name in premium spices. 
                We source directly from farmers, ensuring the highest quality and freshest flavors reach your kitchen.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our commitment to authenticity and quality has made us the preferred choice for home cooks 
                and professional chefs worldwide.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="relative">
              <img
                src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Spice Story"
                className="rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-primary-600 text-white p-6 rounded-2xl shadow-xl">
                <div className="text-3xl font-black">25+</div>
                <div className="text-sm">Years of Excellence</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Our Values</h2>
            <div className="w-32 h-2 bg-gradient-to-r from-primary-600 to-orange-600 mx-auto rounded-full" />
          </motion.div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { icon: <Award className="w-12 h-12" />, title: 'Premium Quality', desc: 'Only the finest spices make it to our collection', color: 'from-yellow-500 to-orange-500' },
              { icon: <Heart className="w-12 h-12" />, title: 'Passion Driven', desc: 'Every spice is selected with love and care', color: 'from-red-500 to-pink-500' },
              { icon: <Leaf className="w-12 h-12" />, title: 'Sustainable', desc: 'Supporting farmers and sustainable practices', color: 'from-green-500 to-teal-500' },
              { icon: <Globe className="w-12 h-12" />, title: 'Global Reach', desc: 'Serving spice lovers worldwide', color: 'from-blue-500 to-purple-500' },
            ].map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.05 }}
                className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 text-center"
              >
                <div className={`w-20 h-20 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-6 text-white`}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {[
              { number: '50K+', label: 'Happy Customers', icon: <Users className="w-8 h-8" /> },
              { number: '100+', label: 'Premium Spices', icon: <Star className="w-8 h-8" /> },
              { number: '25+', label: 'Countries Served', icon: <Globe className="w-8 h-8" /> },
              { number: '4.9★', label: 'Customer Rating', icon: <Award className="w-8 h-8" /> },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.1 }}
                className="p-6"
              >
                <div className="text-primary-600 mb-4 flex justify-center">{stat.icon}</div>
                <div className="text-4xl font-black text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-semibold">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default EnhancedAboutPage;