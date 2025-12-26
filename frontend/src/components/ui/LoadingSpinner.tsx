import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ChefHat, Star, Award } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'spice' | 'minimal';
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  variant = 'default',
  text = 'Loading...'
}) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  if (variant === 'spice') {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <div className="relative">
          {/* Rotating spice icons */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className={`${sizes[size]} relative`}
          >
            <Sparkles className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 text-yellow-500" />
            <ChefHat className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 text-orange-500" />
            <Star className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-4 text-red-500" />
            <Award className="absolute left-0 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
          </motion.div>
          
          {/* Center pulse */}
          <motion.div
            animate={{ scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-3 h-3 bg-gradient-to-r from-primary-500 to-orange-500 rounded-full" />
          </motion.div>
        </div>
        
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className={`mt-4 font-semibold text-gray-600 ${textSizes[size]}`}
        >
          {text}
        </motion.p>
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <div className="flex items-center justify-center p-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className={`border-2 border-gray-200 border-t-primary-600 rounded-full ${sizes[size]}`}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="relative">
        {/* Outer ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className={`border-4 border-gray-200 border-t-primary-600 rounded-full ${sizes[size]}`}
        />
        
        {/* Inner ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          className={`absolute inset-2 border-2 border-gray-100 border-b-orange-500 rounded-full`}
        />
        
        {/* Center dot */}
        <motion.div
          animate={{ scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-2 h-2 bg-gradient-to-r from-primary-500 to-orange-500 rounded-full" />
        </motion.div>
      </div>
      
      <motion.p
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className={`mt-4 font-semibold text-gray-600 ${textSizes[size]}`}
      >
        {text}
      </motion.p>
    </div>
  );
};

// Page Loading Component
export const PageLoader: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-white/90 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <div className="text-center">
        <LoadingSpinner size="xl" variant="spice" text="Preparing your spice experience..." />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <div className="flex items-center justify-center gap-2 text-primary-600 font-semibold">
            <Sparkles className="w-5 h-5" />
            <span>Premium Quality Loading</span>
            <Sparkles className="w-5 h-5" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingSpinner;