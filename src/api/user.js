import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/sysUser/login',
    method: 'post',
    data
  })
}

export function getInfo(userId) {
  return request({
    url: '/sysUser/getById',
    method: 'get',
    params: { userId }
  })
}

export function register(data) {
  return request({
    url: '/sysUser/add',
    method: 'post',
    data
  })
}

export function updateUserInfo(data) {
  return request({
    url: '/sysUser/update',
    method: 'post',
    data
  })
}

export function getUserCardList(userId) {
  return request({
    url: '/userCard/listByUser',
    method: 'get',
    params: { userId }
  })
}
