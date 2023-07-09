export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function scrollTo(element, to, duration) {
  if (duration <= 0) return
  const difference = to - element.scrollTop
  const perTick = difference / duration * 10
  setTimeout(() => {
    element.scrollTop = element.scrollTop + perTick
    if (element.scrollTop === to) return
    scrollTo(element, to, duration - 10)
  }, 10)
}

export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString = classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    const last = +new Date() - timestamp
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  for (const keys in source) {
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = source[keys].constructor === Array ? [] : {}
        targetObj[keys] = deepClone(source[keys])
      } else {
        targetObj[keys] = source[keys]
      }
    }
  }
  return targetObj
}

export function handleErrorSettingTime(data) {
  let message = ''
  for (let i = 0; i < data.day.length; i++) {
    message += data.day[i] !== '8' ? 'Thứ ' + data.day[i] : 'CN'
    message += ', '
  }
  if (data.from_date) {
    message += data.from_date + ' - ' + data.to_date
    message += ' (' + data.time_from + ' - ' + data.time_to + ')'
  } else {
    message += ' ' + data.time_from + ' - ' + data.time_to
  }
  return message
}

export function generatePassword(length) {
  var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
  var pass = ''
  for (var x = 0; x < length; x++) {
    var i = Math.floor(Math.random() * chars.length)
    pass += chars.charAt(i)
  }
  return pass
}

export function getListIdFromData(data) {
  const arr = []
  for (let i = 0; i < data.length; i++) {
    arr.push(data[i].id)
  }
  return arr
}

export function getListDataFromListId(idList, dataList) {
  return dataList.filter(data => {
    return idList.indexOf(data.id) >= 0
  })
}

export function getNameByIdFromList(id, list, type) {
  let name = ''
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === id) {
      if (type === 'team') name = list[i].team_name
      else name = list[i].extension_number
    }
  }
  return name
}

export function calculateDaysfromRange(dayRange) {
  if (dayRange.length > 0) {
    const from = dayRange[0].split('/').reverse().join('/')
    const to = dayRange[1].split('/').reverse().join('/')
    return Math.floor((Date.parse(to) - Date.parse(from)) / 86400000) + 1
  } else return 0
}

export function handleSettingData(data) {
  const handledData = []
  for (let i = 0; i < data.length; i++) {
    const tempData = {
      id: data[i].id,
      edit: false,
      new: false,
      selectedDays: data[i].day,
      timeRange: [data[i].time_from, data[i].time_to],
      advancedTime: !!data[i].from_date,
      redirectType: data[i].info_foward ? data[i].info_foward.mode : '',
      type: data[i].type,
      name_time: data[i].name_time ? data[i].name_time : ''
    }
    // check if advanded mode
    if (data[i].from_date) tempData['dayRange'] = [data[i].from_date, data[i].to_date]
    // check mode
    if (data[i].info_foward) {
      switch (data[i].info_foward.mode) {
        case 'team':
          tempData['team'] = data[i].info_foward.value.id
          break
        case 'ext':
          tempData['ext'] = data[i].info_foward.value.id
          break
        case 'mobile':
          tempData['mobile'] = data[i].info_foward.value.id
          break
      }
    }
    handledData.push(tempData)
  }
  return handledData
}

export function handlePauseAudio() {
  const sounds = document.getElementsByTagName('audio')
  for (let i = 0; i < sounds.length; i++) {
    sounds[i].pause()
  }
}

export function handlePauseAudioExceptSelected() {
  setTimeout(() => {
    const sounds = document.getElementsByTagName('audio')
    for (let i = 0; i < sounds.length; i++) {
      sounds[i].onplay = () => {
        for (let j = 0; j < sounds.length; j++) {
          if (i !== j) sounds[j].pause()
        }
      }
    }
  }, 500)
}

export function checkSettingTimeSetting(setting) {
  if (!setting.timeRange || !setting.timeRange.length) return false
  return true
}
