<script>
	import AjaxUpload from './ajax-upload.vue'
	import IframeUpload from './iframe-upload.vue'
	export default {
		name: 'DxUpload',
		render(h) {
			let data = {
				props: {
					...this.$attrs
				}
			}
			// 判断formData是否存在
			let fd = new FormData()
			let vnode = h(fd ? AjaxUpload : IframeUpload, {...data})
			return h('div', [vnode])
		}
	}
</script>