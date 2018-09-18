// 导入注册函数
import {_} from '@/utils/utils.js'
// 存储所有的添加该指令的元素数组
const nodeList = []
const ctx = '@@@clickoutsideContext' // ctx应该是内容扩展的缩写
let startClick = null
// 在document上注册监听函数
// 这里event,target是不是考虑兼容性？
_.on(document, 'mousedown', event => (startClick = event))
_.on(document, 'mouseup', event => {
	nodeList.forEach((node) => { node[ctx].handler(event, startClick) })
})

export default {
	// 只执行一次，指令第一次绑定到元素时，执行初始化操作,el挂载元素
	bind: function(el, binding, vnode) {
		let id = nodeList.push(el) - 1
		// 实际上是一个闭包利用
		const handler = function(mouseup = {}, mousedown = {}) {
			if (!vnode.context ||
				!mouseup.target ||
				!mousedown.target ||
				el.contains(mouseup.target) ||
				el.contains(mousedown.target) ||
				el === mouseup.target ||
				// 不知道为什么加这个判断？
				(vnode.context.popperElm &&
				(vnode.context.popperElm.contains(mouseup.target) ||
					vnode.context.popperElm.contains(mousedown.target)))) {
				return
			}
			// 不理解？
			if (binding.expression && el[ctx].methodName && vnode.context[el[ctx].methodName]) {
				vnode.context[el[ctx].methodName]()
			} else {
				el[ctx].bindingFn && el[ctx].bindingFn()
			}
		}
		el[ctx] = {
			id,
			methodName: binding.expression,
			handler,
			bindingFn: binding.value
		}
	},
	update: function(el, binding, vnode) {
		el[ctx].methodName = binding.expression
		el[ctx].bindingFn = binding.value
	},
	// 只执行一次，解绑指令时
	unbind: function(el, binding, vnode) {
		for (let i = 0, len = nodeList.length; i < len; i++) {
			if (nodeList[i][ctx].id === el[ctx].id) {
				nodeList.splice(i, 1)
				break
			}
		}
	}
}
