module.exports = {
  mode: 'jit',
  content: ['./pages/**/*.{jsx,tsx}', './components/**/*.{jsx,tsx}'],
  theme: {
    screens: {
      sm: '375px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    fontFamily: {
      lora: ['Lora', 'serif'],
      manrope: ['Manrope', 'san-serif'],
    },
    colors: {
      black: '#000',
      white: '#fff',
      gray: {
        50: '#F2F2F2',
        200: '#CCCCCC',
        300: '#B3B3B3',
        400: '#999999',
        600: '#666666',
        700: '#303030',
      },
      primary: {
        100: '#9470C2',
        200: '#6F5095',
        300: '#723A9E',
        400: '#53288A',
        800: '#25044E',
        900: '#120227',
      },
    },
    extend: {
      lineHeight: {
        12: '3rem',
        14: '3.5rem',
        16: '4rem',
        20: '4.5rem',
      },
      spacing: {
        72: '18rem',
        84: '21rem',
        92: '23rem',
        96: '24rem',
        100: '25rem',
        104: '26rem',
        108: '27rem',
        270: '67.5rem',
      },
      height: {
        'screen/85': '85vh',
        'screen/75': '75vh',
        'screen/2': '50vh',
        'screen/3': 'calc(100vh / 3)',
        'screen/4': 'calc(100vh / 4)',
        'screen/5': 'calc(100vh / 5)',
      },
      width: {
        'screen/85': '85vh',
        'screen/75': '75vh',
        'screen/2': '50vh',
        'screen/3': 'calc(100vh / 3)',
        'screen/4': 'calc(100vh / 4)',
        'screen/5': 'calc(100vh / 5)',
      },
    },
  },
  plugins: [require('tailwindcss-ripple')()],
}
