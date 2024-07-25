import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from '@/router'
import { setupStore } from '@/store'
import naive from 'naive-ui'
import '@/styles/global.scss'
import '@/styles/reset.css'
import 'uno.css'

const app = createApp(App)

setupStore(app)

setupRouter(app)

app.use(naive)

app.mount('#app')
