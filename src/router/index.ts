import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { 
    path: '/', 
    name: 'lry',
    component: () => import('@/views/lry.vue')
  },
  { 
    path: '/login', 
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  { 
    path: '/admin', 
    name: 'admin',
    component: () => import('@/views/admin/index.vue')
  },
  {
    path: '/pc',
    name: 'pc',
    component: () => import('@/views/pc/index.vue')
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;