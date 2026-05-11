import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/style.css'
import router from '@/router'
import App from '@/App.vue'

createApp(App).use(router).mount('#app')
const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')