import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'ant-design-vue/dist/reset.css';
// 引入pinia
import { createPinia } from 'pinia'

import './utils/permission'
// 引入路由
import router from './router'

const pinia = createPinia()

createApp(App).use(router).use(pinia).mount('#app')
