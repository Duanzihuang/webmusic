import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import url from './modules/url'

const store = new Vuex.Store({
  modules: {
    url
  }
})

export default store
