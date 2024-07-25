/** 封装创建代理的方法 */

const httpsReg = /^https:\/\//

// ...

export function createProxy(list = [] as any) {
  const rst = {} as any
  for (const [prefix, target] of list) {
    const isHttps = httpsReg.test(target)
    rst[prefix] = {
      target: target,
      changeOrigin: true,
      ws: true,
      rewrite: (path: any) => path.replace(new RegExp(`^${prefix}`), ''),
      // https is require secure=false
      ...(isHttps ? { secure: false } : {})
    }
  }
  return rst
}
