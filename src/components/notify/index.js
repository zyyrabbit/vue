import Vue from 'vue'
import DxNotify from './dx-notify.vue'
// 构建构造函数
const NotifyConstructor = Vue.extend(DxNotify)
let instance
let key = 'dx-notify-message'
let msgId = 0
const autoClose = (message) => {
	// 标识不会自动关闭
	if (message.duration === 0) {
		return
	}
	return setTimeout(() => { 
		instance.close && instance.close(message)
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
const Notify = (message) => {
	if (!instance) {
		initInstance()
	}
	message.key = key + msgId++
	message.index = instance.msgQueue.length
	message.timer = autoClose(message)
	instance.msgQueue.push(message)
    // 设置挂载元素
    document.body.appendChild(instance.$el)
}
Vue.prototype.$notify = Notify
export default Notify
