import { createRouter, createWebHashHistory } from 'vue-router'
import { setupRouterGuards } from './guards'
import { basicRoutes as routes, asyncRoutes } from './routes'

export const router = createRouter({
  history: createWebHashHistory('/'),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

// 动态添加 asyncRoutes
asyncRoutes.forEach((route) => {
  router.addRoute(route)
})

export async function setupRouter(app: any) {
  app.use(router)
  setupRouterGuards(router)
}
