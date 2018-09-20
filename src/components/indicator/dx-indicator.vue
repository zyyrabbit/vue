<template>
	<div 
		v-show="visible" 
		class="dx-indicator"
	>
		<div class="dx-indicator__content">
			<svg 
				v-if="!spinner" 
				class="dx-indicator__content--circular" 
				viewBox="25 25 50 50">
	          <circle 
	          	class="dx-indicator__content--path" 
	          	cx="50" 
	          	cy="50" 
	          	r="20" 
	          	fill="none"/>
	        </svg>
	        <i
	        	v-else 
	        	class="dx-indicator__content--i" 
	        	:class="spinner">
	        </i>
			<p 
				v-if="text" 
				class="dx-indicator__content--text">
				{{ text }}
			</p>
		</div>
	</div>
</template>
<script>
export default {
    name: 'DxIndicator',
    componentName: 'DxIndicator',
    data() {
		return {
			visible: false,
			spinner: '',
			text: ''
		}
    }
}
</script>
<style lang="scss">
	@include B(indicator) {
		width: 100%;
		height: 100%;
		position: fixed;
		z-index: 2000;
		left: 0;
		top: 0;
		background-color: transparent;
		transition: opacity 0.3s;
		font-size: 1.3rem;
		@include E(content) {
			width: $--dx-indicator-content-width;
			height: $--dx-indicator-content-height;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);

			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			border-radius: 2rem;
			background-color: $--dx-indicator-content-background-color;
			opacity: $--dx-indicator-content-opacity;
			@include M(circular) {
				height: $--dx-indicator-content-circular-height;
				width: $--dx-indicator-content-circular-width;
				animation: loading-rotate 2s linear infinite;
			}
			// 文字
			@include M(text) {
				margin-top: 0.1rem;
				color: $--dx-indicator-content-text-color;
			}
			@include M(path) {
				animation: loading-dash 1.5s ease-in-out infinite;
				stroke-dasharray: 90, 150;
				stroke-dashoffset: 0;
				stroke-width: 5;
				stroke: $--dx-indicator-content-stroke-color;
				stroke-linecap: round;
			}
			@include M(i) {
				color: $--dx-indicator-content-text-color;
			}
		}
	}
</style>