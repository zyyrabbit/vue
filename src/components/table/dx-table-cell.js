export default {
	name: 'DxTableCell',
	componentName: 'DxTableCell',
	functional: true, // 没有data,instance,即是一个无状态的，称作virtual node,渲染代价小
	render: function(createElement, context) {
		const children = context.props.column.renderCell(context.props)
		return createElement(
			'div',
			[children]
		)
	}
}
