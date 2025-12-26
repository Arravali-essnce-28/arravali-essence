// frontend/src/pages/HomePage.tsx
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Leaf, Shield, Truck, Award, Clock, Heart } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../contexts/CartContext';
import Button from '../components/ui/Button';
import TestimonialsSection from '../components/TestimonialsSection';
import NewsletterSection from '../components/NewsletterSection';
import ContactUsSection from '../components/ContactUsSection';

const HomePage = () => {
  const featuredProducts = products.slice(0, 4);
  const bestSellers = [...products].sort((a, b) => b.rating - a.rating).slice(0, 4);

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-gradient-to-br from-primary-600 to-primary-800 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Spices Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight text-white" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>
              Premium <span className="text-yellow-400 font-black">Indian Spices</span>
              <br />Delivered Fresh
            </h1>
            <p className="text-xl md:text-2xl font-bold text-white max-w-4xl mx-auto mb-8" style={{textShadow: '1px 1px 3px rgba(0,0,0,0.8)'}}>
              Authentic spices sourced directly from Indian farms. Experience the true taste of tradition.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                as={Link}
                to="/shop"
                size="lg"
                className="bg-white text-primary-700 hover:bg-primary-50 transform hover:scale-105 transition-all duration-300"
              >
                Shop Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                as={Link}
                to="/about"
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10 transform hover:scale-105 transition-all duration-300"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Spice Collection</h2>
            <div className="w-24 h-1 bg-primary-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Whole Spices', count: '12+ Items', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
              { name: 'Ground Spices', count: '18+ Items', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
              { name: 'Spice Blends', count: '8+ Varieties', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
              { name: 'Organic Range', count: '15+ Products', image: 'https://images.unsplash.com/photo-1599909533730-8b9b1b5e7b8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
            ].map((category, index) => (
              <Link 
                key={index} 
                to="/shop" 
                className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300 h-64"
              >
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white">{category.name}</h3>
                  <p className="text-primary-200 text-sm">{category.count}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Truck className="h-10 w-10 text-primary-600" />}
              title="Free Shipping"
              description="Free delivery on orders over $50"
            />
            <FeatureCard
              icon={<Award className="h-10 w-10 text-primary-600" />}
              title="Premium Quality"
              description="Sourced from finest farms"
            />
            <FeatureCard
              icon={<Clock className="h-10 w-10 text-primary-600" />}
              title="Fast Delivery"
              description="Shipped within 24 hours"
            />
            <FeatureCard
              icon={<Shield className="h-10 w-10 text-primary-600" />}
              title="100% Satisfaction"
              description="30-day money back guarantee"
            />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Featured Spices</h2>
            </div>
            <Button 
              as={Link}
              to="/shop" 
              variant="outline"
            >
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Best Sellers</h2>
            <div className="w-24 h-1 bg-primary-600 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Newsletter */}
      <NewsletterSection />

      {/* Contact Us */}
      <ContactUsSection />

      {/* CTA Section */}
      <section className="bg-primary-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Spice Up Your Kitchen?</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
            Join thousands of home cooks who trust our premium spices for authentic flavors.
          </p>
          <Button
            as={Link}
            to="/shop"
            size="lg"
            className="bg-white text-primary-700 hover:bg-primary-50"
          >
            Start Shopping <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="bg-white p-6 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow duration-300">
    <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

// Product Card Component
const ProductCard = ({ product }: { product: any }) => {
  const { addToCart } = useCart();

  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
      <div className="relative overflow-hidden">
        <Link to={`/product/${product.id}`} className="block">
          <div className="h-48 bg-gray-100 overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          {product.isNew && (
            <span className="absolute top-3 left-3 bg-primary-600 text-white text-xs font-bold px-2 py-1 rounded">
              New
            </span>
          )}
          {product.discount && (
            <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              {product.discount}% OFF
            </span>
          )}
        </Link>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <Link to={`/product/${product.id}`} className="hover:text-primary-600 transition-colors">
              <h3 className="font-bold text-gray-900">{product.name}</h3>
            </Link>
            <p className="text-sm text-gray-500">{product.weight}g</p>
          </div>
          <div className="text-right">
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through mr-2">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            <span className="text-lg font-bold text-primary-600">${product.price.toFixed(2)}</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-3">{product.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex text-primary-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                  className={i < product.rating ? 'text-primary-400' : 'text-gray-300'}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
          </div>
          <Button
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              addToCart(product, 1);
            }}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;