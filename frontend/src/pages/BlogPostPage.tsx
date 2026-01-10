import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, Clock, ArrowLeft, Share2, BookOpen, Tag } from 'lucide-react';
import { getBlogPost, urlFor } from '../lib/sanity';
import LoadingScreen from '../components/LoadingScreen';
import { PortableText } from '@portabletext/react';
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

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) {
        setError('No slug provided');
        setLoading(false);
        return;
      }

      try {
        const postData = await getBlogPost(slug);
        if (postData) {
          setPost(postData);
        } else {
          setError('Blog post not found');
        }
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError('Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const handleShare = async () => {
    if (navigator.share && post) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(window.location.href);
      }
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {error || 'Blog post not found'}
          </h2>
          <p className="text-gray-600 mb-6">
            Discover more spice stories and recipes from Arravali Essence
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
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
        className="relative h-96 bg-gradient-to-br from-primary-600 via-orange-600 to-red-600 overflow-hidden"
      >
        {post.mainImage && (
          <div className="absolute inset-0">
            <img
              src={urlFor(post.mainImage)}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
        )}
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Link>
              
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                {post.categories.map((category, index) => (
                  <span
                    key={index}
                    className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold"
                  >
                    {category}
                  </span>
                ))}
              </div>
              
              <h1 className="text-4xl md:text-6xl font-black mb-6">
                {post.title}
              </h1>
              
              <div className="flex items-center justify-center gap-6 text-white/90">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  {post.author}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  {Math.ceil(post.body?.length / 1000) || 5} min read
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Content Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="py-16"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Share Button */}
          <motion.div
            variants={itemVariants}
            className="flex justify-end mb-8"
          >
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </motion.div>

          {/* Blog Content */}
          <motion.div
            variants={itemVariants}
            className="prose prose-lg max-w-none"
          >
            {post.body && <PortableText value={post.body} components={components} />}
          </motion.div>

          {/* Tags */}
          {post.categories.length > 0 && (
            <motion.div
              variants={itemVariants}
              className="mt-12 pt-8 border-t"
            >
              <div className="flex items-center gap-2 mb-4">
                <Tag className="w-5 h-5 text-gray-600" />
                <span className="font-semibold text-gray-900">Tags:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.categories.map((category, index) => (
                  <Link
                    key={index}
                    to={`/blog?category=${category}`}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm transition-colors"
                  >
                    #{category}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}

          {/* Navigation */}
          <motion.div
            variants={itemVariants}
            className="mt-12 pt-8 border-t"
          >
            <div className="flex items-center justify-between">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default BlogPostPage;
