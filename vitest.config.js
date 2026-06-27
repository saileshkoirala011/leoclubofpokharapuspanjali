import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.js'],
    include: [
      'src/**/*.test.{js,jsx}',
      'backend/**/*.test.{js,jsx}',
    ],
    css: false,
  },
  resolve: {
    alias: {
      'react-native': 'react-native-web',

    },
    extensions: ['.web.js', '.js', '.jsx', '.json'],
  },
});
