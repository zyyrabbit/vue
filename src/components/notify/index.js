import Vue from 'vue'
import DxNotify from './dx-notify.vue'
import { isVNode } from '../../utils/utils.js'
// 构建构造函数
const NotifyConstructor = Vue.extend(DxNotify)
let instance
let key = 'dx-notify-message'
let msgId = 0
const autoClose = message => {
	// 标识不会自动关闭
	if (message.duration === 0) {
		return null
	}
	return setTimeout(() => {
		instance.close(message)
	}, message.duration || 8000)
}
// 初始化一个全局消息通知实例
const initInstance = () => {
	let mountEl = document.createElement('div')
	instance = new NotifyConstructor({
		el: mountEl
	})
}
// 打开弹窗
const Notify = message => {
	if (!instance) {
		initInstance()
	}
	let _message = { ...message }
	_message.key = key + msgId++
	_message.index = instance.msgQueue.length
	_message.timer = autoClose(_message)
	if (isVNode(_message.content)) {
		instance.$slots[_message.key] = [_message.content]
		_message.content = null
		instance.content = null
	}
	instance.msgQueue.push(_message)
    // 设置挂载元素
    document.body.appendChild(instance.$el)
}
Vue.prototype.$notify = Notify
export default Notify
