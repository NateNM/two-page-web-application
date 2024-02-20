import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import ProductView from '../views/ProductView.vue'
import NotFoundView from "../views/NotFoundView.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Dashboard',
    component: DashboardView
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: ProductView
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFoundView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
