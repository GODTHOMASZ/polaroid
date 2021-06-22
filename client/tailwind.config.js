module.exports = {
  future: {
    removeDeprecatedGapUtilities: true
  },
  purge: {
    content: ['./src/**/*.js', './src/**/**/*.js']
  },
  theme: {
    fill: (theme) => ({
      red: theme('colors.red.primary'),
      black: theme('colors.black.full')
    }),
    colors: {
      white: '#ffffff',
      blue: {
        medium: '#005c98'
      },
      black: {
        full: '#000000',
        light: '#262626',
        faded: '#00000059'
      },
      gray: {
        base: '#616161',
        baseo: 'rgba(228, 233, 237, 0.6)',
        background: '#fafafa',
        primary: '#dbdbdb'
      },
      red: {
        primary: '#ed4956'
      }
    }
  },
  variants: {
    extend: {
      display: ['group-hover']
    }
  }
};
