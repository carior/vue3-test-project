import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 引入pinia
import { createPinia } from 'pinia'

import './utils/permission'
// 引入路由
import router from './router'

const pinia = createPinia()

createApp(App).use(router).use(pinia).use(ElementPlus).mount('#app')
