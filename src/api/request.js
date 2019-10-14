import Axios from 'axios'
import { Message } from 'element-ui'

const axios = Axios.create({
    timeout: 10000,
    baseURL: process.env.VUE_APP_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

axios.interceptors.request.use(
    config => {
        const data = { t: Date.now() }
        if (config.method === 'get') {
            config.params = { ...config.params, ...data }
        }

        return config
    },
    error => {
        Message.error('网络异常')

        return Promise.reject(error)
    }
)

axios.interceptors.response.use(
    res => {
        const { data: resData, status } = res
        const { errno, errmsg, data } = resData

        if ((status !== 200 || errno !== 0)) {
            Message.error(errmsg)

            return Promise.reject(resData)
        } else {

            return Promise.resolve(data)
        }
    },
    error => Promise.reject(error)
)

export default axios
