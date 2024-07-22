import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from '@/router'
import store from './store'
import naive from 'naive-ui'
import 'uno.css'

const app = createApp(App)

setupRouter(app)

app.use(store).use(naive)

app.mount('#app')
