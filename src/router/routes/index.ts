import { RouteName } from './contants'

export const basicRoutes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    name: RouteName.Login,
    path: '/login',
    component: () => import('@/views/LoginPage.vue'),
    meta: {
      title: '登录页',
      layout: 'empty'
    }
  },
  {
    name: RouteName.HomeView,
    path: '/home-view',
    component: () => import('@/views/HomeView.vue'),
    meta: {
      title: '主页'
    }
  }
]
