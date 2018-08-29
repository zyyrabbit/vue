
// 渲染table-cell方法
const renderMethods = {
	renderHeader: function(value) {
		return `${value}`
	},
	renderCell: function({row, column}) {
		return `${row[column.prop]}`
	}
}
// 列表编号
let tableColumnId = 0
export default{

	name: 'DxTableColumn',
	props: {
		rowKey: String, // 行的id---暂时没用到
		prop: String, // 行的性质
		renderHeader: Function, // 目前没用到
		width: {},
		label: String,
		reverse: {
			type: String,
			default: 'descending'
		},
		sortable: {
			tyep: Boolean,
			default: false
		},
		sortMethod: Function,
		selectable: Boolean,
		filterable: Boolean,
		filterValue: null
	},
	data() {
		return {
		}
	},
	computed: {
		// 找到table父元素
		parent() {
			let parent = this.$parent
			while (parent && !parent.tableId) {
				parent = parent.$parent
			}
			return parent
		},
		columnId() {
			return 'tableColumnId-' + tableColumnId++
		}

	},
	created() {
		// 如果设置width,则转化为数值
		let width = this.width
		if (width) {
			width = parseInt(width, 10)
			if (isNaN(width)) {
				width = null
			}
		}
		// 在这里可以重置render函数
		// this.customRender = this.$options.render
		this.$options.render = h => h('div', this.$slots.default)
		this.columnConfig = {
			id: this.columnId,
			renderCell: null,
			renderHeader: null,
			prop: this.prop,
			rowKey: this.rowKey,
			width,
			label: this.label,
			sortable: this.sortable,
			reverse: this.reverse,
			sortMethod: this.sortMethod,
			selectable: this.selectable,
			filterable: this.filterable,
			filterValue: this.filterValue
		}
		// 初始化列的渲染函数---注意forEach中的this
		Object.keys(renderMethods).forEach(function(key) {
			if (renderMethods.hasOwnProperty(key) && this.columnConfig.hasOwnProperty(key)) {
				this.columnConfig[key] = renderMethods[key]
			}
		}, this)
		// 渲染
		const defaultRenderCell = this.columnConfig.renderCell
		this.columnConfig.renderCell = (data) => {
			if (this.$scopedSlots.default) {
				return this.$scopedSlots.default(data)
			} else {
				return defaultRenderCell(data)
			}
		}
	},
	mounted() {
		// 向父组件发送一个commit
		if (this.parent) {
			this.parent.store.commit('addColumn', this.columnConfig)
		} else {
			throw new Error('The parent must be dx-table component!')
		}
	}

}
