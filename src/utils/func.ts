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
import { service } from './axios'
import type { AxiosRequestConfig } from 'axios'

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

export function px2vw(size: number | string): string {
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

/** 通用 axios 导出 */
export async function download(
  url: string,
  fileName: string,
  remoteOptions: AxiosRequestConfig = {}
) {
  const { method = 'get', ...options } = remoteOptions
  const res = await service({
    url,
    method,
    ...options,
    responseType: 'blob'
  })
  if (!isBlobPart(res)) {
    return
  }
  const blob = new Blob([res.data])
  downloadBlob(blob, fileName)
}

function isBlobPart(blob: any): blob is BlobPart {
  return blob
}

export function downloadBlob(blob: any, fileName: string) {
  const url = URL.createObjectURL(blob)
  nativeDownload(url, fileName)
  URL.revokeObjectURL(url)
}

export function nativeDownload(url: string, fileName: string = '文件', params: any = {}) {
  const aTag = document.createElement('a')
  aTag.style.display = 'none'
  aTag.download = fileName
  aTag.href = mergeHref(url, stringifyParams(params))
  document.body.appendChild(aTag)
  aTag.click()
  document.body.removeChild(aTag)
}

export function mergeHref(url: string, params: string) {
  const index = url.indexOf('?')
  if (index < 0) {
    return url + (params ? `?${params}` : '')
  }
  if (index === url.length - 1) {
    return url + params
  }
  return url + (params ? `&${params}` : '')
}

export function stringifyParams(
  paramsMap: any,
  isJSON: boolean = false,
  isEncode: boolean = false
) {
  paramsMap = paramsMap || {}
  const paramsEntries = Object.entries(paramsMap)
  if (!paramsEntries.length) {
    return ''
  }
  const stringifyValue = stringifyParamValue(isJSON, isEncode)
  const paramsArr = paramsEntries.reduce((result: string[], [key, value]) => {
    const param = [key, stringifyValue(value)].join('=')
    result.push(param)
    return result
  }, [])
  const params = paramsArr.join('&')
  return params
}

export function stringifyParamValue(isJSON: boolean, isEncode: boolean) {
  if (isJSON) {
    return (value: any) => {
      const temp = JSON.stringify(value)
      return encode(temp, isEncode)
    }
  }
  return (value: any) => {
    const temp = value
    return encode(temp, isEncode)
  }
}

function encode(value: string, isEncode: boolean = false) {
  return isEncode ? encodeURIComponent(value) : value
}

/**
 * n-data-table 组件提供的 downloadCsv 方法可导出 csv 文件，但文件内容中包含乱码
 * 因此需要修改该方法，使其能正确导出 csv 文件
 */
export function downloadCsv(options: {
  tableData: any[]
  columns: { title: string; key: string }[]
  fileName: string
}) {
  const data = options.tableData || []
  const headers = options.columns.map((item: { title: string; key: string }) => item.title)
  const csvRows = [headers.join(',')]
  data.forEach((row: any) => {
    const values = options.columns.map((item: { title: string; key: string }) => {
      return JSON.stringify(row[item.key])
    })
    csvRows.push(values.join(','))
  })
  const csvContent = csvRows.join('\n')
  const bom = new Uint8Array([0xef, 0xbb, 0xbf])
  const blob = new Blob([bom, csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = options.fileName + '.csv'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export function useCreateScript(src: string) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.onload = () => {
      resolve('')
    }
    script.onerror = (error) => {
      reject(error)
    }
    script.src = src
    document.head.appendChild(script)
  })
}
