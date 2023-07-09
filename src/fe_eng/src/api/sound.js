import request from '@/utils/request'

export function bindGreetingToHotline(data) {
  return request({
    url: '/sound',
    method: 'post',
    data
  })
}
export function fetchSound(params) {
  return request({
    url: '/sound',
    method: 'get',
    params
  })
}

// export function deleteSound(params) {
//   return request({
//     url: '/sound',
//     method: 'delete',
//     data: params
//   })
// }

export function deleteSound(params) {
  return request({
    url: `/sound`,
    method: 'delete',
    data: params
  })
}
