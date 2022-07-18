/*
 * @Description:
 * @Version: 1.0
 * @Autor: hxl
 * @Date: 2021-06-13 01:18:55
 * @LastEditors: hxl
 * @LastEditTime: 2022-07-04 03:24:01
 */

import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import http from './utils/http'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$http = http

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
