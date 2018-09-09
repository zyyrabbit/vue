// 判断变量类型
const ObjToString = Object.prototype.toString
export function getType(obj) {
  if (typeof obj !== 'object') {
    return typeof obj
  }
  let objType = ObjToString.call(obj)
  return objType.slice(8, -1).toLowerCase()
}
const isObject = obj => obj && typeof obj === 'object'
const assertTypeEqual = (obj, typeStr) => getType(obj) === typeStr
// 处理ajax上传文件
const getError = (action, xhr) => {
  let msg
  if (xhr.response) {
    msg = `${xhr.response.error || xhr.response}`
  } else if (xhr.responseText) {
    msg = `${xhr.responseText}`
  } else {
    msg = `fail to post ${action} ${xhr.status}`
  }
  const err = new Error(msg)
  err.status = xhr.status
  err.method = 'post'
  err.url = action
  return err
}
const getBody = xhr => {
  const text = xhr.responseText || xhr.response
  if (!text) {
    return text
  }
  try {
    return JSON.parse(text)
  } catch (e) {
    return text
  }
}

export function uploadHelper(options) {
  if (assertTypeEqual(XMLHttpRequest, 'undefined')) {
    return
  }
  // options为对象类型
  if (!isObject(options)) {
    return
  }
  const xhr = new XMLHttpRequest()
  const action = options.action
  const formData = new FormData()
  formData.append(options.filename, options.file)
  if (xhr.upload) {
    xhr.upload.onprogress = function progress(e) {
      if (e.total > 0) {
        e.percentage = Math.floor((e.loaded / e.total) * 100)
      }
      options.onProgress(e)
    }
  }
  xhr.onerror = function error(e) {
    options.error(e)
  }
  xhr.onload = function onload() {
    if (xhr.status < 200 || xhr.status >= 300) {
      return options.error(getError(action, xhr))
    }
    options.onSuccess(getBody(xhr))
  }

  xhr.open('post', action, true)
  // 判断是否发送cookie估算
  if (options.withCredentials && 'withCredentials' in xhr) {
    options.withCredentials = true
  }

  const headers = options.headers || {}

  for (let key in headers) {
    if (headers.hasOwnProperty(key) && headers[key] !== null) {
      xhr.setRequestHeader(key, headers[key])
    }
  }
  xhr.send(formData)
  return xhr
}

// 异步加载图片
export const loadImageAsync = (src, resolve, reject) => {
  let image = new Image()
  image.src = src
  image.onload = function() {
    resolve({
      naturalHeight: image.naturalHeight, // 图片的原始大小与图片设置的大小无关
      naturalWidth: image.naturalWidth,
      src: image.src
    })
  }
  image.onerror = function(e) {
    reject(e)
  }
}
// 文件类型以及大小等相关工具函数
export const imageFileExtension = ['jpeg', 'jpg', 'png', 'gif', 'bmp']
export const docFileExtension = ['doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'pdf', 'txt']
export const fileExtensionIconClass = {
  doc: 'word-file',
  docx: 'word-file',
  ppt: 'ppt-file',
  pptx: 'ppt-file',
  xls: 'xls-file',
  xlsx: 'xls-file',
  pdf: 'pdf-file',
  txt: 'txt-file',
  image: 'image-file',
  file: 'wenjian-file'
}
// 得到文件类型
export function getFileType(fileName = '') {
  if (!assertTypeEqual(fileName, 'string')) {
    return ''
  }
  let pos = fileName.lastIndexOf('.')
  if (pos > 0) {
    return fileName.slice(pos + 1).toLowerCase()
  }
  return ''
}
// 尺寸定义
const KB = 1024
const MB = 1024 * KB
const GB = 1024 * MB
const SIZE = {
  KB,
  MB,
  GB
}
export const SIZE_UNIT = ['KB', 'MB', 'GB']
const decimal = 2
// 返回文件大小字符串表示
export function fileSizeToUnit(fileSize = 0) {
  if (!assertTypeEqual(fileSize, 'number')) {
    return 0
  }
  if (fileSize < 0) {
    fileSize = 0
  }
  if (fileSize > GB) {
    return (fileSize / GB).toFixed(decimal) + 'GB'
  }

  if (fileSize > MB) {
    return (fileSize / MB).toFixed(decimal) + 'MB'
  }

  if (fileSize > KB) {
    return (fileSize / KB).toFixed(decimal) + 'KB'
  }
  return fileSize.toFixed(decimal) + 'BT'
}

// 判断文件大小是否超过限制
export function isExceedSizeLimit(fileSize, limit = 10, unit = 'MB') {
  if (!assertTypeEqual(fileSize, 'number')) {
    return true
  }
  if (!assertTypeEqual(limit, 'number')) {
    return true
  }
  if (!SIZE_UNIT.includes(unit)) {
    return true
  }
  return fileSize > limit * SIZE[unit]
}

export function IGuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = Math.random() * 16 | 0
    let v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

// 读取url的参数值
export function IQuery(name) {
  if (!assertTypeEqual(name, 'string')) {
    return true
  }
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  let r = decodeURI(window.location.search.substr(1)).match(reg)
  if (r != null) return decodeURI(r[2])
  return ''
}

// url参数转化
export function objectToUrlParamsString(obj = {}) {
  if (!isObject(obj)) {
    return {}
  }
  let temp = []
  Object.keys(obj).map(key => {
    if (obj[key]) {
      temp.push(key + '=' + obj[key])
    } else {
      temp.push(key)
    }
  })
  return temp.join('&')
}
