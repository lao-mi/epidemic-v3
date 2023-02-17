import { createPinia } from 'pinia'
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import ECharts from 'vue-echarts'
import'echarts'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

createApp(App)
  .use(createPinia())//注册pinna
  .use(router)//注册router
  .component('v-chart', ECharts)//全局组件echarts
  .use(ElementPlus)
  .mount('#app')
