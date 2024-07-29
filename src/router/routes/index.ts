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

export const asyncRoutes = [
  {
    name: RouteName.ReferenceTool,
    path: '/reference-tool',
    meta: {
      title: '引用工具',
      icon: 'tool'
    },
    children: [
      {
        name: RouteName.IconList,
        path: '/icon-list',
        component: () => import('@/views/ReferenceTool/IconList.vue'),
        meta: {
          title: '图标展示',
          icon: 'life-buoy'
        }
      },
      {
        name: RouteName.ImageUpload,
        path: '/image-upload',
        component: () => import('@/views/ReferenceTool/ImageUpload.vue'),
        meta: {
          title: '图片上传',
          icon: 'upload'
        }
      },
      {
        name: RouteName.TwoDimensionalCode,
        path: '/two-dimensional-code',
        component: () => import('@/views/ReferenceTool/TwoDimensionalCode.vue'),
        meta: {
          title: '二维码',
          icon: 'award'
        }
      }
      // {
      //   name: RouteName.CardDrag,
      //   path: '/card-drag',
      //   component: () => import('@/views/ReferenceTool/CardDrag.vue'),
      //   meta: {
      //     title: '卡片拖拽',
      //     icon: 'droplet'
      //   }
      // }
    ]
  }
]
