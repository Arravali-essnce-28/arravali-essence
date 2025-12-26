import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-primary-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Stay Updated with Spicees</h3>
            <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
              Get the latest updates on new spices, recipes, and exclusive offers delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="text-xl font-bold text-primary-400 mb-4">Spicees</h3>
              <p className="text-gray-300 mb-4">
                Your premium destination for authentic spices from around the world. 
                Quality guaranteed, flavor delivered.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="/" className="text-gray-300 hover:text-primary-400 transition-colors">Home</a></li>
                <li><a href="/shop" className="text-gray-300 hover:text-primary-400 transition-colors">Shop</a></li>
                <li><a href="/about" className="text-gray-300 hover:text-primary-400 transition-colors">About Us</a></li>
                <li><a href="/contact" className="text-gray-300 hover:text-primary-400 transition-colors">Contact</a></li>
                <li><a href="/recipes" className="text-gray-300 hover:text-primary-400 transition-colors">Recipes</a></li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Categories</h4>
              <ul className="space-y-2">
                <li><a href="/shop?category=whole-spices" className="text-gray-300 hover:text-primary-400 transition-colors">Whole Spices</a></li>
                <li><a href="/shop?category=ground-spices" className="text-gray-300 hover:text-primary-400 transition-colors">Ground Spices</a></li>
                <li><a href="/shop?category=spice-blends" className="text-gray-300 hover:text-primary-400 transition-colors">Spice Blends</a></li>
                <li><a href="/shop?category=herbs" className="text-gray-300 hover:text-primary-400 transition-colors">Herbs</a></li>
                <li><a href="/shop?category=premium" className="text-gray-300 hover:text-primary-400 transition-colors">Premium Collection</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-primary-400" />
                  <span className="text-gray-300">123 Spice Street, Flavor City, FC 12345</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-primary-400" />
                  <span className="text-gray-300">+1 (555) 123-SPICE</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-primary-400" />
                  <span className="text-gray-300">hello@spicees.com</span>
                </div>
              </div>
              
              <div className="mt-6">
                <h5 className="font-semibold mb-2">Business Hours</h5>
                <div className="text-gray-300 text-sm space-y-1">
                  <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 4:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Spicees. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="/privacy" className="text-gray-400 hover:text-primary-400 transition-colors">Privacy Policy</a>
              <a href="/terms" className="text-gray-400 hover:text-primary-400 transition-colors">Terms of Service</a>
              <a href="/cookies" className="text-gray-400 hover:text-primary-400 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;