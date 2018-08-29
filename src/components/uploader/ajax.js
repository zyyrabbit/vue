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
const getBody = (xhr) => {
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

export default function upload(options) {
	if (typeof XMLHttpRequest === 'undefined') {
		return
	}
	const xhr = new XMLHttpRequest()
	const action = options.action
	const formData = new FormData()
	formData.append(options.filename, options.file)
	if (xhr.upload) {
		xhr.upload.onprogress = function progress(e) {
		if (e.total > 0) {
			e.percentage = Math.floor(e.loaded / e.total * 100)
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
