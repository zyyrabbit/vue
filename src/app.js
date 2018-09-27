import Vue from 'vue'
import Router from './router/router.js'
import VueRouter from 'vue-router'
import './styles/common.css'
import vueUI from './components/index.js'
// 使用vue-router
Vue.use(VueRouter)
Vue.use(vueUI)

/* eslint-disable */
new Vue({
	el: '#app',
    router: Router
})
