<template>
	<label class="dx-input">
		<span 
			class="dx-input--label-text dx-input--label-text-left"
			v-if="$slots.default"
		>
			<slot></slot>
		</span>
		<input 
			v-model="model" 
			:style="inputStyle"
			:class="[inputClass]"
			class="dx-input--origin-input" 
			:disabled="disabled"   
			:type="originType" 
			:placeholder="inputPlaceholder"   
			@focus="handleFoucs" 
			@blur="handleBlur"
		/>
		<span 
			class="dx-input--label-text dx-input--label-text-right"
			v-if="$slots.left"
		>
			<slot name="left"></slot>
		</span>
	</label>
</template>
<script>
	// 用于简单的非父子组件之间的通信
    import emitter from './mixins/emitter.js'
	export default{
		componentName: 'DxInput',
		name: 'DxInput',
		mixins: [emitter],
		props: {
			value: {},
			placeholder: {
				type: String,
				default: ''
			},
			originType: String,
			disabled: {
				type: Boolean,
				default: false
			},
			inputStyle: Object,
			inputClass: String
		},
		data() {
			return {
				inputPlaceholder: this.placeholder
			}
		},
		computed: {
			model: {
				get() {
					return this.value
				},
				set(val) {
					this.$emit('input', val)
				}

			}
		},
		methods: {
			handleBlur(event) {
				this.inputPlaceholder = this.placeholder
				this.$emit('blur', event)
				this.dispatch('DxFormItem', 'dx-form-blur', [this.value])
			},
			handleFoucs(event) {
				this.inputPlaceholder = ''
				this.$emit('foucs', event)
				this.dispatch('DxFormItem', 'dx-form-focus', [])
			}
		}
	}
</script>
<style lang="scss">
	@include B(input) {
		display: inline-flex;
		width: 80%;
		font-size: $--dx-input-font-size;
		height: $--dx-input-height;
		line-height: $--dx-input-line-height;
		color: $--dx-input-color;
		border: 1px solid #ccc;
		border-radius: 4px;
		/* 以下设置为输入框最大长度即与父元素宽度一样 */
		@include M(origin-input) {
			flex-grow: 1;
			font-size: $--dx-input-font-size;
			padding-left: 1rem;
			// 修复ios中input自动圆角的问题
			border: none;
			outline: none;
			-webkit-appearance: none;
			border-radius: 0.5rem;
			placeholder-color: #D3D3D3;
		}

		@include M(label-text) {
			padding: 0 1rem;
			background-color: $--dx-input-label-text-background-color;
			color: $--dx-input--label-text-color;
		}

		@include M(label-text-left) {
			border-right: 1px solid #ccc;
		}

		@include M(label-text-right) {
			border-left: 1px solid #ccc;
		}

	}
</style>
