// frontend/src/layouts/PageContainer.tsx
import { ReactNode } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
}

export const PageContainer = ({ 
  children, 
  className = '',
  fullWidth = false
}: PageContainerProps) => {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen bg-${theme}-50 transition-colors duration-200`}>
      <div className={`mx-auto ${fullWidth ? 'max-w-full' : 'max-w-7xl'} px-4 sm:px-6 lg:px-8 py-8`}>
        <div className={`bg-${theme}-50 rounded-lg shadow-sm p-6 ${className}`}>
          {children}
        </div>
      </div>
    </div>
  );
};