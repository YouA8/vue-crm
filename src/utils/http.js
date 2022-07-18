/*
 * @Description: 封装axios
 * @Version: 1.0
 * @Autor: hxl
 * @Date: 2021-06-13 23:46:19
 * @LastEditors: hxl
 * @LastEditTime: 2022-07-18 17:24:12
 */
import axios from 'axios'

const service = axios.create({
  baseURL: 'http://localhost:5000/api/'
})

// 请求拦截器
service.interceptors.request.use(config => {
  const user = JSON.parse(window.sessionStorage.getItem('user'))
  if (user && user.tokenStr !== '') {
    config.headers.Authorization = `Bearer ${user.tokenStr}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

// json请求封装
const http = {
  baseURL: 'http://localhost:5000/api/',
  post (url, data) {
    return service({
      method: 'post',
      url: `${url}`,
      data: data
    })
  },
  get (url, params) {
    return service({
      method: 'get',
      url: `${url}`,
      params: params
    })
  },
  put (url, data) {
    return service({
      method: 'put',
      url: `${url}`,
      data: data
    })
  },
  patch (url, data) {
    return service({
      method: 'patch',
      url: `${url}`,
      data: data
    })
  },
  delete (url, data) {
    return service({
      method: 'delete',
      url: `${url}`,
      data: data
    })
  }
}

export default http
