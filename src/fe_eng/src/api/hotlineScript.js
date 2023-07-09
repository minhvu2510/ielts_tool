import request from '@/utils/request'

export function fetchConfig(params) {
  return request({
    url: '/gen_configure',
    method: 'get',
    params
  })
}

export function pushConfig(params) {
  return request({
    url: '/push_configure',
    method: 'get',
    params
  })
}
