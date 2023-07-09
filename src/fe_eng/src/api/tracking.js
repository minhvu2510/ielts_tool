import request from '@/utils/request'

export function spyCall(data) {
  return request({
    url: '/spy_call',
    method: 'post',
    data
  })
}
