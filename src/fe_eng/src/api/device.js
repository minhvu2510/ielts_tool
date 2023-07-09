import request from '@/utils/request'

export function fetchDevice(params) {
  return request({
    url: '/device',
    method: 'get',
    params
  })
}

export function fetchModelDevice(params) {
  return request({
    url: '/model_device',
    method: 'get',
    params
  })
}

export function updateDevice(data) {
  return request({
    url: '/device',
    method: 'put',
    data
  })
}

export function createDevice(data) {
  return request({
    url: '/device',
    method: 'post',
    data
  })
}

export function deleteDevice(data) {
  return request({
    url: '/device',
    method: 'delete',
    data
  })
}
