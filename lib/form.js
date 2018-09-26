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
/******/ 	return __webpack_require__(__webpack_require__.s = 123);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 123:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dx_form_vue__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dx_form_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__dx_form_vue__);


/* istanbul ignore next */
__WEBPACK_IMPORTED_MODULE_0__dx_form_vue___default.a.install = function(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__dx_form_vue___default.a.name, __WEBPACK_IMPORTED_MODULE_0__dx_form_vue___default.a)
}

/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__dx_form_vue___default.a);


/***/ }),

/***/ 124:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(125),
  /* template */
  __webpack_require__(126),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 125:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _bus = __webpack_require__(8);

var _bus2 = _interopRequireDefault(_bus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	componentName: 'DxForm',
	name: 'DxForm',
	props: {
		rules: Object,
		model: Object,
		// 设置表单项样式
		msgTextClass: {
			type: String,
			default: ''
		}
	},
	data: function data() {
		return {
			fields: []
		};
	},

	watch: {
		rules: function rules() {
			this.validate();
		}
	},
	// 创建的时候，组件鉴定函数，用于注册表单元素组件实例
	created: function created() {
		var _this = this;

		_bus2.default.$on('dx-form-addField', function (field) {
			if (field) {
				_this.fields.push(field);
			}
		}, this);
		_bus2.default.$on('dx-form-removeField', function (field) {
			if (field.prop) {
				_this.fields.splice(_this.fields.indexOf(field), 1);
			}
		}, this);
	},

	methods: {
		// 提交表单时候，验证表单输入是否满足所有的验证规则
		validate: function validate(callback) {
			if (!this.model) {
				console.warn('[Form]model is required for validate to work!');
				return;
			}
			var valid = true;
			if (!callback || typeof callback !== 'function') {
				callback = function callback() {};
			}

			if (this.fields.length === 0) {
				callback(valid);
			}
			this.fields.forEach(function (field, index) {
				field.validate('', function (error) {
					if (error) {
						valid = false;
					}
				});
			});
			callback(valid);
		}
	}
}; //
//
//
//
//

// 用于与组件dx-form-item通信

/***/ }),

/***/ 126:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('form', [_vm._t("default")], 2)
},staticRenderFns: []}

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

module.exports = require("vue");

/***/ }),

/***/ 8:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
// 用于非父子间的通信，公共组件

const BaseBus = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a()
const merge = __WEBPACK_IMPORTED_MODULE_0_vue___default.a.config.optionMergeStrategies.destroyed
/* harmony default export */ __webpack_exports__["default"] = ({
	$on(eventName, callback, vm) {
		BaseBus.$on(eventName, callback)
		// vm 若为 vue实例，则注册如果组件销毁时，自动注销的组件，避免组件每次懂需手动添加组件注销时，注销注册的事件
		if (vm && vm instanceof __WEBPACK_IMPORTED_MODULE_0_vue___default.a) {
			merge(vm.$options.destroyed, function() {
				BaseBus.$off(eventName, callback)
			})
		}
	},
	$once: BaseBus.$once.bind(BaseBus),
	$off: BaseBus.$off.bind(BaseBus),
	$emit: BaseBus.$emit.bind(BaseBus)
});


/***/ })

/******/ });