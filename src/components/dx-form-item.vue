<template>
	<div 
		class="dx-form-item" 
		:style="{ width: width + 'px'}"
	>
		<slot></slot>
		<ul v-if="showPwdLevel" class="password-level-wrap">
			<li 
				v-for="(level, index) of pwdLevels" 
				:key="level"
				:class="[inputPwdLevel > index ? 'password-level-input-' + index : '']"
				class="password-level"
			>
				{{ level }}
			</li>
		</ul>
		<div 
			v-if="showMsg && text" 
			:class="[textClasses, {'dx-form-item-text-bottom': bottom}]"
		>
			{{ text }}
		</div>
	</div>
</template>
<script>
   import Validate from '@/utils/stragetegies.js'
   // 用于与组件dx-form-item通信
   import Bus from '@/utils/bus.js'
   const noop = () => {}

	export default{
		componentName: 'DxFormItem',
		name: 'DxFormItem',
		props: {
			// 是否启用输入框blur/onfoucs事件时触发验证
			isValidate: {
				type: Boolean,
				default: false
			},
			prop: String,
			samePorp: String,
			showMsg: Boolean,
			showPwdLevel: Boolean,
			rules: Array,
			instruction: String,
			width: String,
			isEffect: { // 是否应用开启验证，默认是开启，应用于根据条件是否开启验证
				type: Boolean,
				default: true
			},
			bottom: Boolean // 设置验证错误是信息在输入框下方显示
		},
		data() {
			return {
				text: '',
				textClass: '',
				pwdLevels: ['弱', '中', '强'],
				inputPwdLevel: 0
			}
		},
		computed: {
			textClasses() {
				return `dx-form-item-text ${this.textClass} ${this.msgTextClass}`
			},
			// 找到父元素dx-form组件
			form() {
				let parent = this.$parent
				let	parentName = parent.$options.componentName
				while (parentName !== 'DxForm') {
					parent = parent.$parent
					parentName = parent.$option.componentName
				}
				return parent
			},
			msgTextClass() {
				return this.form.msgTextClass
			},
			// 得到该该表单元素的输入值
			fieldValue: {
				cache: false,
				get() {
					let model = this.form.model
					if (!model || !this.prop) { return }
					return model[this.prop]
				}
			},
			sameFieldValue: {
				cache: false,
				get() {
					let model = this.form.model
					if (!model || !this.samePorp) { return }
					return model[this.samePorp]
				}
			}
		},
		mounted() {
			if (this.prop) {
				/*
				    $on.$emit父子间通信，父组件只能通过绑定到模板中才可以即v-on:xxxx=""。
				    总之on和emit的事件必须是在一个公共的实例上，才能触发。
				    这里为了通信，采用新建一个vue实例通信。
				*/
				Bus.$emit('dx-form-addField', this)
			}
			let rules = this.getRules()
			if (rules.length > 0) {
				this.$on('dx-form-blur', this.onFieldBlur)
				this.$on('dx-form-focus', this.onFieldFocus)
			}
		},
		methods: {
			// 验证规则
			validate(trigger = '', callback = noop) {
				// 判断是否开启验证
				if (!this.isEffect) {
					return true
				}
				let rules = this.getFilterRules(trigger)
				if (!rules || rules.length === 0) {
					callback()
					return true
				}
				let errorMsg = false
				let	rule = null
				// required优先级最高
				for (let i = 0, len = rules.length; i < len; i++) {
					rule = rules[i]
					// rule.value = this.fieldValue;
					// 如果是和其他输入域输入要一致
					if (rule.name === 'confirmSame') {
						rule.sameFieldValue = this.sameFieldValue
					}
					let rst = Validate[rule.name](rule, this.fieldValue)
					// 处理密码强度验证逻辑
					if (rule.name === 'pwdLevelVerification') {
						this.inputPwdLevel = rst
					}
					if (!rst) {
						this.text = rule.message || ''
						this.textClass = 'error'
						errorMsg = true
						/* 当确定输入为空的时候，立即返回 */
						if (rule.name === 'required') {
							break
						}
					}
				}
				// 如果验证正确，清除错误信息
				if (!errorMsg) {
					this.text = ''
				}
				callback(errorMsg)
			},
			// 得到该field的所有验证要求---后续优化，需要写一个合并函数，合并对象相同属性的值
			getRules() {
				let formRules = this.form.rules
				let	selfRules = this.rules
				let	baseRules = formRules && formRules.baseRule ? formRules.baseRule : []
				formRules = formRules && formRules[this.prop] ? formRules[this.prop].concat(baseRules) : baseRules
				// 可以在form表单上设置了公共校验规则
				return [].concat(selfRules || formRules || [])
			},
			// 根据触发添加得到验证规则
			getFilterRules(trigger) {
				let allRules = this.getRules()
				return allRules.filter((rule) => {
					return !rule.trigger || rule.trigger.indexOf(trigger) !== -1
				})
			},
			// 注销组件的时候，自动移除组件函数
			beforeDestory() {
				Bus.$emit('dx.form.removeField', this)
			},
			onFieldBlur() {
				this.isValidate && this.validate('blur')
			},
			onFieldFocus() {
				if (this.isValidate) {
					this.text = this.instruction || ''
					this.textClass = 'dx-form-item-instruction'
				}
			}
		}
	}
</script>
<style lang="scss">
	.dx-form-item {
		position: relative;
	}
	.dx-form-item-text {
		position: absolute;
		width: 100%;
		top: 0;
		word-wrap: normal;
		left: 82%;
		height: $--dx-form-item-text-height;
		line-height: $--dx-form-item-text-line-height;
	}
	.dx-form-item-text-bottom {
	    position: static;
	}
	.dx-form-item-text.error {
		color: $--dx-form-item-text-color-error;
	}
	.dx-form-item-instruction {
		color: $--dx-form-item-instruction-color;
	}
	// 密码等级
	.password-level-wrap {
		display: flex;
		width: 80%;
	}

	.password-level {
		flex-grow: 1;
		line-height: 3rem;
		font-size: 1.4rem;
		margin-top: 1rem;
		border: 1px solid #555;
		border-left: none;
		text-align: center;
		background-color: #ddd;
		opacity: 0.8;
		&:first-child {
			border-left: 1px solid #555;
			border-radius: 1.5rem 0 0 1.5rem;
		}
		&:last-child {
			border-radius: 0 1.5rem 1.5rem 0;
		}
	}
	.password-level-input-0 {
		background-color: red;
	}
	.password-level-input-1 {
		background-color: yellow;
	}
	.password-level-input-2 {
		background-color: green;
	}
</style>