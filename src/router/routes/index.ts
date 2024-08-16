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
        path: 'icon-list',
        component: () => import('@/views/ReferenceTool/IconList.vue'),
        meta: {
          title: '图标展示',
          icon: 'life-buoy'
        }
      },
      {
        name: RouteName.ImageUpload,
        path: 'image-upload',
        component: () => import('@/views/ReferenceTool/ImageUpload.vue'),
        meta: {
          title: '图片上传',
          icon: 'upload'
        }
      },
      {
        name: RouteName.TwoDimensionalCode,
        path: 'two-dimensional-code',
        component: () => import('@/views/ReferenceTool/TwoDimensionalCode.vue'),
        meta: {
          title: '二维码',
          icon: 'award'
        }
      },
      {
        name: RouteName.VideoManage,
        path: 'video-manage',
        component: () => import('@/views/ReferenceTool/VideoManage/VideoManage.vue'),
        meta: {
          title: '视频播放',
          icon: 'video'
        }
      },
      {
        name: RouteName.FilePreview,
        path: 'file-preview',
        component: () => import('@/views/FilePreview/FilePreview.vue'),
        meta: {
          title: '文件预览',
          icon: 'file-text'
        }
      }
    ]
  },
  {
    name: RouteName.FlowDesign,
    path: '/form-design',
    meta: {
      title: '流程图设计',
      icon: 'cloud'
    },
    component: () => import('@/views/FlowDesign/FlowDesign.vue')
  },
  {
    name: RouteName.Editor,
    path: '/editor',
    meta: {
      title: '编辑器',
      icon: 'edit'
    },
    children: [
      {
        name: RouteName.RichText,
        path: 'rich-text',
        component: () => import('@/views/EditTool/RichText/RichText.vue'),
        meta: {
          title: '富文本',
          icon: 'file-text'
        }
      },
      {
        name: RouteName.MarkDown,
        path: 'mark-down',
        component: () => import('@/views/EditTool/MarkDown/MarkDown.vue'),
        meta: {
          title: 'MarkDown',
          icon: 'life-buoy'
        }
      }
    ]
  },
  {
    name: RouteName.Map,
    path: '/map',
    meta: {
      title: '地图',
      icon: 'map-pin'
    },
    children: [
      {
        name: RouteName.Gaode,
        path: 'gaode',
        component: () => import('@/views/Map/Gaode/Gaode.vue'),
        meta: {
          title: '高德',
          icon: 'gaode-map'
        }
      },
      {
        name: RouteName.Baidu,
        path: 'baidu',
        component: () => import('@/views/Map/Baidu/Baidu.vue'),
        meta: {
          title: '百度',
          icon: 'baidu-map'
        }
      }
    ]
  },
  {
    name: RouteName.MusicList,
    path: '/music-list',
    meta: {
      title: '音乐管理',
      icon: 'music'
    },
    children: [
      {
        name: RouteName.MusicListMain,
        path: 'main',
        component: () => import('@/views/Music/MusicList/MusicListMain/MusicListMain.vue'),
        meta: {
          title: '管理首页',
          icon: 'underline'
        }
      }
    ]
  },
  {
    name: RouteName.RealTimeWeather,
    path: '/real-time-weather',
    meta: {
      title: '实时天气',
      icon: 'cloud'
    },
    component: () => import('@/views/RealTimeWeather/RealTimeWeather.vue')
  },
  {
    name: RouteName.Custom,
    path: '/custom',
    meta: {
      title: '自定义组件',
      icon: 'life-buoy'
    },
    children: [
      {
        name: RouteName.Keyboard,
        path: 'keyboard',
        component: () => import('@/views/Custom/Keyboard/UseKeyboard.vue'),
        meta: {
          title: '车牌键盘',
          icon: 'keyboard'
        }
      }
    ]
  },
  {
    name: 'Demo',
    path: '/demo',
    meta: {
      title: 'Demo'
    },
    component: () => import('@/views/Demo.vue')
  }
]
