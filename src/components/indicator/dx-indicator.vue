<template>
	<div 
		v-show="visible" 
		class="dx-indicator"
	>
		<div class="dx-indicator__content">
			<svg 
				v-if="!spinner" 
				class="dx-indicator--circular" 
				viewBox="25 25 50 50">
	          <circle 
	          	class="dx-indicator--path" 
	          	cx="50" 
	          	cy="50" 
	          	r="20" 
	          	fill="none"/>
	        </svg>
	        <i
	        	v-else 
	        	class="dx-indicator--i" 
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
<style>
.dx-indicator {
	width: 100%;
	height: 100%;
	position: fixed;
	z-index: 2000;
	left: 0;
	top: 0;
	background-color: transparent;
	transition: opacity 0.3s;
	font-size: 1.3rem;
}

.dx-indicator__content {
	width: 18rem;
	height: 18rem;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);

	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	border-radius: 2rem;
	background-color: #000;
	opacity: 0.6;
}
.dx-indicator--circular {
	height: 8rem;
	width: 8rem;
	animation: loading-rotate 2s linear infinite;
}

.dx-indicator__content--text {
	margin-top: 0.1rem;
	color: #ccc;
}

.dx-indicator--path {
	animation: loading-dash 1.5s ease-in-out infinite;
	stroke-dasharray: 90, 150;
	stroke-dashoffset: 0;
	stroke-width: 5;
	stroke: #ccc;
	stroke-linecap: round;
}
.dx-indicator--i {
    color: #ccc;
 }
@keyframes loading-rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes loading-dash {
  0% {
    stroke-dasharray: 1, 200; 
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -0.8rem;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -2.4rem;
  }
}

</style>