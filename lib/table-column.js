module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 115);
/******/ })
/************************************************************************/
/******/ ({

/***/ 115:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dx_table_column_js__ = __webpack_require__(116);


/* istanbul ignore next */
__WEBPACK_IMPORTED_MODULE_0__dx_table_column_js__["a" /* default */].install = function(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__dx_table_column_js__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__dx_table_column_js__["a" /* default */])
}

/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__dx_table_column_js__["a" /* default */]);


/***/ }),

/***/ 116:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

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
/* harmony default export */ __webpack_exports__["a"] = ({
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

});


/***/ })

/******/ });