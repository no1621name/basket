import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'main',
    component: () => import('@/views/MainView.vue'),
    alias: ['/admin', '/admin-panel', '/registration'],
  },
  {
    path: '/70xXaJI828b529HtWfG4ghXLev9JiyWQ',
    name: 'admin-panel',
    component: () => import('@/views/AdminView.vue'),
  },
  {
    path: '/4d82F4gSiKXB4lZYih6gb1CW35sAtj9Q',
    name: 'order-registration',
    component: () => import('@/views/OrderView.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router;
