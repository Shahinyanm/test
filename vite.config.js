import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

/** @type {import('vite').UserConfig} */
export default {
  base: '/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    },
    extensions: ['.ts', '.js', '.vue', '.json']
  },
  server: {
    hmr: {
      clientPort: 443,
    },
  },
}
