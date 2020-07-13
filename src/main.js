import Vue from 'vue'
import App from './App.vue'

// 集成element-ui
import '@/plugins/element-ui'

// 导入路由
import router from '@/router'

// 在Vue2.x中使用Vue3.0的语法
import VueCompositionAPI from '@vue/composition-api'
Vue.use(VueCompositionAPI)

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
