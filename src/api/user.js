import request from '@/utils/request'

export function login(data) {
  return request({
    url: 'http://116.63.64.208:8700/sysUser/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function register(data) {
  return request({
    url: '/vue-admin-template/user/register',
    method: 'post',
    data
  })
}
