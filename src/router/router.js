import VueRouter from 'vue-router'
import Home from '../pages/Home.vue'
import {
  	pcPages,
  	mobilePages
  } from '../pages/index.js'
// 导入所有的页面
const routes = [
    { path: '/', component: Home, children: [...pcPages, ...mobilePages] }
]
export default new VueRouter({
	routes
})
