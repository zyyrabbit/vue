function broadcast(componentName, eventName, params) {
	this.$children.forEach(function(child, index) {
		let name = child.$options.componentName
		if (name !== componentName) {
			broadcast.apply(child, [componentName, eventName].concat(params))
		} else {
			child.$emit.apply(child, [eventName].concat(params))
		}
	})
}
export default {
	methods: {
		dispatch(componentName, eventName, params) {
			let parent = this.$parent || this.$root
			let name = parent.$options.componentName
			while (parent && (!name || name !== componentName)) {
				parent = parent.$parent
				if (parent) {
					name = parent.$options.componentName
				}
			}
			if (parent) {
				parent.$emit.apply(parent, [eventName].concat(params))
			}
		},
		broadcast(componentName, eventName, params) {
			broadcast.call(this, componentName, eventName, params)
		}
	}
}
