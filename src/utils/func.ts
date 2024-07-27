/**
 *@description 全局通用组件调用方法
 *@author slh
 *@copyright NanJing Anshare Tech .Com
 *@createDate 2024年07月18日 10:05:47
 */

import { type NotificationType } from 'naive-ui'
import * as NaiveUI from 'naive-ui'
import { computed, type VNodeChild } from 'vue'
import { useAppStore } from '@/store/modules/app'

/** 常用通知 notify */
export function baseNotify(options?: {
  type?: NotificationType
  title?: string
  text?: string
  duration?: number
  closable?: boolean
}) {
  const data = {
    ...{
      type: 'info',
      title: '标题',
      text: '内容',
      duration: 2000,
      closable: false
    },
    ...options
  }
  const { type, title, text, duration, closable } = data
  window.$notify[type as NotificationType]({
    content: title,
    meta: text,
    duration,
    closable,
    keepAliveOnHover: true
  })
}

/** 携带头像的上下文通知 notify */
export function avatarNotify(options?: {
  title?: string | (() => VNodeChild)
  description?: string | (() => VNodeChild)
  content?: string | (() => VNodeChild)
  meta?: string | (() => VNodeChild)
  closable?: boolean
  avatar?: () => VNodeChild
  onAfterEnter?: () => void
  onAfterLeave?: () => void
  onClose?: () => void
  onLeave?: () => void
}) {
  const data = {
    ...{
      title: '标题',
      description: '副标题',
      content: '内容',
      meta: '结束语',
      closable: false,
      avatar: () => {},
      onAfterEnter: () => {},
      onAfterLeave: () => {},
      onClose: () => {},
      onLeave: () => {}
    },
    ...options
  }
  const {
    title,
    description,
    content,
    meta,
    closable,
    avatar,
    onAfterEnter,
    onAfterLeave,
    onClose,
    onLeave
  } = data
  window.$notify.create({
    title,
    description,
    content,
    meta,
    closable,
    avatar,
    onAfterEnter,
    onAfterLeave,
    onClose,
    onLeave,
    duration: 2000
  })
}

export function setupNaiveDiscreteApi() {
  const appStore = useAppStore()
  const configProviderProps = computed(() => ({
    theme: appStore.isDark ? NaiveUI.darkTheme : undefined,
    themeOverrides: useAppStore().naiveThemeOverrides
  }))
  const { loadingBar } = NaiveUI.createDiscreteApi(['loadingBar'], { configProviderProps })

  window.$loadingBar = loadingBar
}

/**
 * 将vw转换为px
 * 需要以实际的运行时视窗宽度来计算
 * 所以使用document.documentElement.clientWidth为基准
 */
export function vwToPx(size: number) {
  return (size * document.documentElement.clientWidth) / 100
}

/**
 * 将js中接收单位为px的number值转化为
 * 当前视窗下应有的尺寸number值
 */
export function pxToPx(size: number) {
  return vwToPx(pxToVw(size))
}

export default function px2vw(size: number | string): string {
  if (!size) {
    return size as string
  }
  if (!['number', 'string'].includes(typeof size)) {
    return size as string
  }
  const temp: number = Number(size)
  if (!Number.isNaN(temp)) {
    return `${pxToVw(temp)}vw`
  }
  if (!(size as string).endsWith('px')) {
    return size as string
  }
  return `${pxToVw(parseFloat(size as string))}vw`
}

export function pxToVw(size: number) {
  return (size / getViewportWidth()) * 100
}

/** 获取postcss视窗宽度 */
export function getViewportWidth() {
  return document.documentElement.clientWidth
}
