/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#2563EB', // Confident blue (primary) - blue-600
        'primary-50': '#EFF6FF', // Light blue (50-level shade) - blue-50
        'primary-100': '#DBEAFE', // Light blue (100-level shade) - blue-100
        'primary-500': '#3B82F6', // Medium blue (500-level shade) - blue-500
        'primary-700': '#1D4ED8', // Dark blue (700-level shade) - blue-700
        
        // Secondary Colors
        'secondary': '#64748B', // Sophisticated slate (secondary) - slate-500
        'secondary-100': '#F1F5F9', // Light slate (100-level shade) - slate-100
        'secondary-200': '#E2E8F0', // Light slate (200-level shade) - slate-200
        'secondary-400': '#94A3B8', // Medium slate (400-level shade) - slate-400
        'secondary-600': '#475569', // Dark slate (600-level shade) - slate-600
        
        // Accent Colors
        'accent': '#F59E0B', // Energetic amber (accent) - amber-500
        'accent-100': '#FEF3C7', // Light amber (100-level shade) - amber-100
        'accent-600': '#D97706', // Dark amber (600-level shade) - amber-600
        
        // Background Colors
        'background': '#FAFAFA', // Soft off-white (background) - gray-50
        'surface': '#FFFFFF', // Pure white (surface) - white
        
        // Text Colors
        'text-primary': '#1E293B', // Rich charcoal (text-primary) - slate-800
        'text-secondary': '#64748B', // Muted slate (text-secondary) - slate-500
        
        // Status Colors
        'success': '#10B981', // Fresh emerald (success) - emerald-500
        'success-100': '#D1FAE5', // Light emerald (100-level shade) - emerald-100
        'warning': '#F59E0B', // Consistent amber (warning) - amber-500
        'warning-100': '#FEF3C7', // Light amber (100-level shade) - amber-100
        'error': '#EF4444', // Clear red (error) - red-500
        'error-100': '#FEE2E2', // Light red (100-level shade) - red-100
        
        // Border Colors
        'border': '#E2E8F0', // Minimal border (border) - slate-200
        'border-focus': '#2563EB', // Focus border (border-focus) - blue-600
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        'DEFAULT': '6px',
      },
      transitionDuration: {
        '150': '150ms',
        '300': '300ms',
        '500': '500ms',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      animation: {
        'shimmer': 'shimmer 1.5s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200px 0' },
          '100%': { backgroundPosition: 'calc(200px + 100%) 0' },
        },
      },
      boxShadow: {
        'elevation-1': '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'elevation-2': '0 4px 6px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.06)',
        'elevation-3': '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}