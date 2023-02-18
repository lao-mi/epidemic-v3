import axios from 'axios'

const eaxios = axios.create({
  baseURL: 'http://localhost:8081',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
}
})
eaxios.defaults.withCredentials=false
eaxios.interceptors.request.use((config)=>{
  config.headers['Authorization'] = localStorage.getItem("token")
  return config
})

eaxios.interceptors.response.use((res)=>{
  return res
},(error)=>{
  return Promise.reject(new Error('出错了'))
})

export default eaxios