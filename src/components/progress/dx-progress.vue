<template>
	<div 
		class="dx-progress"
		:class="[
			status ? 'is-' + status : ''
		]"
		:aria-valuenow="percentage"
    	aria-valuemin="0"
    	aria-valuemax="100"
	>
		<div 
			class="dx-progress__bar"
			:class="{ 'is-text-inside':  !showText || showText && textInside}"
		>
	      <div 
	      	:style="{height: strokeWidth + 'px'}"
	      	class="dx-progress__bar--outer" 
	      	>
	        <div 
	        	:style="barStyle"
	        	class="dx-progress__bar--inner" 
	        >
	            <div 
	          		v-if="showText && textInside"
	          		class="dx-progress__bar--inner-text" >
	          		{{percentage}}%
	            </div>
	        </div>
	      </div>
	    </div>
	    <div
	      class="dx-progress__text"
	      v-if="showText && !textInside"
	      :style="{fontSize: progressTextSize + 'px'}"
	    >
	      <template v-if="!status">{{percentage}}%</template>
	      <i v-else 
	      	:style="{ color: color}"
	      	:class="iconClass" 
	      	class="dx-progress__text--icon-class"></i>
    	</div>
	</div>
</template>
<script>
export default {
	name: 'DxProgress',
	componentName: 'DxProgress',
	props: {
		percentage: {
			type: Number,
			default: 0,
			required: true,
			validator: val => val >= 0 && val <= 100
		},
		status: {
			type: String
		},
		color: {
			type: String
		},
		strokeWidth: {
			type: Number,
			default: 6
		},
		textInside: {
			type: Boolean,
			default: false
		},
		showText: {
			type: Boolean,
			default: true
		},
		iconClass: {
			type: String,
			default: 'icon iconfont dx-success dx-progress__text--icon'
		}
	},
	computed: {
		barStyle() {
			let style = {}
			style.width = this.percentage + '%'
			style.backgroundColor = this.color
			return style
		},
		progressTextSize() {
			return 12 + this.strokeWidth * 0.4
		}
	}
}
</script>
<style lang="scss">
	@include B(progress) {
		display: flex;
		align-items: center;
		justify-content: center;
		@include E(bar) {
			flex-grow: 1;
			@include when(text-inside) {
				margin-right: 0;
				padding-right: 0;
			}
			@include M(outer) {
				position: relative;
				background-color: #ebeef5;
				overflow: hidden;
				vertical-align: middle;
				border-radius: 10rem;
			}

			@include M(inner) {
				position: absolute;
				left: 0;
				top: 0;
				height: 100%;
				background-color: #409eff;
				line-height: 1;
				text-align: right;
			    white-space: nowrap;
			    border-radius: 10rem;
			    /* 位置元素的垂直居中 */
			    &:after {
				    display: inline-block;
				    content: "";
				    height: 100%;
				    vertical-align: middle;
				}
			}
			/* 进度条百分比内显 */
			@include M(inner-text) {
				display: inline-block;
				vertical-align: middle;
				color: $--dx-progress-bar-innerTex-color;
				font-size: $--dx-progress-bar-innerTex-font-size;
				padding: 0 0.5rem;
			}
		}
		
		/* 进度条百分比外显 */
		@include E(text) {
			font-size: $--dx-progress-bar-font-size;
		    color: $--dx-progress-bar-color;
		    display: inline-block;
		    vertical-align: middle;
		    margin-left: 10px;
		    line-height: 1;
		    /* 默认样式 */
			@include M(icon-class) {
				color: $--dx-progress-icon-color;
			}
			/* 默认样式 */
			@include M(icon) {
				font-size: $--dx-progress-icon-font-size;
			}
		}
		/* 进度条成功加载 */
		@include when(success) {
			.dx-progress__bar--inner {
				background-color: $--dx-progress-bar-inner-success-background-color;
			}
		}
	}
</style>