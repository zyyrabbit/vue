import VueRouter from 'vue-router';
import Home from '../pages/Home.vue';
import pages from '../pages/index.js';
// 导入所有的页面
const children =  new Array(pages.length);
pages.forEach(function(page){
	children.push({path: page.path, component: page.component})
})

const routes = [
    { path:'/', component: Home, children: children}
]
export default new VueRouter({
	routes
});