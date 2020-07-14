import Vue from 'vue'
import App from './App.vue'
import moment from 'moment'

// 集成element-ui
import '@/plugins/element-ui'

// 导入路由
import router from '@/router'

// 在Vue2.x中使用Vue3.0的语法
import VueCompositionAPI from '@vue/composition-api'
Vue.use(VueCompositionAPI)

// 全局过滤器
Vue.filter('formatDuration', dt => {
  // 转分
  let min = Math.ceil(dt / 1000 / 60)
  min = min < 10 ? '0' + min : min
  // 秒
  let sec = Math.ceil((dt / 1000) % 60)
  sec = sec < 10 ? '0' + sec : sec
  return min + ':' + sec
})
Vue.filter('formatTime', time => {
  return moment(time).format('YYYY-MM-DD hh:mm:ss')
})
Vue.filter('formatCount', count => {
  if (count / 10000 > 10) {
    return parseInt(count / 10000) + '万'
  } else {
    return count
  }
})

import store from '@/store'

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
