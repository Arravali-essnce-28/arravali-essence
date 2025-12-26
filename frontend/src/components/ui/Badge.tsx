// frontend/src/components/ui/Badge.tsx
import React from 'react';

interface BadgeProps {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  pulse?: boolean;
}

const Badge: React.FC<BadgeProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '',
  pulse = false 
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-full';
  
  const variants = {
    primary: 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-sm',
    secondary: 'bg-gradient-to-r from-secondary-500 to-secondary-600 text-white shadow-sm',
    success: 'bg-gradient-to-r from-accent-500 to-accent-600 text-white shadow-sm',
    warning: 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-sm',
    danger: 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-sm',
    info: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm',
  };
  
  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const pulseClass = pulse ? 'animate-pulse-soft' : '';

  return (
    <span className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${pulseClass} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;