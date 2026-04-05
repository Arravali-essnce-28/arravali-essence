import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, Loader2, CheckCircle, ShieldCheck, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';
import SEO from '../components/SEO';

const EnhancedRegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register, loginWithGoogle } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.agreeToTerms) {
      setError('Please agree to the Terms of Service to continue.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('The passwords you entered do not match.');
      return;
    }

    try {
      setIsSubmitting(true);
      await register({
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
      });

      navigate('/login', {
        state: {
          message: 'Success! Your account has been created. Please check your email to verify.',
        },
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong during registration.';
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
      const message = err instanceof Error ? err.message : 'Google sign up failed. Please try again.';
      setError(message);
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center py-16 px-4 overflow-hidden bg-gray-900">
      <SEO 
        title="Join Arravali Essence - Create Account"
        description="Join our global community of spice lovers. Create an account for faster checkout and exclusive offers."
      />
      
      {/* Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/banner-2.png" 
          alt="Spice Background" 
          className="w-full h-full object-cover opacity-30 scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/90 via-black/60 to-primary-900/40" />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-2xl"
      >
        {/* Back Link */}
        <motion.div variants={itemVariants} className="mb-6 flex justify-center sm:justify-start">
          <Link 
            to="/" 
            className="inline-flex items-center text-white/70 hover:text-white transition-colors group px-4 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
            Home
          </Link>
        </motion.div>

        {/* Card */}
        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Decor Pane (Hidden on mobile) */}
            <div className="hidden lg:flex lg:col-span-4 bg-gradient-to-br from-primary-600/20 to-orange-600/20 p-10 flex-col justify-between border-r border-white/10">
              <div>
                <motion.div variants={itemVariants} className="mb-10">
                   <img src="/images/logo.png" alt="Arravali" className="w-12 h-12 invert" />
                </motion.div>
                <motion.h3 variants={itemVariants} className="text-2xl font-black text-white leading-tight mb-4">
                  Join the <span className="text-primary-400">Spice</span> Revolution
                </motion.h3>
                <motion.p variants={itemVariants} className="text-white/60 text-sm leading-relaxed">
                  Discover authentic flavors sourced directly from India's most prestigious spice-growing regions.
                </motion.p>
              </div>

              <div className="space-y-4">
                {[
                  { icon: <CheckCircle className="w-4 h-4" />, text: 'Exclusive Offers' },
                  { icon: <CheckCircle className="w-4 h-4" />, text: 'Fast Checkout' },
                  { icon: <CheckCircle className="w-4 h-4" />, text: 'Order Tracking' },
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    variants={itemVariants}
                    className="flex items-center gap-3 text-white/80 text-sm font-medium"
                  >
                    <span className="text-primary-400">{item.icon}</span>
                    {item.text}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Form Pane */}
            <div className="lg:col-span-8 p-8 md:p-12">
              <div className="mb-10 lg:hidden text-center">
                <h2 className="text-3xl font-black text-white">Create Account</h2>
              </div>
              
              <AnimatePresence mode="wait">
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="mb-8 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-3"
                  >
                    <ShieldCheck className="w-5 h-5 flex-shrink-0" />
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <motion.div variants={itemVariants}>
                    <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2 ml-1">First Name</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className="h-4 w-4 text-white/30 group-focus-within:text-primary-400 transition-colors" />
                      </div>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="block w-full pl-11 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/20 focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all outline-none"
                        placeholder="John"
                      />
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2 ml-1">Last Name</label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="block w-full px-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/20 focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all outline-none"
                      placeholder="Doe"
                    />
                  </motion.div>
                </div>

                <motion.div variants={itemVariants}>
                  <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-4 w-4 text-white/30 group-focus-within:text-primary-400 transition-colors" />
                    </div>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="block w-full pl-11 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/20 focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all outline-none"
                      placeholder="email@example.com"
                    />
                  </div>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <motion.div variants={itemVariants}>
                    <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2 ml-1">Password</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="h-4 w-4 text-white/30 group-focus-within:text-primary-400 transition-colors" />
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="block w-full pl-11 pr-11 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/20 focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all outline-none"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/30 hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="block text-xs font-bold text-white/40 uppercase tracking-widest mb-2 ml-1">Confirm</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="h-4 w-4 text-white/30 group-focus-within:text-primary-400 transition-colors" />
                      </div>
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        required
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        className="block w-full pl-11 pr-11 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/20 focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all outline-none"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/30 hover:text-white transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </motion.div>
                </div>

                <motion.div variants={itemVariants} className="pt-2">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={formData.agreeToTerms}
                      onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                      className="h-5 w-5 rounded-lg border-white/10 bg-white/5 text-primary-600 focus:ring-primary-500/50 transition-all"
                    />
                    <span className="text-sm text-white/50 leading-tight">
                      I agree to the <Link to="/terms" className="text-primary-400 hover:underline">Terms</Link> and <Link to="/privacy" className="text-primary-400 hover:underline">Privacy Policy</Link>.
                    </span>
                  </label>
                </motion.div>

                <motion.div variants={itemVariants} className="pt-4">
                  <Button 
                    type="submit" 
                    className="w-full py-4 text-base font-black bg-gradient-to-r from-primary-600 to-orange-600 hover:shafow-primary-500/50 shadow-2xl rounded-2xl transform active:scale-[0.98] transition-all flex items-center justify-center gap-2" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        Create Account
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>

              <motion.div variants={itemVariants} className="mt-8 flex flex-col items-center">
                 <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-6">Or join with</p>
                 <Button 
                  variant="outline" 
                   className="w-full sm:w-auto sm:px-12 py-4 border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-2xl flex items-center justify-center gap-3 transition-all"
                  onClick={handleGoogleLogin}
                  disabled={isSubmitting}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google Account
                </Button>
                
                <p className="mt-10 text-white/50 text-sm">
                  Already have an account?{' '}
                  <Link to="/login" className="text-white font-black hover:text-primary-400 transition-colors">
                    Sign In
                  </Link>
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EnhancedRegisterPage;
