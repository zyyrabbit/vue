<template>
	<ul class="dx-rate clearfix">
		<li 
			v-for="index in 5"
			:key="index"
			@click="select(index)"
			class="dx-rate-item">
			<i 
				class="icon iconfont dx-star"
				:style="{'font-size': size + 'rem'}"
				:class="[
					rateClass, 
					level > index ? selectRateClass : '',
					type ? 'dx-rate-item-' + type : '']"
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
			default: 'star-rate-icon'
		},
		selectRateClass: {
			type: String,
			default: 'star-rate-icon-select'
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
.clearfix {
	clear: both;
	_display: inline;
}
.dx-rate-item {
	float: left;
	cursor: pointer;
	font-size: 1.6rem;
}

/* 选择背景框 */
.star-rate-icon {
	color: $--dx-rate-icon-color;
}
.star-rate-icon-select {
	color: $--dx-rate-icon-color-select;
}
</style>