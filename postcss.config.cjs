module.exports = {
  plugins: {
    '@stylexjs/postcss-plugin': {
      include: ['./src/**/*.{js,jsx,ts,tsx}', './**/*.stylex.{ts,js}'],
      useCSSLayers: true,
    },
    autoprefixer: {},
  },
};