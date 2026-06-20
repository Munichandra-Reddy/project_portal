/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0D1117',
        sidebar: '#161B22',
        card: '#1C2128',
        primary: '#58A6FF',
        secondary: '#7C3AED',
        accent: '#00D4AA',
        textPrimary: '#F0F6FC',
        textSecondary: '#8B949E',
        border: '#30363D',
        status: {
          easy: '#22C55E',
          medium: '#F59E0B',
          hard: '#EF4444',
          success: '#22C55E',
          warning: '#F59E0B',
          error: '#EF4444'
        }
      },
      backgroundImage: {
        'premium-gradient': 'linear-gradient(135deg, #58A6FF, #7C3AED, #00D4AA)',
        'btn-primary-gradient': 'linear-gradient(135deg, #2563eb, #3b82f6)',
        'btn-secondary-gradient': 'linear-gradient(135deg, #7C3AED, #9333EA)'
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease forwards',
        'card-lift': 'cardLift 0.3s ease',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
