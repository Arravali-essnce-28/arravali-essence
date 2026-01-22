import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Star, Send, CheckCircle, User, Mail, MessageCircle, ThumbsUp } from 'lucide-react';
import AnimatedButton from './ui/AnimatedButton';

interface FeedbackData {
  name: string;
  email: string;
  rating: number;
  category: string;
  message: string;
}

interface FeedbackErrors {
  name?: string;
  email?: string;
  rating?: string;
  category?: string;
  message?: string;
}

const FeedbackSection: React.FC = () => {
  const [feedback, setFeedback] = useState<FeedbackData>({
    name: '',
    email: '',
    rating: 0,
    category: 'general',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FeedbackErrors>({});

  const categories = [
    { value: 'general', label: 'General Feedback' },
    { value: 'product', label: 'Product Quality' },
    { value: 'service', label: 'Customer Service' },
    { value: 'website', label: 'Website Experience' },
    { value: 'suggestion', label: 'Suggestion' }
  ];

  const validateForm = (): boolean => {
    const newErrors: FeedbackErrors = {};
    
    if (!feedback.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!feedback.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(feedback.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (feedback.rating === 0) {
      newErrors.rating = 'Please select a rating';
    }
    
    if (!feedback.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (feedback.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
      setFeedback({
        name: '',
        email: '',
        rating: 0,
        category: 'general',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  const handleInputChange = (field: keyof FeedbackData, value: string | number) => {
    setFeedback(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleRatingChange = (rating: number) => {
    handleInputChange('rating', rating);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-15, 15, -15],
              rotate: [0, 180],
              scale: [0.8, 1.1, 0.8],
            }}
            transition={{
              duration: 6 + Math.random() * 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 2,
            }}
          >
            <div className="w-6 h-6 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full opacity-30" />
          </motion.div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="inline-block mb-6"
          >
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <MessageSquare className="w-10 h-10 text-white" />
            </div>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            Share Your <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Experience</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Your feedback helps us improve and serve you better. We value every opinion and suggestion from our spice family.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50"
        >
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* Name and Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      Your Name *
                    </label>
                    <input
                      type="text"
                      value={feedback.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all ${
                        errors.name 
                          ? 'border-red-300 focus:border-red-500' 
                          : 'border-gray-200 focus:border-blue-500'
                      } focus:ring-4 focus:outline-none focus:ring-blue-500/20`}
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm mt-1"
                      >
                        {errors.name}
                      </motion.p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={feedback.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all ${
                        errors.email 
                          ? 'border-red-300 focus:border-red-500' 
                          : 'border-gray-200 focus:border-blue-500'
                      } focus:ring-4 focus:outline-none focus:ring-blue-500/20`}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm mt-1"
                      >
                        {errors.email}
                      </motion.p>
                    )}
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Star className="w-4 h-4 inline mr-2" />
                    Overall Rating *
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.button
                        key={star}
                        type="button"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleRatingChange(star)}
                        className="transition-colors"
                      >
                        <Star
                          className={`w-8 h-8 ${
                            star <= feedback.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300 hover:text-yellow-200'
                          }`}
                        />
                      </motion.button>
                    ))}
                  </div>
                  {errors.rating && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors.rating}
                    </motion.p>
                  )}
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <MessageCircle className="w-4 h-4 inline mr-2" />
                    Feedback Category
                  </label>
                  <select
                    value={feedback.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-500/20 transition-all"
                  >
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <MessageSquare className="w-4 h-4 inline mr-2" />
                    Your Message *
                  </label>
                  <textarea
                    value={feedback.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    rows={5}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all resize-none ${
                      errors.message 
                        ? 'border-red-300 focus:border-red-500' 
                        : 'border-gray-200 focus:border-blue-500'
                    } focus:ring-4 focus:outline-none focus:ring-blue-500/20`}
                    placeholder="Share your thoughts, suggestions, or experiences with us..."
                  />
                  {errors.message && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {errors.message}
                    </motion.p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                  <AnimatedButton
                    type="submit"
                    variant="gradient"
                    size="lg"
                    loading={isLoading}
                    icon={<Send className="w-5 h-5" />}
                    className="px-12 py-4 text-lg font-semibold rounded-2xl shadow-lg"
                  >
                    {isLoading ? 'Submitting...' : 'Submit Feedback'}
                  </AnimatedButton>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-center py-12"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6, repeat: 2 }}
                  className="inline-block mb-6"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                </motion.div>
                
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Thank You for Your Feedback!
                </h3>
                
                <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
                  We appreciate you taking the time to share your experience with Arravali Essence. 
                  Your feedback helps us improve and provide better service to all our customers.
                </p>
                
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 inline-block">
                  <div className="flex items-center gap-3 text-blue-700">
                    <ThumbsUp className="w-6 h-6" />
                    <span className="font-semibold">We'll review your feedback and get back to you if needed</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default FeedbackSection;
