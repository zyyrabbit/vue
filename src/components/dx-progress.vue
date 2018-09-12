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
			class="dx-progress-bar"
			:class="{ 'textInside':  !showText || showText && textInside}"
		>
	      <div 
	      	:style="{height: strokeWidth + 'px'}"
	      	class="dx-progress-bar-outer" 
	      	>
	        <div 
	        	:style="barStyle"
	        	class="dx-progress-bar-inner" 
	        >
	            <div 
	          		v-if="showText && textInside"
	          		class="dx-progress-bar-innerText" >
	          		{{percentage}}%
	            </div>
	        </div>
	      </div>
	    </div>
	    <div
	      class="dx-progress-text"
	      v-if="showText && !textInside"
	      :style="{fontSize: progressTextSize + 'px'}"
	    >
	      <template v-if="!status">{{percentage}}%</template>
	      <i v-else 
	      	:style="{ color: color}"
	      	:class="iconClass" 
	      	class="dx-progress-icon-class"></i>
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
			default: 'icon iconfont dx-success dx-progress-icon'
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
.dx-progress {
	display: flex;
	align-items: center;
	justify-content: center;
}
.dx-progress-bar {
	flex-grow: 1;
}
.dx-progress-bar.textInside {
	margin-right: 0;
	padding-right: 0;
}
/* 进度条整体样式 */
.dx-progress-bar-outer {
	position: relative;
	background-color: #ebeef5;
	overflow: hidden;
	vertical-align: middle;
}
/* 进度条实际长度 */
.dx-progress-bar-inner {
	position: absolute;
	left: 0;
	top: 0;
	height: 100%;
	background-color: #409eff;
	line-height: 1;
	text-align: right;
    white-space: nowrap;
}
/* 进度条百分比内显 */
.dx-progress-bar-innerText {
	display: inline-block;
	vertical-align: middle;
	color: $--dx-progress-bar-innerTex-color;
	font-size: $--dx-progress-bar-innerTex-font-size;
	padding: 0 0.5rem;
}
/* 位置元素的垂直居中 */
.dx-progress-bar-inner:after {
    display: inline-block;
    content: "";
    height: 100%;
    vertical-align: middle;
}
/* 进度条百分比外显 */
.dx-progress-text {
	font-size: $--dx-progress-bar-font-size;
    color: $--dx-progress-bar-color;
    display: inline-block;
    vertical-align: middle;
    margin-left: 10px;
    line-height: 1;
}
/* 进度条成功加载 */
.dx-progress.is-success .dx-progress-bar-inner {
	background-color: $--dx-progress-bar-inner-success-background-color;
}
/* h弧度 */
.dx-progress-bar-outer, .dx-progress-bar-inner {
	border-radius: 10rem;
}
/* 默认样式 */
.dx-progress-icon-class {
	color: $--dx-progress-icon-color;
}
.dx-progress-icon {
	font-size: $--dx-progress-icon-font-size;
}
</style>