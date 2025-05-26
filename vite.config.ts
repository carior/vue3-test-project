import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false, // css in js
        }),
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  base: './', // 如果你必须用其他静态服务器（如 Live Server），需要在 vite.config.ts 里设置 base 为相对路径：base: './', 这样生成的 index.html 会用相对路径引用资源：
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8888',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '') // 如果后端不需要 /api 前缀，可以去掉
      }
    }
  }
})