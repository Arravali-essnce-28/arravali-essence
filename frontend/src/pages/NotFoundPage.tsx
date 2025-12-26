import React from 'react';
import { Home, Search, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-9xl font-bold text-primary-200 mb-4">404</div>
          <div className="w-24 h-24 mx-auto bg-primary-100 rounded-full flex items-center justify-center mb-6">
            <Search className="w-12 h-12 text-primary-600" />
          </div>
        </div>

        {/* Content */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Spice Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          Oops! The spice you're looking for seems to have gone missing from our kitchen. 
          Let's get you back to exploring our amazing collection.
        </p>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button 
            onClick={() => window.location.href = '/'}
            className="w-full flex items-center justify-center space-x-2"
          >
            <Home className="w-5 h-5" />
            <span>Back to Home</span>
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => window.location.href = '/shop'}
            className="w-full flex items-center justify-center space-x-2"
          >
            <Search className="w-5 h-5" />
            <span>Browse Spices</span>
          </Button>

          <button
            onClick={() => window.history.back()}
            className="w-full flex items-center justify-center space-x-2 text-primary-600 hover:text-primary-700 py-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>
        </div>

        {/* Popular Spices */}
        <div className="mt-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Popular Spices
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {['Saffron', 'Turmeric', 'Cardamom', 'Cinnamon'].map((spice) => (
              <a
                key={spice}
                href="/shop"
                className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-200 hover:border-primary-300"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-full mx-auto mb-2"></div>
                <p className="text-sm font-medium text-gray-900">{spice}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;