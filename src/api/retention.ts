/**
 *@description 系统接口方法调用
 *@author slh
 *@copyright NanJing Anshare Tech .Com
 *@createDate 2024年07月25日 15:00:05
 */

import { service, uploadService } from '@/utils/axios'
import { download } from '@/utils/func'

/** 获取登录信息 */
export function getLoginData(data: { username: string; password: string }) {
  return service({
    url: '/login',
    method: 'post',
    data
  })
}

/** HomeView 页面刷新 卡片格言 */
export function getHomeMottoMsg() {
  return service({
    url: '/getHomeMottoMsg',
    method: 'get'
  })
}

/** ImageUpload 页面上传图片 */
export function uploadImageByBase64(data: { id: string; url: string; fileName: string }) {
  return uploadService({
    url: '/image-upload',
    method: 'post',
    data
  })
}

/** 引用工具-图片上传 获取图片列表 */
export function getImageUploadList() {
  return service({
    url: '/image-upload-list',
    method: 'get'
  })
}

/** 编辑器-MarkDown  查询 */
export function getMarkDownList() {
  return service({
    url: '/markdown-list',
    method: 'get'
  })
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
  })
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
  })
}

/** 编辑器-MarkDown  导出 */
export function exportMarkDownById(data: { id: string; filename: string }) {
  download('/markdown-export', data.filename, {
    method: 'post',
    data
  })
}
