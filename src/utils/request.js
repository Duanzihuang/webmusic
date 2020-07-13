import axios from 'axios'

const request = axios.create({
  baseURL: process.env.VUE_APP_BASEURL
})

//添加请求拦截器
request.interceptors.request.use(
  function(config) {
    // window.console.log(config)
    if (!config.params) {
      config.params = {}
    }
    config.params.t = Date.now()
    //在发送请求之前做某事
    return config
  },
  function(error) {
    //请求错误时做些事
    return Promise.reject(error)
  }
)

// 注册响应拦截器
// Add a response interceptor
request.interceptors.response.use(
  function(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data
  },
  function(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  }
)

export default request
