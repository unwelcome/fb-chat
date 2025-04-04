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
      path: '/profile',
      name: 'SecretPage',
      component: () => import('../pages/SecretPage.vue'),
    },
    {
      path: '/test',
      name: 'TestPage',
      component: () => import('../pages/TestPage/TestPage.vue'),
      children: [
        {
          path: 'search',
          name: 'SearchFindPage',
          component: () => import('../pages/TestPage/subPages/searchFindListPage.vue'),
        },
        {
          path: 'files',
          name: 'LoadFilePage',
          component: () => import('../pages/TestPage/subPages/loadFilePage.vue'),
        }
      ]
    },
  ],
})

export default router
