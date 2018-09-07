<template>
	<label class="dx-radio">
		<span  
			:class="{'is-check':label === model,'is-disabled': disabled,'is-focus':focus}"
			class="dx-radio-input"
		>
			<slot name="radio-icon">
				<span class="dx-radio-inner-icon"></span>
			</slot>
			<input
				v-model="model"
				class="dx-radio-origin-input"
				:value="label"
				:name="name"
				:disabled="disabled"
				type="radio"
				@focus="focus=true"
				@blur="focus=false"
			>
		</span>
		<span v-if="!noLabel" class="dx-radio-label">
			<slot></slot>
			<template v-if="!$slots.default">{{label}}</template>
		</span>
	</label>
</template>
<script>
	export default {
		name: 'DxRadio',
		props: {
			label: {},
			value: {}, // 必须声明，v-model始终以data中为唯一数据源.
			disabled: Boolean,
			name: String,
			noLabel: Boolean
		},
		data() {
			return {
				focus: false
			}
		},
		computed: {
			model: {
				get() {
					return this.value
				},
				set(val) {
					// 必须触发input事件
					this.$emit('input', val)
				}
			}
		}
	}
</script>
<style>
	/*总体外部样式*/
	.dx-radio{
		color:#000;
		position:relative;
		cursor:pointer;
		display:inline-block;
		white-space: nowrap;
    	-moz-user-select: none;
    	-webkit-user-select: none;
    	-ms-user-select: none;
	}

	/*输入样式*/
	.dx-radio .dx-radio-input{
		vertical-align: middle;
		position:relative;
		line-height: 1;
		display: inline-block;
		outline:none;
	}
	
	.dx-radio-input .dx-radio-inner-icon{
		border: 0.1rem solid #bfcbd9;
    	border-radius: 50%;
	    width: 1.8rem;
	    height: 1.8rem;
	    position: relative;
	    display: inline-block;
	}
	
	.dx-radio-input .dx-radio-inner-icon:hover{
		border-color:#20a0ff;
	}
	/*单选按钮选中时候的背景色和按钮*/
	.dx-radio-input.is-check .dx-radio-inner-icon{
		background: #20a0ff;
	    border-color: #20a0ff;
	}
    /*单选按钮内部样式*/
	.dx-radio-input .dx-radio-inner-icon:after{
		width: 0.6rem;
    	height: 0.6rem;
	    border-radius: 50%;
	    background-color: #fff;
	    content: "";
	    position: absolute;
	    left: 50%;
	    top: 50%;
	    transform: translate(-50%,-50%);
	    transform:scale(0);
	    transition: transform .15s cubic-bezier(.71,-.46,.88,.6);
	}
	.dx-radio-input.is-check .dx-radio-inner-icon:after{
		transform: translate(-50%,-50%) scale(1);
	}
	/*隐藏实际的input元素*/
	.dx-radio-input .dx-radio-origin-input{
		position:absolute;
		left:0;
		top:0;
		bottom:0;
		right:0;
		margin:0;
    	outline: none;
    	z-index:-1;
    	opacity: 0;
	}
	/*label样式*/
	.dx-radio .dx-radio-label{
		vertical-align: middle;
	}
	/*禁用状态*/
	.dx-radio-input.is-disabled .dx-radio-inner-icon{
		background-color: #d1dbe5;
    	border-color: #d1dbe5;
    	cursor: not-allowed;
    	color:#d1dbe5;
	}
	.dx-radio-input.is-disabled+.dx-radio-label {
	    color: #bbb;
	    cursor: not-allowed;
	}
	.dx-radio-input.is-check.is-disabled .dx-radio-inner-icon{
		background: #d1dbe5;
	    border-color: #d1dbe5;
	}
</style>