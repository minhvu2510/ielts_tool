import request from '@/utils/request'

export function getUserInfo(params) {
  return request({
    url: '/user',
    method: 'get',
    params
  })
}

export function getAccessToken(params) {
  return request({
    url: '/new_session',
    method: 'get',
    params
  })
}

export function fetchRoles(params) {
  return request({
    url: '/role',
    method: 'get',
    params
  })
}

export function addRole(data) {
  return request({
    url: '/role',
    method: 'post',
    data
  })
}

export function updateRole(data) {
  return request({
    url: '/role',
    method: 'put',
    data
  })
}

export function deleteRole(data) {
  return request({
    url: '/role',
    method: 'delete',
    data
  })
}

export function updateUser(data) {
  return request({
    url: '/user',
    method: 'put',
    data
  })
}

export function inviteUser(data) {
  return request({
    url: '/user',
    method: 'post',
    data
  })
}

export function deleteUser(data) {
  return request({
    url: '/user',
    method: 'delete',
    data
  })
}
