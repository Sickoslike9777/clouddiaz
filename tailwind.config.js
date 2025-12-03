/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Наша тёмная кибер-палитра
        cyber: {
          darkest: '#0a0a12', // Основной фон (почти черный)
          dark: '#141421',    // Второстепенный фон
          card: '#1c1c2e',    // Цвет карточек
        },
        // Яркие неоновые акценты
        accent: {
          cyan: '#00f0ff',    // Яркий голубой
          purple: '#8a2be2',  // Неоновый фиолетовый
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        // Градиент для текста (фиолетовый -> голубой)
        'cyber-gradient': 'linear-gradient(to right, #8a2be2, #00f0ff)',
      },
      // --- АНИМАЦИИ ---
      animation: {
        'pulse-slow': 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite', // Медленная пульсация фона
        'text-shimmer': 'text-shimmer 3s ease-in-out infinite alternate', // Перелив текста
      },
      // --- КЛЮЧЕВЫЕ КАДРЫ (НАСТРОЙКИ АНИМАЦИЙ) ---
      keyframes: {
        'text-shimmer': {
          '0%': { 'background-size': '200% auto', 'background-position': '0% center' },
          '100%': { 'background-size': '200% auto', 'background-position': '200% center' },
        },
      },
    },
  },
  plugins: [],
}