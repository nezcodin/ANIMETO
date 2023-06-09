/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#F5F0BB',
        buttonBg: '#73A9AD',
        buttonText: '#35696D',
        containerBg: '#DBDFAA',
        containerTop: '#B3C890',
        containerText: '#273117'
      },
      fontFamily: {
        bebasneue: ['BebasNeue', 'sans-serif'],
        oswaldbold: ['OswaldBold', 'sans-serif'],
        oswaldextralight: ['OswaldExtraLight', 'sans-serif'],
        oswaldlight: ['OswaldLight', 'sans-serif'],
        oswaldmedium: ['OswaldMedium', 'sans-serif'],
        oswaldregular: ['OswaldRegular', 'sans-serif'],
        oswaldsemibold: ['OswaldSemibold', 'sans-serif']
      },
      screens: {

        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',

        'xs': '360px',
        'xxs': '280px'
      }
    },
  },
  plugins: [],
}
