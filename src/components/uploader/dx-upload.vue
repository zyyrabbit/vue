<script>
	import AjaxUpload from './ajax-upload.vue'
	import IframeUpload from './iframe-upload.vue'
	export default {
		name: 'DxUpload',
		props: {
			action: {
				type: String,
				required: true
			},
			multiple: Boolean,
			name: {
				type: String,
				default: 'file'
			},
			tip: String,
			beforeUpload: Function
		},
		render(h) {
			let children = []
			let data = {
				props: {
					tip: this.tip,
					beforeUpload: this.beforeUpload,
					multiple: this.multiple,
					action: this.action
				}
			}
			let fd = new FormData()
			let vnode = h(fd ? AjaxUpload : IframeUpload, {...data})
			children.push(vnode)
			return h('div', children)
		}
	}
</script>