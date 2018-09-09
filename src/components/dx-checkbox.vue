<template>
	<label 
		for="dx-checkbox"
		class="dx-checkbox"
		:class="{'is-checked': checked}"
		@click="select()"
	>
		<input 
			:value="value"
			:name="name"
			:checked="checked"
			type="checkbox"
			class="dx-checkbox-origin" 
		/> 
		<slot>{{label}}</slot>
	</label>
</template>
<script>
// 用于与组件dx-form-item通信
import Bus from '../utils/bus.js'
export default {
    name: 'DxCheckbox',
    componentName: 'DxCheckbox',
    props: {
		onlyDisplay: Boolean,
		label: String,
		value: Number,
      name: {
		type: String,
		default: 'dx-checkbox'
      }
    },
    data() {
		return {
			checked: false
		}
    },
    computed: {
		// 找到父元素dx-checkbox-group组件
		parent() {
			let parent = this.$parent
			let	parentName = parent.$options.componentName
			while (parentName !== 'DxCheckboxGroup') {
				parent = parent.$parent
				parentName = parent.$options.componentName
			}
			return parent
		}
    },
    methods: {
		select() {
			if (!this.onlyDisplay) {
				let model = this.parent.model
				this.checked = !this.checked
				if (this.checked) {
					model.push(this.value)
				} else {
					let index = model.indexOf(this.value)
					model.splice(index, 1)
				}
			}
		}
    },
    mounted() {
		Bus.$emit('dx-checkbox-add', this)
    },
    destroyed() {
		Bus.$emit('dx-checkbox-remove', this)
    }
}
</script>
<style>
.dx-checkbox {
	padding: 0.12rem 0.24rem;
	border-radius: 0.2rem;
	background-color: #DDDDDD;
	color: #fff;
	font-size: 0.24rem;
  line-height: 1;
}
.dx-checkbox.is-checked {
	background-color: #93D5F1;
}
.dx-checkbox-origin {
	display: none;
}

</style>