/// <reference types="vitest" />
import { join, resolve } from 'node:path';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import libCss from 'vite-plugin-libcss';

import { peerDependencies } from './package.json';

export default defineConfig({
  plugins: [
    react(),
    dts({ rollupTypes: true }), // Output .d.ts files
    libCss(),
  ],
  build: {
    target: 'esnext',
    minify: false,
    lib: {
      entry: resolve(__dirname, join('lib', 'index.ts')),
      fileName: 'index',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      // Exclude peer dependencies from the bundle to reduce bundle size
      external: ['react/jsx-runtime', ...Object.keys(peerDependencies)],
      output: {
        // Enable code splitting for lib contents
        manualChunks(id) {
          if (id.includes('lib/')) {
            // You can customize the logic here based on your folder structure
            const parts = id.split('lib/')[1].split('/');
            return parts[0]; // For example, group by the first level of subdirectory
          }
          if (id.includes('node_modules')) {
            return id.split('node_modules/')[1].split('/')[0]; // Create a chunk for each module in node_modules
          }
        },
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {},
    },
    // 可以查看 CSS 的源码
    devSourcemap: true,
  },
  test: {
    environment: 'jsdom',
    setupFiles: './lib/test/setup.ts',
    coverage: {
      all: false,
      enabled: true,
    },
  },
});
