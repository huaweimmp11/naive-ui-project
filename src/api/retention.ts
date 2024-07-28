/**
 *@description 系统接口方法调用
 *@author slh
 *@copyright NanJing Anshare Tech .Com
 *@createDate 2024年07月25日 15:00:05
 */

import { service, uploadService } from '@/utils/axios'

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
