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
    },
    {
      path: '/secret',
      name: 'SecretPage',
      component: () => import('../pages/SecretPage.vue'),
    },
    {
      path: '/test',
      name: 'TestPage',
      component: () => import('../pages/TestPage.vue'),
    },
  ],
})

export default router
