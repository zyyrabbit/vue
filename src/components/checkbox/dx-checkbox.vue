<template>
	<label 
		for="dx-checkbox"
		class="dx-checkbox"
		:class="{
				'is-checked': checked,
				'is-disabled': disabled,
				'is-button': btnType
			}"
		@click="select()"
	>
		<input 
			:value="value"
			:name="name"
			:checked="checked"
			:disabled="disabled"
			type="checkbox"
			class="dx-checkbox-origin" 
		/>
		<span v-if="!btnType" class="dx-checkbox-inner"></span>
		<slot><span  class="dx-checkbox-label"> {{ label }} </span></slot>
	</label>
</template>
<script>
// 用于与组件dx-form-item通信
import Bus from '../../utils/bus.js'
export default {
    name: 'DxCheckbox',
    componentName: 'DxCheckbox',
    props: {
		btnType: Boolean,
		label: {
			type: String,
			required: true
		},
		value: {},
		name: {
			type: String,
			default: 'dx-checkbox'
		},
		disabled: Boolean
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
			while (parent && parent.$options.componentName !== 'DxCheckboxGroup') {
				parent = parent.$parent
			}
			return parent
		},
		selectVal() {
			return this.value ? this.value : this.label
		}
    },
    methods: {
		select() {
			if (!this.disabled) {
				this.checked = !this.checked
				// 作为group使用
				if (this.parent) {
					let model = this.parent.model
					if (this.checked) {
						model.push(this.selectVal)
					} else {
						let index = model.indexOf(this.selectVal)
						model.splice(index, 1)
					}
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
<style lang="scss">
.dx-checkbox {
	margin-right: 1rem;
	color: $--dx-checkbox-color;
	font-size: $--dx-checkbox-font-size;
	.dx-checkbox-inner {
		display: inline-block;
	    position: relative;
	    border: 1px solid #dcdfe6;
	    border-radius: 2px;
	    box-sizing: border-box;
	    width: $--dx-checkbox-inner-width;
	    height: $--dx-checkbox-inner-height;
	    background-color: #fff;
	    z-index: 1;
	    vertical-align: middle;
	    transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46);
	    &:after {
		    box-sizing: content-box;
		    content: "";
		    border: 1px solid #fff;
		    border-left: 0;
		    border-top: 0;
		    height: 7px;
		    left: 4px;
		    position: absolute;
		    top: 1px;
		    transform: rotate(45deg) scaleY(0);
		    width: 3px;
		    transition: transform .15s ease-in .05s;
		    transform-origin: center;
	    }
	}

	.dx-checkbox-label {
		display: inline-block;
		vertical-align: middle;
	}

	&.is-checked {
		color: $--dx-checkbox-color-check;
		.dx-checkbox-inner {
			background-color: $--dx-checkbox-color-check;
    		border-color: $--dx-checkbox-color-check;
    		&:after {
    			transform: rotate(45deg) scaleY(1);
    		}
		}
	}

	&.is-disabled {
		color: $--dx-checkbox-color-disabled;
	}

}
/* btn类型 */
.dx-checkbox.is-button {
	padding: 1rem 2rem;
	border-radius: 0.5rem;
	background-color: $--dx-checkbox-background-color-btn;
	color: $--dx-checkbox-color-btn;
    line-height: 1;

    &.is-checked {
    	color: $--dx-checkbox-color-check-btn;
    	background-color: $--dx-checkbox-background-color-check-btn;
    }

    &.is-disabled {
    	color: $--dx-checkbox-color-disabled;
    	background-color: $--dx-checkbox-background-color-disabeld;
    }
}
.dx-checkbox-origin {
	display: none;
}
</style>