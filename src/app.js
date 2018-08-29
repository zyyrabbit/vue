import Vue from 'vue'
import Router from './router/router.js'
import VueRouter from 'vue-router'
import './styles/common.css'
import './components/index.js'
import './styles/font-awesome/css/font-awesome.min.css'
// 使用vue-router
Vue.use(VueRouter)
window.Vue = Vue
new Vue({
    router: Router
}).$mount('#app')
