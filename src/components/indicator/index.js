import Vue from 'vue'
import DxIndicator from './dx-indicator.vue'
import { merge } from '@/utils/utils.js'
const DxIndicatorConstructor = Vue.extend(DxIndicator)
let instance
const defaultOptions = {
	visible: false,
	spinner: '',
	text: ''
}
const initInstance = () => {
	let mountEl = document.createElement('div')
	instance = new DxIndicatorConstructor({
		el: mountEl
	})
}
class Indicator {
	static open(options) {
		if (!instance) {
			initInstance()
		}
		let mergeOptions = merge({}, defaultOptions, options)
		merge(instance, mergeOptions)
		document.body.appendChild(instance.$el)
		Vue.nextTick(() => {
			instance.visible = true
		})
	}

	static close() {
		instance.visible = false
	}
}
export default Indicator
