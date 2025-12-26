// frontend/src/components/ui/Card.tsx
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined' | 'glass' | 'gradient';
  hover?: boolean;
  glow?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', variant = 'default', hover = false, glow = false, children, ...props }, ref) => {
    const baseClasses = 'rounded-2xl transition-all duration-300';
    
    const variants = {
      default: 'bg-white shadow-soft border border-gray-100/50',
      elevated: 'bg-white shadow-large border border-gray-100/50',
      outlined: 'bg-white border-2 border-gray-200 shadow-sm',
      glass: 'bg-white/80 backdrop-blur-md border border-white/20 shadow-medium',
      gradient: 'bg-gradient-to-br from-white via-warm-50/50 to-primary-50/30 shadow-medium border border-primary-100/50',
    };
    
    const hoverEffects = hover ? 'hover:shadow-large hover:-translate-y-1 hover:scale-[1.02]' : '';
    const glowEffect = glow ? 'hover:shadow-glow' : '';
    
    const variantClasses = variants[variant] || variants.default;

    return (
      <div 
        ref={ref} 
        className={`${baseClasses} ${variantClasses} ${hoverEffects} ${glowEffect} ${className}`} 
        {...props}
      >
        {children}
      </div>
    );
  }
);

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  withBorder?: boolean;
  gradient?: boolean;
}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className = '', withBorder = true, gradient = false, children, ...props }, ref) => {
    const baseClasses = 'px-6 py-4 rounded-t-2xl';
    const borderClass = withBorder ? 'border-b border-gray-100' : '';
    const gradientClass = gradient ? 'bg-gradient-to-r from-primary-50 to-warm-50' : '';
    
    return (
      <div
        ref={ref}
        className={`${baseClasses} ${borderClass} ${gradientClass} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className = '', padding = 'md', children, ...props }, ref) => {
    const paddingClasses = {
      none: 'p-0',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
      xl: 'p-10',
    };
    
    const paddingClass = paddingClasses[padding] || paddingClasses.md;

    return (
      <div
        ref={ref}
        className={`${paddingClass} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  withBorder?: boolean;
  gradient?: boolean;
}

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className = '', withBorder = true, gradient = false, children, ...props }, ref) => {
    const baseClasses = 'px-6 py-4 rounded-b-2xl';
    const borderClass = withBorder ? 'border-t border-gray-100' : '';
    const gradientClass = gradient ? 'bg-gradient-to-r from-gray-50 to-warm-50' : '';
    
    return (
      <div
        ref={ref}
        className={`${baseClasses} ${borderClass} ${gradientClass} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
CardHeader.displayName = 'CardHeader';
CardBody.displayName = 'CardBody';
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardBody, CardFooter };