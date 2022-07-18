/*
 * @Description: router配置
 * @Version: 1.0
 * @Autor: hxl
 * @Date: 2021-06-13 01:18:55
 * @LastEditors: hxl
 * @LastEditTime: 2022-07-13 12:39:09
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
// import Home from '../views/Home.vue'
import { initMenu } from '../utils/menu'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    hidden: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由导航守卫
router.beforeEach((to, from, next) => {
  const user = JSON.parse(window.sessionStorage.getItem('user'))
  if (user !== null && user.tokenStr && user.tokenStr !== '') {
    initMenu(router, store, user)
    next()
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next({ path: '/login' })
    }
  }
})
export default router
