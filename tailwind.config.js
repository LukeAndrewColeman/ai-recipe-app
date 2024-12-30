/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  daisyui: {
    themes: [
      {
        modernMoodTheme: {
          primary: '#0f498b', // Teal Green
          secondary: '#66CECF', // Golden Mustard
          accent: '#F7B32B', // Berry Pink
          neutral: '#2E2E38', // Gunmetal Gray
          'base-100': '#feffff', // Soft White
          info: '#4D96FF', // Azure Blue
          success: '#20C997', // Teal Green
          warning: '#F7B32B', // Golden Mustard
          error: '#FF6F61', // Vivid Coral
        },
      },
    ],
  },
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  plugins: [require('daisyui')],
};
