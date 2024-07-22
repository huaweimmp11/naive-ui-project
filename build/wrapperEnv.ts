/**
 * 在vite项目中，以VITE_ 为前缀的环境变量可以通过 import.meta.env.xxx的方式访问，.env文件的环境变量会在所有环境中加载，但是优先级更低，会被当前模式下的同名变量覆盖
 * 但是，在node环境中（如vite.config.js文件），并不能通过import.meta.env.xxx这种方式使用环境变量，因此需要通过函数处理一下，让node环境也可以使用定义的环境变量
 */

/** 用于处理和转换环境变量配置 */
export function wrapperEnv(envOptions: any) {
  // 如果envOptions不存在，则返回空对象
  if (!envOptions) return {}
  const rst = {} as any
  // 遍历envOptions对象
  for (const key in envOptions) {
    // 获取envOptions对象的值
    let val = envOptions[key]
    // 如果值为'true'或'false'，则将其转换为布尔值
    if (['true', 'false'].includes(val)) {
      val = val === 'true'
    }
    // 如果key为'VITE_PORT'，则将其转换为数字
    if (['VITE_PORT'].includes(key)) {
      val = +val
    }
    // 如果key为'VITE_PROXY'且val存在，则将其转换为JSON对象
    if (key === 'VITE_PROXY' && val) {
      try {
        val = JSON.parse(val.replace(/'/g, '"'))
      } catch (error) {
        val = ''
      }
    }
    // 将key和val添加到rst对象中
    rst[key] = val
    // 如果key为字符串，则将其添加到process.env中
    if (typeof key === 'string') {
      process.env[key] = val
      // 如果key为对象，则将其转换为JSON字符串并添加到process.env中
    } else if (typeof key === 'object') {
      process.env[key] = JSON.stringify(val)
    }
  }
  // 返回rst对象
  return rst
}
