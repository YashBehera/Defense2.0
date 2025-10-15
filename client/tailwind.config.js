/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
        colors: {
            brand: {
                orange: {
                    50: '#fff7ed',
                    100: '#ffedd5',
                    200: '#fed7aa',
                    300: '#fdba74',
                    400: '#fb923c',
                    500: '#f97316',
                    600: '#ea580c',
                    700: '#c2410c',
                    800: '#9a3412',
                    900: '#7c2d12',
                },
                red: {
                    50: '#fef2f2',
                    100: '#fee2e2',
                    200: '#fecaca',
                    300: '#fca5a5',
                    400: '#f87171',
                    500: '#ef4444',
                    600: '#dc2626',
                    700: '#b91c1c',
                    800: '#991b1b',
                    900: '#7f1d1d',
                },
            },
        },
        fontFamily: {
            sans: ['Inter', 'system-ui', 'sans-serif'],
            display: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        },
        boxShadow: {
            'glow-orange': '0 0 20px rgba(249, 115, 22, 0.5)',
            'glow-red': '0 0 20px rgba(220, 38, 38, 0.5)',
            'inner-glow': 'inset 0 0 20px rgba(249, 115, 22, 0.2)',
            '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
        },
        animation: {
            'spin-slow': 'spin 3s linear infinite',
            'spin-slower': 'spin 6s linear infinite',
            'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            'bounce-slow': 'bounce 2s infinite',
            'float': 'float 3s ease-in-out infinite',
            'gradient-x': 'gradient-x 3s ease infinite',
            'gradient-xy': 'gradient-xy 8s ease infinite',
            'shimmer': 'shimmer 2s infinite linear',
        },
        keyframes: {
            float: {
                '0%, 100%': { transform: 'translateY(0px)' },
                '50%': { transform: 'translateY(-20px)' },
            },
            'gradient-x': {
                '0%, 100%': { backgroundPosition: '0% 50%' },
                '50%': { backgroundPosition: '100% 50%' },
            },
            'gradient-xy': {
                '0%, 100%': { backgroundPosition: '0% 0%' },
                '25%': { backgroundPosition: '100% 0%' },
                '50%': { backgroundPosition: '100% 100%' },
                '75%': { backgroundPosition: '0% 100%' },
            },
            shimmer: {
                '0%': { backgroundPosition: '-1000px 0' },
                '100%': { backgroundPosition: '1000px 0' },
            },
        },
        backgroundImage: {
            'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        },
        backdropBlur: {
            xs: '2px',
        },
    },
},
  plugins: [],
}