import { defineConfig, loadEnv, type ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { wrapperEnv } from './build/wrapperEnv'
import { createProxy } from './build/devserver'
import { fileURLToPath } from 'url'
// @ts-ignore
import Unocss from 'unocss/vite'
// @ts-ignore
import { pluginIcons, pluginPagePathes } from './build/plugin-isme'
import path from 'path'
// import postcssPxToViewport from 'postcss-px-to-viewport'

export default defineConfig(({ command, mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd())
  const viteEnv = wrapperEnv(env)
  // 这样就可以拿到定义好的环境变量了，也可以使用 import.meta.env.xxx 这种方式进行访问
  const { VITE_PUBLIC_PATH, VITE_PORT, VITE_PROXY } = viteEnv
  return {
    plugins: [vue(), vueJsx(), Unocss(), pluginIcons(), pluginPagePathes()],
    build: {
      rollupOptions: {
        output: {
          assetFileNames: 'assets/[name].[ext]'
        }
      }
    },
    /** postcss-px-to-viewport 自动将 CSS 中的 px 单位转换为 vw 单位，从而实现响应式设计 */
    css: {
      // postcss: {
      //   plugins: [
      //     postcssPxToViewport({
      //       viewportWidth: 1920, // 设计稿宽度
      //       viewportHeight: 1080, // 可选，通常不需要设置
      //       unitPrecision: 5, // 转换后的精度，即小数点位数
      //       viewportUnit: 'vw', // 指定需要转换成的视口单位，默认是 vw
      //       selectorBlackList: ['.ignore', '.hairlines'], // 指定不需要转换的类
      //       minPixelValue: 1, // 小于或等于 1px 不转换为视口单位
      //       mediaQuery: false // 允许在媒体查询中转换 px
      //     })
      //   ]
      // }
    },
    base: VITE_PUBLIC_PATH || '/',
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        'vue3-video-play': path.resolve(
          __dirname,
          'node_modules/vue3-video-play/dist/index.umd.js'
        ),
        'vue3-video-play-css': path.resolve(
          __dirname,
          'node_modules/vue3-video-play/dist/style.css'
        )
      }
    },
    server: {
      host: '0.0.0.0', // 默认为'127.0.0.1'，如果将此设置为 `0.0.0.0` 或者 `true` 将监听所有地址，包括局域网和公网地址
      port: VITE_PORT // 端口
      // proxy: createProxy(VITE_PROXY) // 代理
    }
  }
})
