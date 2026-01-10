import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, Clock, ArrowRight, Search, Filter, BookOpen } from 'lucide-react';
import { getBlogPosts, getBlogCategories, urlFor } from '../lib/sanity';
import AnimatedButton from '../components/ui/AnimatedButton';
import LoadingScreen from '../components/LoadingScreen';
import components from '../components/PortableTextComponents';

interface BlogPost {
  title: string;
  slug: { current: string };
  excerpt: string;
  publishedAt: string;
  author: string;
  mainImage: any;
  categories: string[];
  body: any;
}

const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsData, categoriesData] = await Promise.all([
          getBlogPosts(),
          getBlogCategories()
        ]);
        
        setPosts(postsData);
        setCategories(categoriesData as string[]);
        setFilteredPosts(postsData);
      } catch (error) {
        console.error('Error fetching blog data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = posts;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => 
        post.categories.includes(selectedCategory)
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredPosts(filtered);
  }, [posts, selectedCategory, searchTerm]);

  if (loading) {
    return <LoadingScreen />;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-primary-600 via-orange-600 to-red-600 text-white py-20 relative overflow-hidden"
      >
        <div className="absolute inset-0">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                rotate: [0, 360],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 15 + Math.random() * 10,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <BookOpen className="w-6 h-6 text-white/10" />
            </motion.div>
          ))}
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-black mb-6">
              Arravali Essence <span className="text-yellow-300">Blog</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Discover spice stories, recipes, and culinary adventures from around the world
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search blog posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-3">
              <Filter className="h-5 w-5 text-gray-600" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Results Count */}
            <div className="text-gray-600">
              <span className="font-semibold">{filteredPosts.length}</span> articles found
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No blog posts found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search or filter criteria
              </p>
              <AnimatedButton
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                variant="outline"
              >
                Clear Filters
              </AnimatedButton>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.slug.current}
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden border border-gray-100"
                >
                  {/* Image */}
                  <div className="relative h-48 bg-gray-200">
                    {post.mainImage && (
                      <img
                        src={urlFor(post.mainImage)}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute top-4 left-4">
                      <div className="bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                        {post.categories[0]}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Meta */}
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.publishedAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {post.author}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-600 mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Read More */}
                    <Link
                      to={`/blog/${post.slug.current}`}
                      className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold transition-colors"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
