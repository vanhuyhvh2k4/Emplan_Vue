import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard/DashboardView.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      layout: 'auth'
    },
    component: () => import(/* webpackChunkName: "register" */ '../views/Register/RegisterView.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      layout: 'auth'
    },
    component: () => import(/* webpackChunkName: "login" */ '../views/Login/LoginView.vue')
  },
  {
    path: '/verify',
    name: 'verify',
    meta: {
      layout: 'auth'
    },
    component: () => import(/* webpackChunkName: "VerifyEmail" */ '../views/VerifyEmail/VerifyEmailView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
