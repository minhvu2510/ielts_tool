import request from '@/utils/request'

export function fetchHotlines() {
  return request({
    url: '/call_center',
    method: 'get'
  })
}

export function fetchHotlineByNumber(params) {
  return request({
    url: '/call_center',
    method: 'get',
    params
  })
}

export function fetchDefaultHotlines(params) {
  return request({
    url: '/call_center',
    method: 'get',
    params
  })
}

export function createHotline(data) {
  return request({
    url: '/call_center',
    method: 'post',
    data
  })
}
