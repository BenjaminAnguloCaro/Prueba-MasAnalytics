import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(process.cwd(), 'src') }],
  },
  plugins: [reactRefresh()],
});
