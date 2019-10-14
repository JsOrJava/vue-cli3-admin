import axios from 'axios'
import { Message } from 'element-ui'

// create an axios instance
const service = axios.create({
  baseURL: process.env.OS_API, // api的base_url  https://luxury-dev.tianli.shop/os
  timeout: 10000 // request timeout
})

// respone interceptor
service.interceptors.response.use(
  response => {
    return response
  }, error => {
    Message({
      message: '对象存储服务访问超时，请检查链接是否能够访问。',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  })

// 授权请求
export function validationStorage(data) {
  return service({
    url: `/storage/ossUpload?type=${data}`,
    method: 'post'
  })
}

// oss上传请求
export function ossStorage(url, data) {
  return service({
    url: url,
    method: 'post',
    data
  })
}
