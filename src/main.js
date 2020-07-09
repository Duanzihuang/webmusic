import { createApp } from 'vue'
import App from './App.vue'

// 集成element-ui
// import '@/plugins/element-ui'

// 导入路由
import router from '@/router'

const app = createApp(App)
app.use(router)

app.mount('#app')
