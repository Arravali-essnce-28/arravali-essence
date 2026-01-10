import React from 'react';

const PageLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="text-center">
        {/* Spice Animation */}
        <div className="relative w-20 h-20 mx-auto mb-6">
          <div className="absolute inset-0 border-4 border-primary-200 rounded-full animate-pulse"></div>
          <div className="absolute inset-2 border-4 border-primary-400 rounded-full animate-spin"></div>
          <div className="absolute inset-4 border-4 border-primary-600 rounded-full animate-bounce"></div>
        </div>
        
        {/* Brand */}
        <h2 className="text-2xl font-bold text-primary-600 mb-2">Arravali Essence</h2>
        <p className="text-gray-600 animate-pulse">Loading premium spices...</p>
        
        {/* Progress Bar */}
        <div className="w-48 h-1 bg-gray-200 rounded-full mx-auto mt-4 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary-500 to-orange-500 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
