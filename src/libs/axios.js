import axios from 'axios';
import {Message} from "ant-design-vue";

const server = axios.create({
  baseURL: 'http://localhost:3000',
  timeout:8000,
  withCredentials:true,
})

// 请求拦截器
server.interceptors.request.use((config) => {
  return config
}, (error) => {
  return Promise.reject(error)
})


// 响应拦截器
server.interceptors.response.use((res) => {
  return res;
}, (error) => {
  if(error && error.response){
    switch (error.response.status) {
      case 400:
        error.message = '错误请求'
        error.info = error.response.data
        break
      case 401:
        error.message = '未授权，请重新登录';
        break
      case 403:
        error.message = '拒绝访问'
        break
      case 404:
        error.message = '请求错误，未找到该资源'
        break
      case 405:
        error.message = '请求方法未允许'
        break
      case 408:
        error.message = '请求超时'
        break
      case 500:
        error.message = '服务端出错'
        break
      case 501:
        error.message = '网络未实现'
        break
      case 502:
        error.message = '网络错误'
        break
      case 503:
        error.message = '服务不可用'
        break
      case 504:
        error.message = '网络超时'
        break
      case 505:
        error.message = 'http版本不支持该请求'
        break
      default:
        error.message = `连接错误 ${error.response.status}`
    }
    Message.error({
      content:error.message
    });
  }
  return Promise.reject(error)
})
export default server;
