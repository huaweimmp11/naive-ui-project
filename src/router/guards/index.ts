import { createTabGuard } from './tab-guard'

export function setupRouterGuards(router: any) {
  createTabGuard(router)
}
