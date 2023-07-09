import request from '@/utils/request'

export function fetchPack() {
  return request({
    url: '/package',
    method: 'get'
  })
}

export function fetchAddOn(params) {
  return request({
    url: '/addon',
    method: 'get',
    params
  })
}

