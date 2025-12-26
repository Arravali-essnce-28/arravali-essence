// src/components/ui/Input.tsx
import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ 
  className, 
  label, 
  error,
  id,
  ...props 
}, ref) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div className="space-y-1.5">
      <label 
        htmlFor={inputId} 
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="relative rounded-md shadow-sm">
        <input
          id={inputId}
          ref={ref}
          className={cn(
            'block w-full px-4 py-3 rounded-xl border border-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 sm:text-sm transition-all duration-200',
            error ? 'border-red-500' : 'border-gray-300',
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';