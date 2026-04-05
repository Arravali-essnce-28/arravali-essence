import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, ArrowLeft, Loader2, Smartphone, Globe, ShieldCheck, Award } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';
import SEO from '../components/SEO';

const EnhancedLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loginWithGoogle } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const successMessage = (location.state as { message?: string } | null)?.message;
  const errorMessage = (location.state as { error?: string } | null)?.error;

  useEffect(() => {
    if (errorMessage) {
      setError(errorMessage);
    }
  }, [errorMessage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      setIsSubmitting(true);
      await login({
        email: formData.email,
        password: formData.password,
      });

      navigate('/');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to log in. Please try again.';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsSubmitting(true);
      await loginWithGoogle();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Google login failed. Please try again.';
      setError(message);
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-gray-900">
      <SEO 
        title="Login - Arravali Essence"
        description="Sign in to your Arravali Essence account to manage your orders and preferences."
      />
      
      {/* Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/hero.png" 
          alt="Spices Background" 
          className="w-full h-full object-cover opacity-40 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/40 to-primary-900/40" />
      </div>

      {/* Decorative Blobs */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary-600/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl animate-pulse delay-1000" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-lg px-4"
      >
        {/* Back Link */}
        <motion.div variants={itemVariants} className="mb-6">
          <Link 
            to="/" 
            className="inline-flex items-center text-white/70 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </motion.div>

        {/* Card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 md:p-10">
          <div className="text-center mb-10">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-orange-500 rounded-2xl shadow-lg mb-6"
            >
              <img src="/images/logo.png" alt="Arravali Essence" className="w-10 h-10 invert brightness-0" />
            </motion.div>
            <h2 className="text-3xl font-black text-white mb-2 tracking-tight">Welcome Back</h2>
            <p className="text-white/60">Sign in to experience true spice essence</p>
          </div>

          <AnimatePresence mode="wait">
            {successMessage && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-8 p-4 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm flex items-center gap-3"
              >
                <ShieldCheck className="w-5 h-5 flex-shrink-0" />
                {successMessage}
              </motion.div>
            )}
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-8 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-3"
              >
                <ShieldCheck className="w-5 h-5 flex-shrink-0 rotate-180" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-semibold text-white/80 mb-2 ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-white/40 group-focus-within:text-primary-400 transition-colors" />
                </div>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="block w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/20 focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 focus:bg-white/10 transition-all outline-none"
                  placeholder="Enter your email"
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="flex items-center justify-between mb-2 px-1">
                <label className="text-sm font-semibold text-white/80">Password</label>
                <Link to="/forgot-password" id="forgot-password" className="text-xs text-primary-400 hover:text-primary-300 transition-colors">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-white/40 group-focus-within:text-primary-400 transition-colors" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="block w-full pl-12 pr-12 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/20 focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 focus:bg-white/10 transition-all outline-none"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/40 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                className="h-5 w-5 rounded-lg border-white/10 bg-white/5 text-primary-600 focus:ring-primary-500/50 transition-all"
              />
              <label htmlFor="remember-me" className="ml-3 block text-sm text-white/60 select-none cursor-pointer">
                Remember this device
              </label>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button 
                type="submit" 
                className="w-full py-4 text-base font-bold bg-gradient-to-r from-primary-600 to-orange-600 hover:from-primary-500 hover:to-orange-500 shadow-xl shadow-primary-900/20 rounded-2xl transform active:scale-[0.98] transition-all" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Signing in...
                  </div>
                ) : 'Sign In Now'}
              </Button>
            </motion.div>
          </form>

          {/* Social Divider */}
          <motion.div variants={itemVariants} className="mt-10 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold">
              <span className="px-4 bg-transparent text-white/40">Or continue with</span>
            </div>
          </motion.div>

          {/* Social Auth */}
          <motion.div variants={itemVariants} className="mt-8">
            <Button 
              variant="outline" 
              className="w-full py-4 border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-2xl flex items-center justify-center gap-3 transition-all"
              onClick={handleGoogleLogin}
              disabled={isSubmitting}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign in with Google
            </Button>
          </motion.div>

          {/* Footer Link */}
          <motion.div variants={itemVariants} className="mt-10 text-center">
            <p className="text-white/60">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary-400 hover:text-primary-300 font-bold decoration-2 underline-offset-4 hover:underline transition-all">
                Create Account
              </Link>
            </p>
          </motion.div>
        </div>

        {/* Feature Icons */}
        <div className="mt-10 grid grid-cols-3 gap-4">
          {[
            { icon: <Smartphone className="w-5 h-5" />, label: 'Easy Access' },
            { icon: <Globe className="w-5 h-5" />, label: 'Global Orders' },
            { icon: <Award className="w-5 h-5" />, label: 'Premium Quality' },
          ].map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              className="flex flex-col items-center gap-2 text-white/40"
            >
              {feature.icon}
              <span className="text-[10px] uppercase tracking-tighter font-black">{feature.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default EnhancedLoginPage;
