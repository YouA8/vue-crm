/*
 * @Description:
 * @Version: 1.0
 * @Autor: hxl
 * @Date: 2021-06-21 12:30:31
 * @LastEditors: hxl
 * @LastEditTime: 2021-06-26 21:16:29
 */

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    routes: []
  },
  mutations: {
    initRoutes (state, data) {
      state.routes = data
    }
  },
  actions: {
  },
  modules: {
  }
})
