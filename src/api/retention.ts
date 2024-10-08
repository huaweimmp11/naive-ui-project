/**
 *@description 系统接口方法调用
 *@author slh
 *@createDate 2024年07月25日 15:00:05
 */

import { service, uploadService } from '@/utils/axios'
import { download } from '@/utils/func'
import type { AxiosResponse } from 'axios'

interface MyAxiosResponse<T = any> extends AxiosResponse<T> {
  code?: number
  message?: string
}

/** 获取登录信息 */
export function getLoginData(data: { username: string; password: string }) {
  return service({
    url: '/login',
    method: 'post',
    data
  }) as unknown as MyAxiosResponse
}

export function getSysUsers() {
  return service({
    url: '/user-list',
    method: 'get'
  }) as unknown as MyAxiosResponse
}

/** HomeView 页面刷新 卡片格言 */
export function getHomeMottoMsg() {
  return service({
    url: '/getHomeMottoMsg',
    method: 'get'
  }) as unknown as MyAxiosResponse
}

/** ImageUpload 页面上传图片 */
export function uploadImageByBase64(data: { id: string; url: string; fileName: string }) {
  return uploadService({
    url: '/image-upload',
    method: 'post',
    data
  }) as unknown as MyAxiosResponse
}

/** 引用工具-图片上传 获取图片列表 */
export function getImageUploadList() {
  return service({
    url: '/image-upload-list',
    method: 'get'
  }) as unknown as MyAxiosResponse
}

/** 编辑器-MarkDown  查询 */
export function getMarkDownList() {
  return service({
    url: '/markdown-list',
    method: 'get'
  }) as unknown as MyAxiosResponse
}

/** 编辑器-MarkDown  保存 */
export function addMarkDownToList(data: {
  id: string
  content: string
  createTime: string
  title: string
}) {
  return service({
    url: '/markdown-save',
    method: 'post',
    data
  }) as unknown as MyAxiosResponse
}

/** 编辑器-MarkDown  更新 */
export function updateMarkDownToList(data: {
  id: string
  content: string
  createTime: string
  title: string
}) {
  return service({
    url: '/markdown-update',
    method: 'post',
    data
  }) as unknown as MyAxiosResponse
}

/** 编辑器-MarkDown  导出 */
export function exportMarkDownById(data: { id: string; filename: string }) {
  download('/markdown-export', data.filename, {
    method: 'post',
    data
  })
}

/** 引用工具-音乐管理  查询 */
export function getMusicList() {
  return service({
    url: '/music-list',
    method: 'get'
  }) as unknown as MyAxiosResponse
}

/** 引用工具-音乐管理  保存 */
export function addMusicToList(data: {
  id: string
  name?: string
  lineUrl?: string
  lrc?: string
  uploadtime: string
  artist?: string
  cover?: any
}) {
  return service({
    url: '/music-save',
    method: 'post',
    data
  }) as unknown as MyAxiosResponse
}

/** 即时通讯列表 */
export function getImList(data?: { from: string; to: string }) {
  return service({
    url: '/user-message-list',
    method: 'post',
    data
  }) as unknown as MyAxiosResponse
}
