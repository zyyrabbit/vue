import Vue from 'vue'
import has from './has.js'

const directives = {
	has: has
}
// 注册全局指令
Object.keys(directives).forEach(key => {
	Vue.directive(key, directives[key])
})
