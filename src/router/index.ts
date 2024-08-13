import { createRouter, createWebHashHistory } from 'vue-router'
import { setupRouterGuards } from './guards'
import { basicRoutes as routes, asyncRoutes } from './routes'
import { RouteName } from './routes/contants'

export const router = createRouter({
  history: createWebHashHistory('/'),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

// 动态添加 asyncRoutes
asyncRoutes.forEach((route) => {
  router.addRoute(route)
})

router.beforeEach((to, from, next) => {
  if (to.name === RouteName.Login) return next()
  if (sessionStorage.getItem('userInfo')) return next()
  window.$message.error('请重新登录')
  return next({ path: '/login' })
})

export async function setupRouter(app: any) {
  app.use(router)
  setupRouterGuards(router)
}
