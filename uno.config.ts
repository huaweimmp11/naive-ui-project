import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'
import presetRemToPx from '@unocss/preset-rem-to-px'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'
import { getIcons } from './build/getIcons'

const icons = getIcons()

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      warn: true,
      prefix: ['i-'],
      extraProperties: {
        display: 'inline-block'
      },
      collections: {
        me: FileSystemIconLoader('./src/assets/icons/isme'),
        fe: FileSystemIconLoader('./src/assets/icons/feather')
      }
    }),
    presetRemToPx({ baseFontSize: 4 })
  ],
  safelist: icons.map((icon) => `${icon} ${icon}?mask`.split(' ')).flat(),
  shortcuts: [
    ['wh-full', 'w-full h-full'],
    ['f-c-c', 'flex justify-center items-center'],
    ['jc', 'justify-center'],
    ['jb', 'justify-between'],
    ['je', 'justify-evenly'],
    ['ie', 'items-end'],
    ['flex-col', 'flex flex-col'],
    ['card-border', 'border border-solid border-light_border dark:border-dark_border'],
    ['auto-bg', 'bg-white dark:bg-dark'],
    ['auto-bg-hover', 'hover:bg-#eaf0f1 hover:dark:bg-#1b2429'],
    ['auto-bg-highlight', 'bg-#eaf0f1 dark:bg-#1b2429'],
    ['text-highlight', 'rounded-4 px-8 py-2 auto-bg-highlight'],
    ['tc', 'text-center'],
    ['tl', 'text-left'],
    ['tr', 'text-right'],
    ['tj', 'text-justify']
  ],
  rules: [
    [
      'card-shadow',
      { 'box-shadow': '0 1px 2px -2px #00000029, 0 3px 6px #0000001f, 0 5px 12px 4px #00000017' }
    ],
    // 定义 font-size 规则
    [
      /^font-(\d+)$/,
      ([, size]) => {
        return { 'font-size': `${size}px` }
      }
    ],
    // 定义 color 规则
    [
      /^color-([a-fA-F0-9]{3}|[a-fA-F0-9]{6})$/,
      ([, color]) => {
        return { color: `#${color}` }
      }
    ]
  ],
  theme: {
    colors: {
      primary: 'rgba(var(--primary-color))',
      dark: '#18181c',
      light_border: '#efeff5',
      dark_border: '#2d2d30'
    }
  }
})
