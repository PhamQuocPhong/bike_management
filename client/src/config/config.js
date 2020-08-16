import Vue from 'vue'

const config = {
  baseURL: process.env.VUE_APP_ROOT,
  baseApiUrl:  process.env.VUE_APP_ROOT_API
}

export default {
  install (Vue) {
    Vue.appConfig = config
    Vue.prototype.$appConfig = config
  }
}