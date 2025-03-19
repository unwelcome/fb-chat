import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'WelcomePage',
      component: () => import('../pages/WelcomePage.vue'),
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: () => import('../pages/LoginPage.vue'),
    },
    {
      path: '/signup',
      name: 'SignUpPage',
      component: () => import('../pages/SignUpPage.vue'),
    }
  ],
})

export default router
