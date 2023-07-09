import request from '@/utils/request'

export function fetchReport(data) {
  return request({
    url: '/get_report',
    // POST method sounds stupid right? Ask backend then
    method: 'post',
    data
  })
}

export function fetchReportStatistic(data) {
  return request({
    url: '/get_report/statistic',
    // POST method sounds stupid right? Ask backend then
    method: 'post',
    data
  })
}

export function fethCallStatistic(data) {
  return request({
    url: '/get_report/dashboard_statistic',
    method: 'post',
    data
  })
}
