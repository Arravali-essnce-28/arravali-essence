// frontend/src/theme/index.ts

export const colors = {
  primary: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B',
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F',
  },
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
  success: {
    50: '#ECFDF5',
    500: '#10B981',
    700: '#047857',
  },
  error: {
    50: '#FEF2F2',
    500: '#EF4444',
    700: '#B91C1C',
  },
} as const;

export const spacing = {
  xs: '0.5rem',    // 8px
  sm: '0.75rem',   // 12px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '3rem',   // 48px
  '3xl': '4rem',   // 64px
} as const;

export const typography = {
  h1: 'text-4xl md:text-5xl lg:text-6xl font-bold leading-tight',
  h2: 'text-3xl md:text-4xl font-bold',
  h3: 'text-2xl md:text-3xl font-semibold',
  h4: 'text-xl md:text-2xl font-semibold',
  h5: 'text-lg font-medium',
  body: 'text-base',
  small: 'text-sm',
  xsmall: 'text-xs',
} as const;

export const buttons = {
  primary: 'bg-amber-600 hover:bg-amber-700 text-white',
  secondary: 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50',
  outline: 'border border-amber-600 text-amber-600 hover:bg-amber-50',
  ghost: 'text-gray-700 hover:bg-gray-100',
  danger: 'bg-red-600 hover:bg-red-700 text-white',
  disabled: 'bg-gray-200 text-gray-500 cursor-not-allowed',
} as const;

export const card = {
  base: 'bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden',
  header: 'px-6 py-4 border-b border-gray-100',
  body: 'p-6',
  footer: 'px-6 py-4 border-t border-gray-100',
} as const;

export const input = {
  base: 'block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500',
  withIcon: 'pl-10',
  error: 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500',
} as const;

export const badge = {
  base: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
  primary: 'bg-amber-100 text-amber-800',
  secondary: 'bg-gray-100 text-gray-800',
  success: 'bg-green-100 text-green-800',
  danger: 'bg-red-100 text-red-800',
  warning: 'bg-yellow-100 text-yellow-800',
} as const;

export const alert = {
  base: 'p-4 rounded-md',
  success: 'bg-green-50 text-green-800',
  error: 'bg-red-50 text-red-800',
  warning: 'bg-yellow-50 text-yellow-800',
  info: 'bg-blue-50 text-blue-800',
} as const;

// Common page layouts
// frontend/src/theme/index.ts
export const page = {
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8',
  title: 'text-3xl font-bold text-gray-900',
  subtitle: 'mt-2 text-lg text-gray-600',
  section: 'mb-12',
  sectionTitle: 'text-2xl font-semibold text-gray-900 mb-6',
  sectionSubtitle: 'text-gray-600 mb-6',
  card: 'bg-white rounded-lg shadow-sm overflow-hidden',
  cardHeader: 'px-6 py-4 border-b border-gray-200',
  cardBody: 'p-6',
  cardFooter: 'px-6 py-4 border-t border-gray-200 bg-gray-50',
} as const;
