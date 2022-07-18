/*
 * @Description: 菜单
 * @Version: 1.0
 * @Autor: hxl
 * @Date: 2021-06-16 19:17:18
 * @LastEditors: hxl
 * @LastEditTime: 2022-07-13 12:39:30
 */

import http from './http'

/**
 * @description: 初始化菜单
 * @param {*} router
 * @param {*} store
 * @return {*}
 * @author: hxl
 */
export const initMenu = (router, store, user) => {
  // vuex 刷新后数据会重新创建(初始化原数据)
  if (store.state.routes.length > 0) {

  } else {
    // 后端获取菜单
    http.get('module/usermodule', { username: user.username }).then(result => {
      if (router.getRoutes().length > 1) {
        return
      }
      const data = result.data.Data
      if (data) {
        // 格式化路由
        const fmtRoutes = formatRoutes(data)
        // 挂载路由
        router.addRoutes(fmtRoutes)
        // 数据存储到Vux
        store.commit('initRoutes', fmtRoutes)
      }
    })
  }
}

/**
 * @description: 格式化路由
 * @param {*} routes
 * @return {*}
 * @author: hxl
 */
const formatRoutes = (routes) => {
  const fmtRoutes = []
  routes.forEach(router => {
    // let { path, component, name, iconCls, children } = router
    let { Url, ModuleName, Name, Children } = router
    if (Children && Children instanceof Array) {
      Children = formatRoutes(Children, fmtRoutes)
    }
    const fmtRouter = {
      path: Url,
      name: Name,
      // iconCls: iconCls,
      children: Children,
      component (resolve) {
        require(['../views/' + ModuleName + '.vue'], resolve)
      }
    }
    fmtRoutes.push(fmtRouter)
  })
  return fmtRoutes
}
