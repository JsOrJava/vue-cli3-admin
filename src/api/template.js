import axios from './request'

// 获取用户信息
const fetchUserInfo = (params) => axios.get('/user', params)

// 登录
const login = data => axios.post('/sys/login', data)

export { fetchUserInfo, login }
