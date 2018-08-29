import {loadImageAsync} from 'utils/utils.js'
const imgCache = {}
export default class {
	constructor({el, loading, error, src, elRender}) {
		this.el = el // 元素
		this.loading = loading // loading图片地址
		this.error = error // 加载出错地址
		this.src = src // 需要加载的图片地址
		this.naturalHeight = 0
        this.naturalWidth = 0
		this.initState()
		this.elRender = elRender
        this.render('loading')
	}
	// 根据状态渲染元素
    render(state) {
		this.elRender(this, state)
    }

    // 异步加载loading图片
    renderLoading(cb) {
		this.state.loading = true
		loadImageAsync(this.loading, data => {
			this.render('loading')
			cb()
		}, error => {
			this.state.error = true
		})
    }
    // 开始加载图片
	load() {
		if (this.state.loaded || imgCache[this.src]) {
			return this.render('loaded')
		}
		this.renderLoading(() => {
			loadImageAsync(
				this.src,
				data => {
					this.naturalHeight = data.naturalHeight
					this.naturalWidth = data.naturalWidth
					this.state.loaded = true
					this.state.error = false
					this.state.loading = false
					imgCache[this.src] = 1
					this.render('loaded')
				},
				error => {
					this.state.error = true
					this.state.loaded = false
					this.state.loading = false
					this.render('error')
				}
			)
		})
	}
	// 得到元素的距离样式
    getRect() {
		// 会造成浏览器重排和重绘
        this.rect = this.el.getBoundingClientRect()
    }
	// 判断是否元素是否可见
	checkInView() {
        this.getRect()
        return (this.rect.top < window.innerHeight && this.rect.bottom > 0) &&
            (this.rect.left < window.innerWidth && this.rect.right > 0)
    }
    // 初始化状态
	initState() {
		this.state = {
			loading: false,
			loaded: false,
			error: false
		}
	}
	// 更新
	update(src) {
		let oldSrc = this.src
		if (oldSrc !== src) {
			this.src = src
			this.initState()
		}
	}
	// 注销
	destroy() {
		this.el = null // 元素
		this.loading = null // loading图片地址
		this.error = null // 加载出错地址
		this.src = null // 需要加载的图片地址
		this.state = null
		this.elRender = null
	}
}
