import svgSpritePlugin from '@pivanov/vite-plugin-svg-sprite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react(),
    tailwindcss(),
    svgSpritePlugin({
      iconDirs: [
        resolve(__dirname, '../../packages/design-system/src/icons/source'),
      ],
      symbolId: 'icon-[name]',
      inject: 'body-last',
    }),
  ],
});
