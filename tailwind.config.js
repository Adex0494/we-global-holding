/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'we-silver': `
      linear-gradient(
        145deg,
        #fefefe 0%,
        #f7f9fb 45%,
        #eef4f8 100%
      )
    `,
      },
      colors: {
        silver: {
          light: '#D7DDE4',
          DEFAULT: '#A8B0B8',
          dark: '#6F7A83',
        },
        graphite: '#0F1114',
        charcoal: '#1A1D21',
        softwhite: '#F4F5F7',
        warmgray: '#E6E8EB',
        steelblue: '#8FB5D9',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        glass: '0 4px 30px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};
