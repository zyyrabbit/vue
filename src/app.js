import Vue from 'vue'
import Router from './router/router.js'
import VueRouter from 'vue-router'
import './styles/common.css'
import './components/index.js'
// 使用vue-router
Vue.use(VueRouter)
new Vue({
	el: '#app',
    router: Router
})
