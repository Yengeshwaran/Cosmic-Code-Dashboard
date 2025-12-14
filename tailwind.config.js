/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // GitHub-inspired dark theme
        github: {
          bg: '#0d1117',
          surface: '#161b22',
          border: '#30363d',
          text: '#f0f6fc',
          muted: '#8b949e',
          accent: '#58a6ff',
          success: '#3fb950',
          warning: '#d29922',
          danger: '#f85149',
        },
        // Solar/cosmic theme
        solar: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
          flare: '#ff6b35',
          corona: '#ffd23f',
        },
        // Combined cosmic theme
        cosmic: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          nebula: '#8b5cf6',
          star: '#f59e0b',
        }
      },
      backgroundImage: {
        'github-gradient': 'linear-gradient(135deg, #0d1117 0%, #161b22 50%, #21262d 100%)',
        'solar-gradient': 'linear-gradient(135deg, #ff6b35 0%, #ffd23f 50%, #ff8c42 100%)',
        'cosmic-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        'space-gradient': 'radial-gradient(ellipse at center, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(255, 107, 53, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(255, 107, 53, 0.8), 0 0 30px rgba(255, 107, 53, 0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      boxShadow: {
        'github': '0 8px 32px rgba(139, 148, 158, 0.1)',
        'solar': '0 8px 32px rgba(255, 107, 53, 0.2)',
        'cosmic': '0 8px 32px rgba(139, 92, 246, 0.2)',
        'glow-orange': '0 0 20px rgba(255, 107, 53, 0.5)',
        'glow-blue': '0 0 20px rgba(88, 166, 255, 0.5)',
        'glow-purple': '0 0 20px rgba(139, 92, 246, 0.5)',
      }
    },
  },
  plugins: [],
}