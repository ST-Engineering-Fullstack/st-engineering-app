/** @type {import('tailwindcss').Config} */

import colors from './src/utils/theme/styles/colors.config';

export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx,css}'],
  theme: {
    extend: {
      colors,
    },
  },
  plugins: [],
};
