import Vue from 'vue'
import DxMessageBox from './dx-message-box.vue'
import { merge, isVNode } from '@/utils/utils.js'
const defaultOptions = {
	visible: false, // 控制弹窗是否可见
	parentEleId: '', // 挂载的父元素的id
	showHeader: true,
	title: '',
	callback: null,
	message: '',
	modal: true,
	// 按钮设置
	cancelBtnText: '取消',
	confirmBtnText: '确认',
	showBtns: true,
	showConfirm: true,
	showCancel: true,
	showClose: true,
	// 自定义样式
	customBoxClass: '',
	buttonClass: '',
	cancelButtonClass: '',
	confirmButtonClass: '',
	titleClass: '',
	contentClass: '',
	center: false
}
// 构建构造函数
const MessageConstructor = Vue.extend(DxMessageBox)
let currentOptions, instance
// let msgQueue = [];
// 默认回调函数
const defaultCallback = (action) => {
	if (currentOptions) {
		let callback = currentOptions.callback
		if (typeof callback === 'function') {
			callback(action)
		}
	}
}
let uniqueId = 1
// 初始化一个弹窗实例
const initInstance = () => {
	let mountEl = document.createElement('div')
	instance = new MessageConstructor({
		el: mountEl
	})
	instance.callback = defaultCallback
}
// 打开弹窗
const OpenMessageBox = (options) => {
	if (!instance) {
		initInstance()
	}
	if (!instance.visible) {
		currentOptions = merge({}, defaultOptions, options)
		// 合并实例上的参数
		merge(instance, currentOptions)
		if (!currentOptions.callback) {
			instance.callback = defaultCallback
		}
		// 判断是否为自定义的内容vnode
		if (isVNode(instance.message)) {
			// 如果为vnode,则key设置不一样的可以以强制更新,否者vnode打补丁没更新
			// if (instance.message.tag.indexOf('vue-component') !== -1) {
				instance.message.key = uniqueId = (uniqueId + 1) % 2
			// }
			instance.$slots.default = [instance.message]
			// 如果自定义传入vnode，则会触发视图更新，从而渲染视图--注意视图渲染是异步更新的
			// 所以必须把message设置为null,支持视图还没有更新，否则会出现json解析错误
			instance.message = null
		} else {
			delete instance.$slots.default
		}
		let oldCb = instance.callback
			instance.callback = (action, instance) => {
			oldCb(action, instance)
		}
      // 设置挂载元素
      if (instance.parentEleId) {
			document.getElementById(instance.parentEleId).appendChild(instance.$el)
      } else {
			document.body.appendChild(instance.$el)
      }
      Vue.nextTick(() => {
        instance.visible = true
      })
	}
}
OpenMessageBox.close = () => {
	instance.visible = false
	instance.callback && instance.callback('cancel', instance)
	// currentOptions = null
}
Vue.prototype.$messageBox = OpenMessageBox
export default OpenMessageBox
