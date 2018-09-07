// 用于非父子间的通信，公共组件
import Vue from 'vue'
const BaseBus = new Vue()
const merge = Vue.config.optionMergeStrategies.destroyed
export default {
	$on(eventName, callback, vm) {
		BaseBus.$on(eventName, callback)
		// vm 若为 vue实例，则注册如果组件销毁时，自动注销的组件，避免组件每次懂需手动添加组件注销时，注销注册的事件
		if (vm && vm instanceof Vue) {
			merge(vm.$options.destroyed, function() {
				BaseBus.$off(eventName, callback)
			})
		}
	},
	$once: BaseBus.$once.bind(BaseBus),
	$off: BaseBus.$off.bind(BaseBus),
	$emit: BaseBus.$emit.bind(BaseBus)
}
