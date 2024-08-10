/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), // Add this line to include the React plugin
    eslint(),
  ],
  css: {
    postcss: {
      plugins: [
        autoprefixer(),
      ],
    },
  },
});
