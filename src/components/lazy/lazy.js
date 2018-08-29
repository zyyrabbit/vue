import { throttle, _ } from 'utils/utils.js'
import Listener from './listener.js'
const LOADING_IMAGE = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
export default (Vue, options) => {
	return new class {
		constructor({loading, error, delay}) {
			this.loading = loading || LOADING_IMAGE
			this.error = error || ''
			// this.targetQueue = [];
			this.listenerQueue = []
			this.delay = delay || 320
			// 节流函数
			this.lazyLoadHandler = throttle(this._lazyLoadHandler.bind(this), this.delay)
			// 初始化时候注册一个函数
			_.on(document, 'scroll', this.lazyLoadHandler)
		}
		// 指令初始化时添加相应的监听器
		add(el, binding, vnode) {
			if (this.listenerQueue.some(item => item.el === el)) {
					this.update(el, binding)
					return Vue.nextTick(this.lazyLoadHandler)
			}
			// 得到图片绑定的src
			let src = binding.value
				Vue.nextTick(() => {
					const listener = new Listener({
						el,
						loading: this.loading,
						error: this.error,
						src,
						elRender: this._elRender.bind(this)
				})
				// 在相应的元素上注册滚动添加元素，目前仅支持document的scroll事件
				// this._addTargetEle(document);
				this.listenerQueue.push(listener)
				// 尽快加载图片
				this.lazyLoadHandler()
				Vue.nextTick(() => { this.lazyLoadHandler() })
			})
		}
		// 当组件更新时候，更新状态
		update(el, binding) {
			const src = binding.value
			const listener = this.listenerQueue.find(listener => listener.el === el)
			listener && listener.update(src)
			this.lazyLoadHandler()
			Vue.nextTick(() => this.lazyLoadHandler())
		}
		// 卸载元素时，根据需要移除元素上listener
		remove(el, binding) {
			if (!el) return
			const listener = this.listenerQueue.find(listener => listener.el === el)
			if (listener) {
				let index = this.listenerQueue.indexOf(listener)
				this.listenerQueue.splice(index, 1) && listener.destroy()
			}
		}
		// 事件的渲染函数，目前只支持img元素，后续可以添加background-url情况
		_elRender(listener, state) {
			if (!listener.el) return
			const {el} = listener
			let src
			switch (state) {
				case 'loading':
				src = listener.loading
				break
				case 'error':
				src = listener.error
				break
				default:
				src = listener.src
				break
			}
				// 判断是否相同
			if (el.getAttribute('src') !== src) {
				el.setAttribute('src', src)
			}
				el.setAttribute('lazy', state)
		}

		// 添加注册事件
		/* _addTargetEle(el){
	    	if(this.targetQueue.some(target => target.el === el)){
	    		el.childrenCount++;
	    	}else{
	    		this.targetQueue.push({
	    			childrenCount:1,
	    			el
	    		})
	    	}
	    } */

		// 删除注册事件
		/*  _removeTargetEle(el){
		    	if(this.targetQueue.some(target => target.el === el)){

		    	}
		    } */
	// 异步处理组件
		_lazyLoadHandler() {
			let visible
			this.listenerQueue.forEach(listener => {
				if (listener.state.loading || listener.state.loaded) {
					return
				}
				// 判断元素是否可见
				visible = listener.checkInView()
				visible && listener.load()
			})
		}
	}(options)
}
