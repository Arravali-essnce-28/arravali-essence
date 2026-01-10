import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Globe, Heart, Leaf, Star, ChefHat, Truck, Shield, CheckCircle, MapPin, User } from 'lucide-react';

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
    visible: { y: 0, opacity: 1, transition: { type: 'spring' as const, stiffness: 100, damping: 12 } }
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
              About <span className="text-yellow-300">Arravali Essence</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              From the fertile fields of India to kitchens worldwide, we bring you the finest spices nature has to offer. Our journey is rooted in tradition, driven by quality, and committed to delivering authentic flavors that transform ordinary meals into extraordinary experiences.
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
                A Legacy of <span className="text-primary-600">Excellence</span> Since 1995
              </h2>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                Arravali Essence began as a humble family venture with a simple yet powerful mission: to share the authentic flavors of India's spice heritage with the world. What started in a small warehouse in Rajasthan has blossomed into a trusted global brand, connecting discerning chefs and home cooks with the finest spices nature can provide.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Our founders, third-generation spice merchants, understood that great spices aren't just ingredients—they're storytellers. Each turmeric, cardamom, and cumin carries centuries of agricultural wisdom, cultural tradition, and the dedication of the farmers who nurture them.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Today, we continue this legacy by maintaining direct relationships with over 200 farming families across India's most renowned spice-growing regions. From the misty hills of Kerala for our cardamom to the arid plains of Rajasthan for our cumin, every spice in our collection tells a story of origin, quality, and passion.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="relative">
              <img
                src="images/img.png"
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
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Our Values & Commitments</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">The principles that guide every decision we make, from farm to table</p>
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
              { icon: <Award className="w-12 h-12" />, title: 'Uncompromising Quality', desc: 'Every spice undergoes rigorous testing and hand-selection to ensure only the finest reaches your kitchen. We believe quality is not an act—it is a habit.', color: 'from-yellow-500 to-orange-500' },
              { icon: <Heart className="w-12 h-12" />, title: 'Farmer First', desc: 'We believe in fair trade practices that empower our farming communities. When our farmers thrive, they grow better spices for everyone.', color: 'from-red-500 to-pink-500' },
              { icon: <Leaf className="w-12 h-12" />, title: 'Sustainable Sourcing', desc: 'Our commitment to sustainable agriculture ensures that future generations can enjoy the same rich spice heritage we cherish today.', color: 'from-green-500 to-teal-500' },
              { icon: <Globe className="w-12 h-12" />, title: 'Global Authenticity', desc: 'While we serve the world, we never compromise on the authentic flavors and traditional wisdom that make Indian spices extraordinary.', color: 'from-blue-500 to-purple-500' }
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

      {/* Quality Control Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">How We Ensure Quality</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">Simple. Professional. Defensible.</p>
            <div className="w-32 h-2 bg-gradient-to-r from-primary-600 to-orange-600 mx-auto rounded-full" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Two-Stage Quality Control Process</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Quality cannot rely on a single checkpoint. We operate a two-stage quality system that begins in India and is verified in the UK.</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Stage 1: India */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100"
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl flex items-center justify-center text-white mr-4">
                  <MapPin className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-gray-900">Stage 1: At the Farm</h4>
                  <p className="text-primary-600 font-semibold">India</p>
                </div>
              </div>
              
              <div className="mb-6">
                <img
                  src="/images/Our team/farm.jpg"
                  alt="Farm Operations in India"
                  className="w-full h-48 object-cover rounded-2xl mb-6"
                />
              </div>

              <p className="text-lg text-gray-700 mb-4 font-semibold">On-Ground Quality & Farm Operations</p>
              
              <ul className="space-y-3">
                {[
                  'Monitor crop quality during growth',
                  'Guide pesticide-free farming practices', 
                  'Ensure harvesting and handling meet our standards',
                  'Maintain traceability at source'
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start"
                  >
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </motion.li>
                ))}
              </ul>
              
              <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
                <p className="text-green-800 font-medium">This ensures that quality issues are prevented — not discovered later.</p>
              </div>
            </motion.div>

            {/* Stage 2: UK */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100"
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white mr-4">
                  <Shield className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-gray-900">Stage 2: In the UK</h4>
                  <p className="text-primary-600 font-semibold">Final Quality & Compliance</p>
                </div>
              </div>
              
              <div className="mb-6">
                <img
                  src="/images/Our team/farmers-1.jpg"
                  alt="Quality Control in UK"
                  className="w-full h-48 object-cover rounded-2xl mb-6"
                />
              </div>

              <p className="text-lg text-gray-700 mb-4 font-semibold">Once the spices arrive in the UK, our quality expert:</p>
              
              <ul className="space-y-3">
                {[
                  'Reviews batch consistency',
                  'Oversees handling, storage, and packing standards',
                  'Ensures compliance with UK food safety requirements',
                  'Acts as the final gatekeeper before products reach customers'
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start"
                  >
                    <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </motion.li>
                ))}
              </ul>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <p className="text-blue-800 font-medium">Only products that pass both stages are approved.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Meet Our <span className="text-primary-600">Leadership Team</span></h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">The passionate individuals who bring decades of expertise and unwavering commitment to every spice we deliver</p>
            <div className="w-32 h-2 bg-gradient-to-r from-primary-600 to-orange-600 mx-auto rounded-full mt-6" />
          </motion.div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                name: 'Founding Member',
                role: 'Chief Executive Officer',
                image: '/images/Our team/founding-member.jpeg',
                color: 'from-green-500 to-teal-600',
                bio: 'Third-generation spice merchant with over 25 years of experience in building sustainable farmer relationships and ensuring premium quality standards.'
              },
              {
                name: 'Sales Manager',
                role: 'Global Sales Director',
                image: '/images/Our team/sales-manager.jpeg',
                color: 'from-orange-500 to-red-600',
                bio: 'Expert in international spice trade and supply chain management, dedicated to bringing authentic Indian flavors to global markets.'
              },
              {
                name: 'Sales Manager UK',
                role: 'UK Operations Manager',
                image: '/images/Our team/sales-manager-uk.jpeg',
                color: 'from-blue-500 to-purple-600',
                bio: 'Quality assurance specialist ensuring all products meet stringent UK food safety standards and customer expectations.'
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.05 }}
                className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 text-center"
              >
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-white shadow-lg"
                  />
                  <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gradient-to-r ${member.color} text-white text-xs font-semibold rounded-full`}>
                    {member.location}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-primary-600 font-semibold mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{member.bio}</p>
                <div className="flex justify-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-500">{member.location}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <div className="bg-white p-8 rounded-3xl shadow-lg">
              <img
                src="/images/Our team/farmers-1.jpg"
                alt="Farm Team"
                className="w-full h-64 object-cover rounded-2xl mb-6"
              />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Our Farm Partners</h3>
              <p className="text-gray-600 leading-relaxed">We work hand-in-hand with over 200 farming families across India's most prestigious spice-growing regions. These partnerships are built on trust, fair compensation, and a shared commitment to sustainable agricultural practices that preserve both the land and traditional farming wisdom.</p>
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-lg">
              <img
                src="/images/Our team/farmers-2.jpg"
                alt="Quality Team"
                className="w-full h-64 object-cover rounded-2xl mb-6"
              />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Quality Assurance Team</h3>
              <p className="text-gray-600 leading-relaxed">Our dedicated quality experts implement rigorous testing protocols at every stage, from farm inspection to final packaging. They ensure that every spice bearing the Arravali Essence name meets our exacting standards for purity, flavor, and safety.</p>
            </div>
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