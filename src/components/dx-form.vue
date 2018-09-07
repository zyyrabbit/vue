<template>
	<form>
		<slot></slot>
	</form>	
</template>
<script>
 // 用于与组件dx-form-item通信
	import Bus from '../utils/bus.js'

	export default{
		componentName: 'DxForm',
		name: 'DxForm',
		props: {
			rules: Object,
			model: Object,
			// 设置表单项样式
			msgTextClass: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				fields: []
			}
		},
		watch: {
			rules() {
				this.validate()
			}
		},
		// 创建的时候，组件鉴定函数，用于注册表单元素组件实例
		created() {
			Bus.$on('dx-form-addField', (field) => {
				if (field) {
					this.fields.push(field)
				}
			}, this)
			Bus.$on('dx-form-removeField', (field) => {
				if (field.prop) {
					this.fields.splice(this.fields.indexOf(field), 1)
				}
			}, this)
		},
		methods: {
			// 提交表单时候，验证表单输入是否满足所有的验证规则
			validate(callback) {
				if (!this.model) {
					console.warn('[Form]model is required for validate to work!')
					return
				}
				let valid = true
				if (!callback || typeof callback !== 'function') {
					callback = () => {}
				}

				if (this.fields.length === 0) {
					callback(valid)
				}
				this.fields.forEach(function(field, index) {
					field.validate('', (error) => {
						if (error) {
							valid = false
						}
					})
				})
				callback(valid)
			}
		}
	}
</script>