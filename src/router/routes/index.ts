export const basicRoutes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    name: 'Login',
    path: '/login',
    component: () => import('@/views/LoginPage.vue'),
    meta: {
      title: '登录页'
    }
  },
  {
    name: 'HomeView',
    path: '/home-view',
    component: () => import('@/views/HomeView.vue'),
    meta: {
      title: '主页'
    }
  }
]
