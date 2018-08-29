<script>
export default {
	name: 'DxHeading',
	componentName: 'DxHeading',
	functional: true, // 没有data,instance,即是一个无状态的，称作virtual node,渲染代价小
	render: function(createElement, context) {
		var className = context.data.staticClass ? context.data.staticClass : 'dx-heading-font'
		return createElement(
			'h' + context.props.level,
			{
				'class': [className]
			},
			context.children
		)
	}
}
</script>
<style>
	.dx-heading-font{
		color:#122f3d;
		font-weight:400;
	}
</style>