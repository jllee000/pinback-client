// vite.config.ts
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'path';
import svgSpritePlugin from '@pivanov/vite-plugin-svg-sprite';
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths({
      projects: [resolve(__dirname, '../../tsconfig.json')],
    }),
    tailwindcss(),
    svgSpritePlugin({
      iconDirs: [
        resolve(__dirname, '../../packages/design-system/src/icons/source'),
      ],
      symbolId: 'icon-[name]',
      inject: 'body-last',
    }),
  ],

  build: {
    outDir: 'dist',
    copyPublicDir: true,
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'index.html'),
        background: resolve(__dirname, 'src/background.ts'),
        content: resolve(__dirname, 'src/content.ts'),
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
      },
    },
  },
  publicDir: 'public',
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@api': resolve(__dirname, './src/api'),
      '@utils': resolve(__dirname, './src/utils'),
      '@constants': resolve(__dirname, './src/constants'),
      '@shared-types': resolve(__dirname, './src/types'),
      '@components': resolve(__dirname, './src/components'),
    },
  },
});
