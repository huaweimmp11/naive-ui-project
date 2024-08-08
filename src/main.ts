import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from '@/router'
import { setupStore } from '@/store'
import naive from 'naive-ui'
import '@/styles/global.scss'
import '@/styles/reset.css'
import 'uno.css'
import Vue3VideoPlay from 'vue3-video-play'
import 'vue3-video-play-css'
import '@/assets/css/global.scss'

const app = createApp(App)

setupStore(app)

setupRouter(app)

app.use(naive)

app.use(Vue3VideoPlay)

app.mount('#app')
