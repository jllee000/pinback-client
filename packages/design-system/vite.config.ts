import svgSpritePlugin from '@pivanov/vite-plugin-svg-sprite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    react(),
    svgSpritePlugin({
      iconDirs: ['src/icons/source'],
      symbolId: 'icon-[name]',
      inject: 'body-last',
    }),
  ],
  build: {
    lib: {
      entry: 'src/components/index.ts',
      name: 'DesignSystem',
      fileName: (format) => `design-system.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
