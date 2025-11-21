import path from 'path';
import { defineConfig } from 'vite';
import htmlMinify from 'vite-plugin-html-minify';
import react from '@vitejs/plugin-react';

export default defineConfig({
  resolve: {
    alias: {
      '@assets': path.resolve('src/assets'),
      '@core': path.resolve('src/core'),
      '@domain': path.resolve('src/domain'),
      '@views': path.resolve('src/views'),
      '@application': path.resolve('src/application'),
      '@envs': path.resolve('src/envs'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: ['localhost', '127.0.0.1'],
  },
  preview: {
    port: 3000,
  },
  plugins: [react(), htmlMinify()],
  build: {
    outDir: './dist',
    assetsDir: '_assets',
    chunkSizeWarningLimit: 400,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-0': ['core-js', 'regenerator-runtime'],
          'vendor-1': ['react', 'react-dom', 'react-router-dom'],
          'vendor-2': [
            'react-error-boundary',
            'i18next',
            'react-i18next',
            'react-redux',
            '@reduxjs/toolkit',
            'axios',
            'react-toastify',
          ],
          'vendor-4': ['formik', 'yup', 'classnames'],
          'vendor-5': ['lodash', 'file-saver', 'react-easy-crop'],
          'vendor-7': ['react-datepicker'],
          'vendor-8': ['react-color'],
          'vendor-9': ['crypto-js', 'react-select'],
          'vendor-13': ['moment-timezone'],
        },
      },
    },
  },
});
