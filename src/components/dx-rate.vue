<template>
	<ul class="dx-rate clearfix">
		<li 
			v-for="index in 5"
			:key="index"
			@click="select(index)"
			class="dx-rate__item">
			<i 
				class="icon iconfont dx-star"
				:style="{'font-size': size + 'rem'}"
				:class="[
					rateClass, 
					level > index ? selectRateClass : '',
					type ? 'dx-rate__item--' + type : '']"
			></i>
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
		size: String,
		rateClass: {
			type: String,
			default: 'dx-rate__item--star-icon'
		},
		selectRateClass: {
			type: String,
			default: 'is-select'
		}
    },
    data() {
		return {
			level: this.onlyDisplay ? this.rating + 1 : 0
		}
    },
	methods: {
		select(index) {
			if (!this.onlyDisplay) {
				if (this.level !== index + 1) {
					this.level = index + 1
					this.$emit('input', index)
					this.$emit('change', index)
				}
			}
		}
	}
}
</script>
<style lang="scss">
	@include B(rate) {
		@include E(item) {
			float: left;
			cursor: pointer;
			font-size: 1.6rem;

			@include M(star-icon) {
				color: $--dx-rate-icon-color;
				@include when(select) {
					color: $--dx-rate-icon-color-select;
				}
			}
		}
	}
</style>