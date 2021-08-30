import { get, post } from './axios'
export const loginAPI = {
  login: params => post('/api/login', params), // 登录接口
  dir: params => get('/api/queryDir', params),
  test: params => get('/test/query', params),
  downImg: params => get('/getFileStream', params)
}
