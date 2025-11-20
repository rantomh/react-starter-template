import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

/** @type {import('postcss').Config} */
export default {
  plugins: [
    autoprefixer(),
    cssnano({
      preset: 'default',
    }),
  ],
};
