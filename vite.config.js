import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 增加 base: '/' 确保 Android 容器能正确找到根文件
  base: '/',
  build: {
    outDir: 'dist',
  }
})
