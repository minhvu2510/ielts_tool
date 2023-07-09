export function toThousandslsFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

export function toRedirectMode(keyword) {
  return keyword === 'none' ? 'Gác máy' : keyword === 'team' ? 'Nhóm trực' : keyword === 'mobile' ? 'Di động' : 'Máy lẻ'
}

export function formatHotline(hotline) {
  const first = hotline.substring(0, 4)
  const second = hotline.substring(4, 7)
  const last = hotline.length === 11 ? hotline.substring(hotline.length - 4) : hotline.substring(hotline.length - 3)
  return hotline[0] === '0' ? `${first}.${second}.${last}` : hotline
}

export function formatMoney(value) {
  if (!value) return ''
  value = parseInt(value)
  return value.toFixed(0).replace(/./g, (c, i, a) => {
    return i > 0 && c !== '.' && (a.length - i) % 3 === 0 ? '.' + c : c
  })
}

export function format1(n) {
  return n.toFixed(2).replace(/./g, function(c, i, a) {
    return i > 0 && c !== '.' && (a.length - i) % 3 === 0 ? '.' + c : c
  })
}
export function result(n) {
  var k = format1(n)
  var x = k.slice(0, k.length - 3)
  return x
}
