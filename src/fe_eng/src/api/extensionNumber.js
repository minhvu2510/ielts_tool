import request from '@/utils/request'

export function fetchExt(params) {
  return request({
    url: '/ext',
    method: 'get',
    params
  })
}

export function createOrUpdateExt(data) {
  return request({
    url: '/ext',
    method: 'post',
    data
  })
}

export function createExt(data) {
  return request({
    url: '/ext',
    method: 'post',
    data
  })
}

export function updateExt(data) {
  return request({
    url: '/ext',
    method: 'put',
    data
  })
}

export function deleteExt(params) {
  return request({
    url: '/ext',
    method: 'delete',
    data: params
  })
}

