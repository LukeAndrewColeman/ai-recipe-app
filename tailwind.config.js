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
          primary: '#008080',
          secondary: '#FF6F61',
          neutral: '#2E2E38',
          'base-100': '#feffff',
          info: '#4D96FF',
          success: '#20C997',
          warning: '#F7B32B',
          error: '#FF6F61',
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
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [require('daisyui')],
};
