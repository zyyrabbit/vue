import Vue from 'vue'
import DxMessage from './dx-message.vue'
import { isVNode, merge } from '@/utils/utils.js'
const defaultOptions = {
	content: '',
	visible: false,
	durationTime: 3000,
	type: 'info'
}
// 构建构造函数
const MessageConstructor = Vue.extend(DxMessage)
// 打开弹窗
const Message = messageOptions => {
	if (typeof messageOptions === 'string') {
		messageOptions = {
			content: messageOptions
		}
	}
	let instance = new MessageConstructor()
	let currentOptions = merge({}, defaultOptions, messageOptions)
	merge(instance, currentOptions)
	if (isVNode(currentOptions.content)) {
		instance.$slots.default = [currentOptions.content]
		currentOptions.content = null
		// 必须重新复制为null,否者渲染时候为重新渲染
		instance.content = null
	}
	// 手动挂载
	instance.$mount()
    // 设置挂载元素
    document.body.appendChild(instance.$el)
    Vue.nextTick(() => {
        instance.visible = true
    })
}
// 其他快捷方法
['info', 'warning', 'error', 'success'].forEach(type => {
	Message[type] = messageOptions => {
		if (typeof messageOptions === 'string') {
			messageOptions = {
				content: messageOptions
			}
		}
		Message(merge({ type }, messageOptions))
	}
})
export default Message
