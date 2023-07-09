import moment from 'moment'
console.log('thisssssssss is time')
export function formatDate(date) {
  if (date) {
    return moment.unix(date).format('DD/MM/YYYY HH:mm:ss')
  } else { return }
}

export function getToday(dateOnly = false) {
  const now = Math.round(+new Date() / 1000)
  return dateOnly ? moment.unix(now).format('MM/DD/YYYY') : moment.unix(now).format('MM/DD/YYYY HH:mm')
}

export function getLastWeek() {
  const lastWeek = Math.round((new Date().getTime() - 3600 * 1000 * 24 * 7) / 1000)
  return moment.unix(lastWeek).format('MM/DD/YYYY')
}
