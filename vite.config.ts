import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { wrapperEnv } from './build/wrapperEnv'
import { createProxy } from './build/devserver'
import { fileURLToPath } from 'url'
import Unocss from 'unocss/vite'
// @ts-ignore
import { pluginIcons, pluginPagePathes } from './build/plugin-isme'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue(), vueJsx()],
//   resolve: {
//     alias: {
//       '@': fileURLToPath(new URL('./src', import.meta.url))
//     }
//   }
// })

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())
  const viteEnv = wrapperEnv(env)
  // 这样就可以拿到定义好的环境变量了，也可以使用 import.meta.env.xxx 这种方式进行访问
  const { VITE_PUBLIC_PATH, VITE_PORT, VITE_PROXY } = viteEnv
  return {
    plugins: [vue(), vueJsx(), Unocss(), pluginIcons(), pluginPagePathes()],
    base: VITE_PUBLIC_PATH || '/',
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      host: '0.0.0.0', // 默认为'127.0.0.1'，如果将此设置为 `0.0.0.0` 或者 `true` 将监听所有地址，包括局域网和公网地址
      port: VITE_PORT // 端口
      // proxy: createProxy(VITE_PROXY) // 代理
    }
  }
})
