import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/App.tsx',
      name: 'MyComponent'
    },
    rollupOptions: {
      // 確保外部化處理 peerDependencies
      external: ['react', 'react-dom'],
      output: {
        // 在 package.json 中提供全局變數名稱
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
});
