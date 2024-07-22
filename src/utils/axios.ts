import axios from 'axios'
import { baseNotify } from './func'
import { useLoadingBar } from 'naive-ui'

// axios详细配置参考：
// https://github.com/axios/axios#request-config

// 创建axios实例
const service = axios.create({
  /** 后端接口根路径 */
  baseURL: import.meta.env.VITE_API_URL,
  /** 请求超时时间 */
  timeout: 60 * 1000
})

const loadingBar = useLoadingBar()
console.log(useLoadingBar, loadingBar)

console.log(import.meta.env)

/** 拦截请求 */
service.interceptors.request.use(
  (config: any) => {
    config.headers = config.headers || {}
    // loadingBar.start()
    return config
  },
  (error) => {
    baseNotify({
      type: 'error',
      title: '请求出错',
      text: error.message
    })
    // loadingBar.error()
    Promise.reject(error)
  }
)

/** 拦截响应 */
service.interceptors.response.use(
  (response) => {
    const res = response.data
    const { code, message } = res
    if (code !== 200) {
      window.$message.error(message)
      return Promise.reject(new Error(message || 'Error'))
    }
    // loadingBar.finish()
    return res
  },
  (error) => {
    // loadingBar.error()
    return Promise.reject(error)
  }
)

export default service
