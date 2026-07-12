import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Star } from 'lucide-react';
import AnimatedButton from './AnimatedButton';
import heroImage from '/images/hero-section.png';

const AdvancedHeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden -mt-5 flex flex-col sm:min-h-[85vh] sm:justify-center pt-24 pb-10 sm:pb-16">
      {/* Desktop/tablet: full-bleed background, product pack untouched on the right, clear space on the left for copy */}
      <div className="hidden sm:block absolute inset-0 scale-105">
        <img
          src={heroImage}
          alt="Arravali Essence spices, sourced from Indian farms"
          className="w-full h-full object-cover"
        />
        {/* Soft scrim over the left clear-space only, so the product art stays untouched */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-50/85 via-amber-50/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="order-1 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-xl mx-auto sm:mx-0 text-center sm:text-left">
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-stone-900 leading-[1.05] mb-4">
            Arravali <span className="text-primary-600">Essence</span>
          </h1>

          <p className="text-lg md:text-xl font-semibold uppercase tracking-widest text-primary-700 mb-6">
            UK's Premier Spice Destination
          </p>

          <p className="text-lg text-stone-700 mb-10 leading-relaxed">
            Authentic spices sourced directly from Indian farms, milled in small batches
            and delivered fresh across the UK.
          </p>

          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start gap-6 mb-12">
            <AnimatedButton
              as={Link}
              to="/shop"
              variant="gradient"
              size="lg"
              icon={<ArrowRight className="w-5 h-5" />}
              iconPosition="right"
              className="text-lg px-10 py-4 shadow-xl"
            >
              Shop Now
            </AnimatedButton>

            <button className="group flex items-center gap-3 text-stone-800 font-semibold">
              <span className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center">
                <Play className="w-4 h-4 text-primary-600 ml-0.5" fill="currentColor" />
              </span>
              Watch Our Story
            </button>
          </div>

          <div className="inline-flex items-center gap-6 bg-white/70 backdrop-blur-md border border-amber-100 rounded-2xl px-8 py-4 shadow-sm">
            <div>
              <div className="text-xl font-black text-stone-900">Next Day</div>
              <div className="text-xs uppercase tracking-wide text-stone-500">UK Delivery</div>
            </div>
            <div className="w-px h-9 bg-stone-300" />
            <div>
              <div className="text-xl font-black text-stone-900">15+</div>
              <div className="text-xs uppercase tracking-wide text-stone-500">Premium Spices</div>
            </div>
            <div className="w-px h-9 bg-stone-300" />
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: product image shown as its own framed card below the copy, never behind text */}
      <div className="order-2 sm:hidden relative z-10 px-4 mt-10">
        <div className="rounded-3xl overflow-hidden shadow-xl aspect-[4/3]">
          <img
            src={heroImage}
            alt="Arravali Essence spices, sourced from Indian farms"
            className="w-full h-full object-cover object-[65%_center]"
          />
        </div>
      </div>
    </section>
  );
};

export default AdvancedHeroSection;
