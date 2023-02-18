import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { tr } from 'element-plus/es/locale'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    // 配置路径别名
    alias: {
      '@': resolve(__dirname, 'src')
    },
  },
  server:{
    proxy:{
      '/login':{
        target:'http://localhost:8080',
        changeOrigin:true,
        // rewrite: (path) => path.replace(/^\/login/, '') 
      }
    }
  }
  // 配置less全局变量
  // css: {
  //   preprocessorOptions: {
  //     less: {
  //       modifyVars: {
  //         hack: `true; @import (reference) "${resolve('src/styles/color.less')}";`,
  //       },
  //       javascriptEnabled: true
  //     }
  //   }
  // },
})