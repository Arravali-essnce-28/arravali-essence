// frontend/src/pages/AboutPage.tsx
import { Link } from 'react-router-dom';
import { Leaf, Award, Users, Heart } from 'lucide-react';
import Button from '../components/ui/Button';

const AboutPage = () => {
  const features = [
    {
      icon: <Leaf className="h-8 w-8 text-primary-600" />,
      title: 'Premium Quality',
      description: 'We source only the finest spices from trusted farmers and suppliers.'
    },
    {
      icon: <Award className="h-8 w-8 text-primary-600" />,
      title: 'Authentic Flavors',
      description: 'Experience the true taste of India with our traditional spice blends.'
    },
    {
      icon: <Users className="h-8 w-8 text-primary-600" />,
      title: 'Fair Trade',
      description: 'We believe in fair compensation for all the hardworking farmers.'
    },
    {
      icon: <Heart className="h-8 w-8 text-primary-600" />,
      title: 'Natural & Pure',
      description: 'No additives, no preservatives - just 100% natural spices.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-primary-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-6">Our Story</h1>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto">
            Bringing authentic Indian flavors to your kitchen since 2008. Our journey began with a simple mission: to provide the highest quality spices while supporting sustainable farming practices.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Features */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Mission */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-gray-600 mb-4">
                At Spicees, we're passionate about delivering the finest quality spices sourced directly from the heart of India. Our journey began with a simple mission: to share the authentic flavors of Indian cuisine with food lovers around the world.
              </p>
              <p className="text-gray-600 mb-6">
                We work directly with farmers across India to ensure fair trade practices and sustainable sourcing. Each spice is carefully selected, cleaned, and packaged to maintain its freshness, aroma, and potency.
              </p>
              <Button as={Link} to="/shop" size="lg">
                Shop Our Collection
              </Button>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Spice Market" 
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Our Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Vinay Chaudhari',
                role: 'CEO & Founder',
                bio: 'Leading Spicees with vision and passion for bringing authentic spices to every kitchen worldwide.'
              },
              {
                name: 'Anita Chaudhari',
                role: 'Quality Control Manager',
                bio: 'Ensuring every spice meets our highest standards of quality, purity, and freshness through rigorous testing.'
              },
              {
                name: 'Nirav Chaudhari',
                role: 'Marketing Manager',
                bio: 'Connecting spice lovers worldwide with our premium collection and building lasting customer relationships.'
              }
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-orange-200 to-red-200 rounded-t-lg overflow-hidden">
                  <img 
                    src={`https://images.unsplash.com/photo-${index === 0 ? '1507003211169-0a1dd7228f2d' : index === 1 ? '1594736797933-d0501ba2fe65' : '1571019613454-1cb2f99b2d8b'}?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                  <p className="text-primary-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-primary-50 rounded-lg p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Experience the Difference?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Join thousands of satisfied customers who trust us for their spice needs.
          </p>
          <Button as={Link} to="/shop" size="lg">
            Shop Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;