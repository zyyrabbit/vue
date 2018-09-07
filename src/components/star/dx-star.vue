<template>
	<dx-rate 
		:type="type"
		:rating="rating"
		only-display
		:rateClass="iconClass"
		:selectRateClass="selectIconClass">
	</dx-rate>
</template>
<script>
import DxRate from './dx-rate.vue'
export default {
	name: 'DxStar',
	componentName: 'DxStar',
	components: {
		DxRate
	},
	props: {
		rating: {
			type: Number,
			default: 0
		},
		type: String
	},
	data() {
		return {
			iconClass: 'star-rate-icon',
			selectIconClass: 'star-rate-icon-select'
		}
	}
}
</script>
<style lang="scss">
	.star-rate-icon {
		background: red;
	}
	.star-rate-icon-select {
		background: black;
	}
	.dx-rate-item-small {
		width: 2.8rem;;
		height: 2.6rem;;	
		background-size: 100% 100%;;
	}
</style>