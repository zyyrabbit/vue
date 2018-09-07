<template>
	<ul class="dx-rate clearfix">
		<li 
			v-for="index in 5"
			:key="index"
			:class="[
			rateClass, 
			level > index ? selectRateClass : '', 
			type ? 'dx-rate-item-' + type : '']"
			@click="select(index)"
			class="dx-rate-item">
		</li>
   </ul>
</template>
<script>
export default {
    name: 'DxRate',
    componentName: 'DxRate',
    props: {
		value: {},
		rating: Number,
		type: String,
		onlyDisplay: Boolean,
		rateClass: String,
		selectRateClass: String
    },
    data() {
		return {
			level: this.onlyDisplay ? this.rating + 1 : 0
		}
    },
	methods: {
		select(index) {
			if (!this.onlyDisplay) {
				this.level = index + 1
				this.$emit('input', index)
			}
		}
	}
}
</script>
<style>
.clearfix {
	clear: both;
	_display: inline;
}
.dx-rate-item {
	float: left;
	width: 4rem;
	height: 4rem;
}
</style>