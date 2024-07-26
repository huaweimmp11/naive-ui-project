/**
 *@description 系统接口方法调用
 *@author slh
 *@copyright NanJing Anshare Tech .Com
 *@createDate 2024年07月25日 15:00:05
 */

import axios from '@/utils/axios'

/** 获取登录信息 */
export function getLoginData(data: { username: string; password: string }) {
  return axios({
    url: '/login',
    method: 'post',
    data
  })
}

/** HomeView 页面刷新 卡片格言 */
export function getHomeMottoMsg() {
  return axios({
    url: '/getHomeMottoMsg',
    method: 'get'
  })
}
