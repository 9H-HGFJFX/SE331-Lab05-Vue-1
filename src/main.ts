import './assets/main.css'
import './assets/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { inject } from '@vercel/analytics' // 提前引入inject

import App from './App.vue'
import router from './router'
import 'nprogress/nprogress.css'

const app = createApp(App)

// 初始化Vercel analytics
inject()

// 注册Pinia（只需一次）
app.use(createPinia())

// 注册路由
app.use(router)

// 挂载应用
app.mount('#app')
