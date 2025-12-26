import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useReducedMotion,
  type Variants,
} from 'framer-motion';
import { ArrowRight, Play, Star, Sparkles, ChefHat, Award } from 'lucide-react';
import AnimatedButton from './AnimatedButton';

const AdvancedHeroSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 120, damping: 22, mass: 0.4 });
  const smoothY = useSpring(mouseY, { stiffness: 120, damping: 22, mass: 0.4 });
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const yPos = (e.clientY / window.innerHeight - 0.5) * 40;
      mouseX.set(x);
      mouseY.set(yPos);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) {
      mouseX.set(0);
      mouseY.set(0);
    }
  }, [mouseX, mouseY, prefersReducedMotion]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const floatingVariants = useMemo<Variants | undefined>(() => {
    if (prefersReducedMotion) {
      return undefined;
    }

    return {
      float: {
        y: [-8, 8, -8],
        rotate: [-4, 4, -4],
        transition: {
          duration: 7,
          repeat: Infinity,
          ease: [0.42, 0, 0.58, 1],
        },
      },
    };
  }, [prefersReducedMotion]);

  const floatingItems = useMemo(
    () => Array.from({ length: prefersReducedMotion ? 4 : 8 }),
    [prefersReducedMotion]
  );

  return (
<section className="relative min-h-screen flex items-center justify-center overflow-hidden -mt-20">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Parallax Background Image */}
        <motion.div
          style={{ y }}
          className="absolute inset-0 scale-110" style={{paddingTop: '0px'}}
        >
          <img
            src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Spices Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/85" />
        </motion.div>

        {/* Interactive Floating Elements */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ x: smoothX, y: smoothY }}
        >
          {/* Floating Spice Icons */}
          {floatingItems.map((_, i) => {
            const iconIndex = i % 4;

            return (
              <motion.div
                key={i}
                variants={floatingVariants}
                animate={floatingVariants ? 'float' : undefined}
                className="absolute"
                style={{
                  left: `${12 + i * 12}%`,
                  top: `${18 + i * 9}%`,
                }}
              >
                <div className="w-9 h-9 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                  {iconIndex === 0 && <Sparkles className="w-4 h-4 text-yellow-300" />}
                  {iconIndex === 1 && <ChefHat className="w-4 h-4 text-orange-300" />}
                  {iconIndex === 2 && <Star className="w-4 h-4 text-red-300" />}
                  {iconIndex === 3 && <Award className="w-4 h-4 text-green-300" />}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Badge */}
        <motion.div  style={{marginTop: '20px'}}
          variants={itemVariants}
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 mb-8"
        >
          <Sparkles className="w-5 h-5 text-yellow-300" />
          <span className="text-white font-semibold">Premium Quality Since 1995</span>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        </motion.div>

        {/* Main Heading */}
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight text-white mb-6 drop-shadow-2xl" style={{textShadow: '4px 4px 8px rgba(0,0,0,0.9), 2px 2px 4px rgba(0,0,0,0.8)'}}>
            <span className="block text-white drop-shadow-xl" style={{textShadow: '4px 4px 8px rgba(0,0,0,0.9), 2px 2px 4px rgba(0,0,0,0.8)'}}>
              Arravali Essence
            </span>
            <span className="block text-4xl md:text-5xl lg:text-6xl font-bold mt-4 drop-shadow-xl text-yellow-300">
              Premium Spice Blends
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl lg:text-3xl font-semibold text-white/90 max-w-4xl mx-auto mb-12 leading-relaxed drop-shadow-xl" style={{textShadow: '3px 3px 6px rgba(0,0,0,0.9), 1px 1px 2px rgba(0,0,0,0.8)'}}
        >
          Authentic spices sourced directly from Indian farms.{' '}
          <span className="text-yellow-300">Experience the true taste</span> of tradition.
        </motion.p>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-8 mb-12"
        >
          {[
            { number: '50K+', label: 'Happy Customers' },
            { number: '100+', label: 'Premium Spices' },
            { number: '4.9★', label: 'Customer Rating' },
            { number: '25+', label: 'Countries Served' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              className="text-center bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/20"
            >
              <div className="text-2xl md:text-3xl font-black text-white mb-1">
                {stat.number}
              </div>
              <div className="text-sm text-white/80 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row justify-center gap-6 mb-16"
        >
          <AnimatedButton
            as={Link}
            to="/shop"
            variant="gradient"
            size="xl"
            glow
            icon={<ArrowRight className="w-6 h-6" />}
            iconPosition="right"
            className="text-xl px-12 py-6 shadow-2xl"
          >
            Shop Now
          </AnimatedButton>
          
          <AnimatedButton
            variant="outline"
            size="xl"
            icon={<Play className="w-6 h-6" />}
            className="text-xl px-12 py-6 border-white text-white hover:bg-white hover:text-gray-900 backdrop-blur-md"
          >
            Watch Story
          </AnimatedButton>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div  style={{marginBottom: '20px'}}
          variants={itemVariants}
          className="flex flex-wrap justify-center items-center gap-8 opacity-80"
        >
          <div className="flex items-center gap-2 text-white">
            <Award className="w-5 h-5 text-yellow-400" />
            <span className="text-sm font-medium">ISO Certified</span>
          </div>
          <div className="flex items-center gap-2 text-white">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <span className="text-sm font-medium">Premium Quality</span>
          </div>
          <div className="flex items-center gap-2 text-white">
            <ChefHat className="w-5 h-5 text-yellow-400" />
            <span className="text-sm font-medium">Chef Approved</span>
          </div>
          <div className="flex items-center gap-2 text-white">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <span className="text-sm font-medium">Farm Fresh</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white/70 rounded-full mt-2"
          />
        </motion.div>
      </motion.div> */}
    </section>
  );
};

export default AdvancedHeroSection;