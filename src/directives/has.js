
import Store from 'store'
import Bus from 'utils/bus.js'
const getters = Store.getters
export default {
	// 只执行一次，指令第一次绑定到元素时，执行初始化操作,el挂载元素
	bind: function(el, binding, vnode) {
		if (getters.authorization.indexOf(binding.value) === -1) {
				// el.parentNode.removeChild(el)
				el.style.display = 'none'
		}
		Bus.$on('auth-state', () => {
			if (getters.authorization.indexOf(binding.value) === -1) {
				// el.parentNode.removeChild(el)
				el.style.display = 'none'
			} else {
				el.style.display = ''
			}
		})
	}
	/* update: function(el, binding, vnode) {
		if (authorization.indexOf(binding.value) === -1) {
			el.parentNode.removeChild(el)
		}
	} */
	// 只执行一次，解绑指令时
	/* unbind: function(el, binding, vnode) {
	} */
}
