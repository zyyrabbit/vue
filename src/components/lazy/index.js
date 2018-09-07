
import Lazy from './lazy.js'

export default {

	install(Vue, options = {}) {
		const lazy = Lazy(Vue, options)
		if (Number(Vue.version.split('.')[0]) !== 2) {
			console.log('目前仅支持Vue2.0及以上！')
			return
		}
		Vue.directive('lazy', {
			bind: lazy.add.bind(lazy),
			update: lazy.update.bind(lazy),
			componentUpdated: lazy.lazyLoadHandler.bind(lazy),
			unbind: lazy.remove.bind(lazy)
		})
    }
}
