import axios from 'axios'
import { baseNotify } from './func'
import { setupNaiveDiscreteApi } from '@/utils/func'

// axios详细配置参考：
// https://github.com/axios/axios#request-config

// 创建axios实例
const service = axios.create({
  /** 后端接口根路径 */
  baseURL: import.meta.env.VITE_API_URL,
  /** 请求超时时间 */
  timeout: 60 * 1000
})

setupNaiveDiscreteApi()

/** 拦截请求 */
service.interceptors.request.use(
  (config: any) => {
    config.headers = config.headers || {}
    window.$loadingBar.start()
    return config
  },
  (error) => {
    baseNotify({
      type: 'error',
      title: '请求出错',
      text: error.message
    })
    window.$loadingBar.error()
    Promise.reject(error)
  }
)

/** 拦截响应 */
service.interceptors.response.use(
  (response) => {
    const res = response.data
    const { code, message } = res
    window.$loadingBar.finish()
    if (code !== 200) {
      window.$message.error(message)
      return Promise.reject(new Error(message || 'Error'))
    }
    return res
  },
  (error) => {
    window.$loadingBar.error()
    return Promise.reject(error)
  }
)

// 创建专门用于上传文件的axios实例
const uploadService = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 60 * 1000,
  headers: {
    // 'Content-Type': 'multipart/form-data'
  },
  maxBodyLength: 500 * 1024 * 1024, // 500MB
  maxContentLength: 500 * 1024 * 1024 // 500MB
})

/** 拦截请求 */
uploadService.interceptors.request.use(
  (config: any) => {
    config.headers = config.headers || {}
    window.$loadingBar.start()
    return config
  },
  (error) => {
    baseNotify({
      type: 'error',
      title: '请求出错',
      text: error.message
    })
    window.$loadingBar.error()
    return Promise.reject(error)
  }
)

/** 拦截响应 */
uploadService.interceptors.response.use(
  (response) => {
    const res = response.data
    const { code, message } = res
    window.$loadingBar.finish()
    if (code !== 200) {
      window.$message.error(message)
      return Promise.reject(new Error(message || 'Error'))
    }
    return res
  },
  (error) => {
    window.$loadingBar.error()
    return Promise.reject(error)
  }
)

export { service, uploadService }
