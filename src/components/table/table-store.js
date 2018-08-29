import {orderBy} from './utils.js'
// 状态类
const TabelStore = function(table, initalState = {}) {
	if (!table) {
		throw new Error('The table is need!')
	}
	this.table = table
	// 初始化状态管理
	this.states = {
		expandColumn: null,
		columns: [],
		_data: null,
		data: null,
		selectDatas: [],
		filterDatas: null,
		hasFilter: false // 是否需要查询数据

	}
	// 根据输入参数，初始化状态
	for (let name in initalState) {
		if (initalState.hasOwnProperty(name) && this.state.hasOwnProperty(name)) {
			this.states[name] = initalState[name]
		}
	}
}
TabelStore.prototype.mutation = {
	// 设置table数据
	setData(states, data) {
		if (!data || states._data === data) {
			return
		}
		states.data = states._data = data
	},
	// 添加列数据
	addColumn(states, column) {
		if (column) {
			if (column.filterable) {
				states.hasFilter = true
			}
			states.columns.push(column)
		}
	},
	// 排序数据
	sortData(states, column) {
		states.data = orderBy((states.filterDatas || states._data || []),
								column.prop,
								column.reverse,
								column.sortMethod
							)
		this.table.$emit('sort-change', {
			column,
			prop: column.prop,
			order: column.reverse
			})
		this.table.$emit('clear-all-select')
	},
	// 选择单个数据
	toggleSelectData(states, index) {
		let _selectDatas = states.selectDatas
		let selectRow = states.data[index]
		let isExistRow = _selectDatas.indexOf(selectRow)
		if (isExistRow === -1) {
			selectRow && _selectDatas.push(selectRow)
		} else {
			_selectDatas.splice(isExistRow, 1)
		}
		this.table.$emit('select-change', _selectDatas)
	},
	// 选择所有数据
	toggleSelectAllDatas(states, isCheckedAll) {
		states.selectDatas = []
		if (!isCheckedAll) { return }
		states.selectDatas = states.data.slice()
		this.table.$emit('all-select-change', states.selectDatas)
	},
	// 按条件查询数据
	filterData(states) {
		states.filterDatas = states._data.filter(function(row) {
			return states.columns.every(function(column) {
				if (column.filterable && column.filterValue) {
					return row[column.prop].toString().match(column.filterValue)
				}
				return true
			})
		})
		states.data = states.filterDatas
		this.table.$emit('clear-all-select')
		this.table.$emit('filter-change', states.filterDatas)
	}

}
// 通过统一接口来操作接口
TabelStore.prototype.commit = function(name, ...args) {
	if (this.mutation[name]) {
		this.mutation[name].apply(this, [this.states].concat(args))
	}
}
export default TabelStore
