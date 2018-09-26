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
/******/ 	return __webpack_require__(__webpack_require__.s = 127);
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

/***/ 1:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ 127:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dx_form_item_vue__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dx_form_item_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__dx_form_item_vue__);


/* istanbul ignore next */
__WEBPACK_IMPORTED_MODULE_0__dx_form_item_vue___default.a.install = function(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__dx_form_item_vue___default.a.name, __WEBPACK_IMPORTED_MODULE_0__dx_form_item_vue___default.a)
}

/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__dx_form_item_vue___default.a);


/***/ }),

/***/ 128:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(129)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(131),
  /* template */
  __webpack_require__(133),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 129:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(130);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("d13af6cc", content, true);

/***/ }),

/***/ 130:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.dx-form-item{position:relative\n}\n.dx-form-item__password-level-wrap{display:-ms-flexbox;display:flex;width:80%\n}\n.dx-form-item__password-level{-ms-flex-positive:1;flex-grow:1;line-height:3rem;font-size:1.4rem;margin-top:1rem;border:1px solid #555;border-left:none;text-align:center;background-color:#ddd;opacity:0.8\n}\n.dx-form-item__password-level:first-child{border-left:1px solid #555;border-radius:1.5rem 0 0 1.5rem\n}\n.dx-form-item__password-level:last-child{border-radius:0 1.5rem 1.5rem 0\n}\n.dx-form-item__password-level--number-0{background-color:red\n}\n.dx-form-item__password-level--number-1{background-color:yellow\n}\n.dx-form-item__password-level--number-2{background-color:green\n}\n.dx-form-item--text{position:absolute;width:100%;top:0;word-wrap:normal;left:82%;height:3.2rem;line-height:3.2rem\n}\n.dx-form-item--text.is-bottom{position:static\n}\n.dx-form-item--text.is-error{color:red\n}\n.dx-form-item--instruction{color:#aaa\n}\n", ""]);

// exports


/***/ }),

/***/ 131:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _stragetegies = __webpack_require__(132);

var _stragetegies2 = _interopRequireDefault(_stragetegies);

var _bus = __webpack_require__(8);

var _bus2 = _interopRequireDefault(_bus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var noop = function noop() {};
// 用于与组件dx-form-item通信
exports.default = {
	componentName: 'DxFormItem',
	name: 'DxFormItem',
	props: {
		// 是否启用输入框blur/onfoucs事件时触发验证
		isValidate: {
			type: Boolean,
			default: false
		},
		prop: String,
		samePorp: String,
		showMsg: Boolean,
		showPwdLevel: Boolean,
		rules: Array,
		instruction: String,
		width: String,
		isEffect: { // 是否应用开启验证，默认是开启，应用于根据条件是否开启验证
			type: Boolean,
			default: true
		},
		bottom: Boolean // 设置验证错误是信息在输入框下方显示
	},
	data: function data() {
		return {
			text: '',
			textClass: '',
			pwdLevels: ['弱', '中', '强'],
			inputPwdLevel: 0
		};
	},

	computed: {
		textClasses: function textClasses() {
			return 'dx-form-item--text ' + this.textClass + ' ' + this.msgTextClass;
		},

		// 找到父元素dx-form组件
		form: function form() {
			var parent = this.$parent;
			var parentName = parent.$options.componentName;
			while (parentName !== 'DxForm') {
				parent = parent.$parent;
				parentName = parent.$option.componentName;
			}
			return parent;
		},
		msgTextClass: function msgTextClass() {
			return this.form.msgTextClass;
		},

		// 得到该该表单元素的输入值
		fieldValue: {
			cache: false,
			get: function get() {
				var model = this.form.model;
				if (!model || !this.prop) {
					return;
				}
				return model[this.prop];
			}
		},
		sameFieldValue: {
			cache: false,
			get: function get() {
				var model = this.form.model;
				if (!model || !this.samePorp) {
					return;
				}
				return model[this.samePorp];
			}
		}
	},
	mounted: function mounted() {
		if (this.prop) {
			/*
       $on.$emit父子间通信，父组件只能通过绑定到模板中才可以即v-on:xxxx=""。
       总之on和emit的事件必须是在一个公共的实例上，才能触发。
       这里为了通信，采用新建一个vue实例通信。
   */
			_bus2.default.$emit('dx-form-addField', this);
		}
		var rules = this.getRules();
		if (rules.length > 0) {
			this.$on('dx-form-blur', this.onFieldBlur);
			this.$on('dx-form-focus', this.onFieldFocus);
		}
	},

	methods: {
		// 验证规则
		validate: function validate() {
			var trigger = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
			var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;

			// 判断是否开启验证
			if (!this.isEffect) {
				return true;
			}
			var rules = this.getFilterRules(trigger);
			if (!rules || rules.length === 0) {
				callback();
				return true;
			}
			var errorMsg = false;
			var rule = null;
			// required优先级最高
			for (var i = 0, len = rules.length; i < len; i++) {
				rule = rules[i];
				// rule.value = this.fieldValue;
				// 如果是和其他输入域输入要一致
				if (rule.name === 'confirmSame') {
					rule.sameFieldValue = this.sameFieldValue;
				}
				var rst = _stragetegies2.default[rule.name](rule, this.fieldValue);
				// 处理密码强度验证逻辑
				if (rule.name === 'pwdLevelVerification') {
					this.inputPwdLevel = rst;
				}
				if (!rst) {
					this.text = rule.message || '';
					this.textClass = 'is-error';
					errorMsg = true;
					/* 当确定输入为空的时候，立即返回 */
					if (rule.name === 'required') {
						break;
					}
				}
			}
			// 如果验证正确，清除错误信息
			if (!errorMsg) {
				this.text = '';
			}
			callback(errorMsg);
		},

		// 得到该field的所有验证要求---后续优化，需要写一个合并函数，合并对象相同属性的值
		getRules: function getRules() {
			var formRules = this.form.rules;
			var selfRules = this.rules;
			var baseRules = formRules && formRules.baseRule ? formRules.baseRule : [];
			formRules = formRules && formRules[this.prop] ? formRules[this.prop].concat(baseRules) : baseRules;
			// 可以在form表单上设置了公共校验规则
			return [].concat(selfRules || formRules || []);
		},

		// 根据触发添加得到验证规则
		getFilterRules: function getFilterRules(trigger) {
			var allRules = this.getRules();
			return allRules.filter(function (rule) {
				return !rule.trigger || rule.trigger.indexOf(trigger) !== -1;
			});
		},

		// 注销组件的时候，自动移除组件函数
		beforeDestory: function beforeDestory() {
			_bus2.default.$emit('dx.form.removeField', this);
		},
		onFieldBlur: function onFieldBlur() {
			this.isValidate && this.validate('blur');
		},
		onFieldFocus: function onFieldFocus() {
			if (this.isValidate) {
				this.text = this.instruction || '';
				this.textClass = 'dx-form-item--instruction';
			}
		}
	}
};

/***/ }),

/***/ 132:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
// 采用策略模式
// 正确返回字符串的长度---1.可以采用Array.from方法 或 使用正则表达式
const caluStrLen = (str) => { return str.replace(/[^\x00-\xff]/g, 'aa').length }

/* harmony default export */ __webpack_exports__["default"] = ({
    // args值为单个rule对象
    required: (rule, value, callback) => {
        if (value === '') {
            callback && typeof callback === 'function' && callback()
            return false
        }
        return true
    },
    minLength: (rule, value, callback) => {
        if (caluStrLen(value) < rule.min) {
            callback && typeof callback === 'function' && callback()
            return false
        }
        return true
    },
    maxLength: (rule, value, callback) => {
        if (caluStrLen(value) > rule.max) {
            callback && typeof callback === 'function' && callback()
            return false
        }
        return true
    },
    isMobile: (rule, value, callback) => {
        if (!/^1[34578][0-9]{9}$/.test(+value)) {
            return false
        }
        callback && typeof callback === 'function' && callback()
        return true
    },
    confirmSame: (rule, value, callback) => {
        if (value !== rule.sameFieldValue) {
            callback && typeof callback === 'function' && callback()
            return false
        }
        return true
    },
    // 判断输入是否为中文、字母，数字，下划线
    isNumAndCharAnd_: (rule, value, callback) => {
        if (!/^[\w_]|[\u4E00-\u9FA5]*$/.test(value)) {
            callback && typeof callback === 'function' && callback()
            return false
        }
        return true
    },
    pwdLevelVerification: (rule, value, callback) => {
        let level = 0
        let { min, max } = rule
        // 密码长度
        if ((min && value.length < min) || (max && value.length > max)) {
            return level
        }
        if (/[A-Z]/.test(value)) {
            level++
        }
        if (/[a-z]/.test(value)) {
            level++
        }
        if (/[0-9]/.test(value)) {
            level++
        }
        if (/\W|_/.test(value)) {
            level++
        }
        return level
    }
});


/***/ }),

/***/ 133:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "dx-form-item",
    style: ({
      width: _vm.width + 'px'
    })
  }, [_vm._t("default"), _vm._v(" "), (_vm.showPwdLevel) ? _c('ul', {
    staticClass: "dx-form-item__password-level-wrap"
  }, _vm._l((_vm.pwdLevels), function(level, index) {
    return _c('li', {
      key: level,
      staticClass: "dx-form-item__password-level",
      class: [_vm.inputPwdLevel > index ? 'dx-form-item__password-level--number-' + index : '']
    }, [_vm._v("\n\t\t\t" + _vm._s(level) + "\n\t\t")])
  })) : _vm._e(), _vm._v(" "), (_vm.showMsg && _vm.text) ? _c('div', {
    class: [_vm.textClasses, {
      'is-bottom': _vm.bottom
    }]
  }, [_vm._v("\n\t\t" + _vm._s(_vm.text) + "\n\t")]) : _vm._e()], 2)
},staticRenderFns: []}

/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(3)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),

/***/ 3:
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


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