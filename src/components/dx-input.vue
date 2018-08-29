<template>
	<label :class="{'dx-input-max': max}" class="dx-input">
		<span 
			:class="[labelTextClass]" 
			class="dx-input-label-text"
			v-if="$slots.default"
		>
			<slot></slot>
		</span>
		<input 
			v-model="model" 
			class="dx-input-origin-input" 
			:style="size"  
			:disabled="disabled"  
			:placeholder="inputPlaceholder"   
			@focus="handleFoucs" 
			@blur="handleBlur"
		/>
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
			max: Boolean,
			disabled: {
				type: Boolean,
				default: false
			},
			labelTextClass: String,
			size: Object
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
<style>
	/*整体样式*/
	.dx-input{
		color:#1f2d3d;
		font-size:1.4rem;

	}
	/*input框基本样式*/
	.dx-input-label-text{
		margin-right:0.5rem;
		line-height:2.5rem;
	}
	.dx-input-origin-input{
		border:0.1rem solid #b3b3b3;
		background:#fff;
		width:18rem;
		line-height:2.5rem;
		border-radius:0.2rem;
	}
	/* 以下设置为输入框最大长度即与父元素宽度一样 */
	.dx-input-max .dx-input-origin-input{
		width:100%;
		height:4rem;
		padding-left:12rem;
	}	
	.dx-input-max .dx-input-label-text{
		position:absolute;
		padding:0 1rem;
		width: 10rem;
	    line-height:4rem;
	    text-align:center;
	    z-index:1;
	    border-right:1px solid #b3b3b3;
	}
</style>
