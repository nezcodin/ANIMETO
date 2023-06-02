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
        buttonText: '#35696D'
      },
      fontFamily: {
        bebasneue: ['BebasNeue', 'sans-serif'],
        oswaldbold: ['OswaldBold', 'sans-serif'],
        oswaldextralight: ['OswaldExtraLight', 'sans-serif'],
        oswaldlight: ['OswaldLight', 'sans-serif'],
        oswaldmedium: ['OswaldMedium', 'sans-serif'],
        oswaldregular: ['OswaldRegular', 'sans-serif'],
        oswaldsemibold: ['OswaldSemibold', 'sans-serif']
      }
    },
  },
  plugins: [],
}
