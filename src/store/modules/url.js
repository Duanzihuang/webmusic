export default {
  namespaced: true,
  state: {
    url: ''
  },
  getters: {
    getUrl(state) {
      return state.url
    }
  },
  mutations: {
    setUrl(state, url) {
      state.url = url
    }
  }
}
