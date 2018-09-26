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
/******/ 	return __webpack_require__(__webpack_require__.s = 117);
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

/***/ 117:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dx_message_box_vue__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dx_message_box_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__dx_message_box_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_utils_js__ = __webpack_require__(7);



const defaultOptions = {
	visible: false, // 控制弹窗是否可见
	parentEleId: '', // 挂载的父元素的id
	showHeader: true,
	title: '',
	callback: null,
	message: '',
	modal: true,
	// 按钮设置
	cancelBtnText: '取消',
	confirmBtnText: '确认',
	showBtns: true,
	showConfirm: true,
	showCancel: true,
	showClose: true,
	// 自定义样式
	customBoxClass: '',
	buttonClass: '',
	cancelButtonClass: '',
	confirmButtonClass: '',
	titleClass: '',
	contentClass: '',
	center: false
}
// 构建构造函数
const MessageConstructor = __WEBPACK_IMPORTED_MODULE_0_vue___default.a.extend(__WEBPACK_IMPORTED_MODULE_1__dx_message_box_vue___default.a)
let currentOptions, instance
// let msgQueue = [];
// 默认回调函数
const defaultCallback = (action) => {
	if (currentOptions) {
		let callback = currentOptions.callback
		if (typeof callback === 'function') {
			callback(action)
		}
	}
}
let uniqueId = 1
// 初始化一个弹窗实例
const initInstance = () => {
	let mountEl = document.createElement('div')
	instance = new MessageConstructor({
		el: mountEl
	})
	instance.callback = defaultCallback
}
// 打开弹窗
const OpenMessageBox = (options) => {
	if (!instance) {
		initInstance()
	}
	if (!instance.visible) {
		currentOptions = Object(__WEBPACK_IMPORTED_MODULE_2__utils_utils_js__["c" /* merge */])({}, defaultOptions, options)
		// 合并实例上的参数
		Object(__WEBPACK_IMPORTED_MODULE_2__utils_utils_js__["c" /* merge */])(instance, currentOptions)
		if (!currentOptions.callback) {
			instance.callback = defaultCallback
		}
		// 判断是否为自定义的内容vnode
		if (Object(__WEBPACK_IMPORTED_MODULE_2__utils_utils_js__["b" /* isVNode */])(instance.message)) {
			// 如果为vnode,则key设置不一样的可以以强制更新,否者vnode打补丁没更新
			// if (instance.message.tag.indexOf('vue-component') !== -1) {
				instance.message.key = uniqueId = (uniqueId + 1) % 2
			// }
			instance.$slots.default = [instance.message]
			// 如果自定义传入vnode，则会触发视图更新，从而渲染视图--注意视图渲染是异步更新的
			// 所以必须把message设置为null,支持视图还没有更新，否则会出现json解析错误
			instance.message = null
		} else {
			delete instance.$slots.default
		}
		let oldCb = instance.callback
			instance.callback = (action, instance) => {
			oldCb(action, instance)
		}
      // 设置挂载元素
      if (instance.parentEleId) {
			document.getElementById(instance.parentEleId).appendChild(instance.$el)
      } else {
			document.body.appendChild(instance.$el)
      }
      __WEBPACK_IMPORTED_MODULE_0_vue___default.a.nextTick(() => {
        instance.visible = true
      })
	}
}
OpenMessageBox.close = () => {
	instance.visible = false
	instance.callback && instance.callback('cancel', instance)
	// currentOptions = null
}
/* harmony default export */ __webpack_exports__["default"] = (OpenMessageBox);


/***/ }),

/***/ 118:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(119)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(121),
  /* template */
  __webpack_require__(122),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 119:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(120);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("ab207eaa", content, true);

/***/ }),

/***/ 120:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.dx-msgbox-wrapper{position:fixed;top:0;left:0;width:100%;height:100%;font-size:1.4rem;min-width:100%;z-index:99999\n}\n.dx-msgbox-wrapper--mask{width:100%;height:120%;background-color:#333;position:fixed;top:0;left:0;z-index:0;opacity:0.4\n}\n.dx-msgbox{position:absolute;left:50%;top:50%;-ms-transform:translate(-50%, -50%);transform:translate(-50%, -50%);border:1px solid rgba(0,0,0,0.1);border-radius:0.5rem;background-color:#fff;z-index:1;min-width:20%;max-width:80%;padding:1.5rem\n}\n.dx-msgbox__header{vertival-align:middle\n}\n.dx-msgbox__header--title{font-size:1.6rem\n}\n.dx-msgbox__header--close{float:right;cursor:pointer\n}\n.dx-msgbox__content{margin-top:1rem\n}\n.dx-msgbox__buttons{text-align:right;margin-top:2rem\n}\n.dx-msgbox__buttons.is-center{text-align:center\n}\n.msgbox-fade-enter-active{animation:msgbox-fade-in .3s\n}\n.msgbox-fade-leave-active{animation:msgbox-fade-out .3s\n}\n", ""]);

// exports


/***/ }),

/***/ 121:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
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

exports.default = {
	data: function data() {
		return {
			// 内容设置
			visible: false,
			parentEleId: '',
			showHeader: true,
			title: '',
			callback: null,
			message: '',
			modal: true,
			// 按钮设置
			cancelBtnText: '',
			confirmBtnText: '',
			showBtns: true,
			showConfirm: true,
			showCancel: true,
			showClose: true,
			// 自定义样式
			customBoxClass: '',
			buttonClass: '',
			cancelButtonClass: '',
			confirmButtonClass: '',
			titleClass: '',
			contentClass: '',
			center: false
		};
	},

	computed: {
		// 得到计算样式
		customBoxClasses: function customBoxClasses() {
			return 'dx-msgbox ' + this.customBoxClass;
		},
		titleClasses: function titleClasses() {
			return 'dx-msgbox__header ' + this.titleClass;
		},
		contentClasses: function contentClasses() {
			return 'dx-msgbox__content ' + this.contentClass;
		},
		buttonClasses: function buttonClasses() {
			return 'dx-msgbox__buttons ' + this.buttonClass;
		},
		cancelButtonClasses: function cancelButtonClasses() {
			return '' + this.cancelButtonClass;
		},
		confirmButtonClasses: function confirmButtonClasses() {
			return '' + this.confirmButtonClass;
		}
	},
	methods: {
		// 处理方法
		handleAction: function handleAction(action) {
			this.visible = false;
			this.callback && this.callback(action, this);
		}
	}
};

/***/ }),

/***/ 122:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('transition', {
    attrs: {
      "name": "msgbox-fade"
    }
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.visible),
      expression: "visible"
    }],
    staticClass: "dx-msgbox-wrapper"
  }, [_c('div', {
    class: [_vm.customBoxClasses]
  }, [(_vm.showHeader) ? _c('div', {
    staticClass: "clearfix",
    class: [_vm.titleClasses]
  }, [(_vm.title) ? _c('span', {
    staticClass: "dx-msgbox__header--title"
  }, [_vm._v(_vm._s(_vm.title))]) : _vm._e(), _vm._v(" "), (_vm.showClose) ? _c('span', {
    staticClass: "dx-msgbox__header--close",
    on: {
      "click": function($event) {
        _vm.handleAction('cancel')
      }
    }
  }, [_vm._v("\n\t\t\t\t\tx\n\t\t\t\t")]) : _vm._e()]) : _vm._e(), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.message !== ''),
      expression: "message !== ''"
    }],
    class: [_vm.contentClasses]
  }, [_vm._t("default", [_c('p', [_vm._v(_vm._s(_vm.message))])])], 2), _vm._v(" "), (_vm.showBtns) ? _c('div', {
    class: [_vm.buttonClasses, {
      'is-center': _vm.center
    }]
  }, [(_vm.showConfirm) ? _c('dx-button', {
    class: [_vm.confirmButtonClasses],
    attrs: {
      "type": "primary",
      "size": "small"
    },
    on: {
      "dx-button-click": function($event) {
        _vm.handleAction('confirm')
      }
    }
  }, [_vm._v("\n\t\t\t\t\t" + _vm._s(_vm.confirmBtnText) + "\n\t\t\t\t")]) : _vm._e(), _vm._v(" "), (_vm.showCancel) ? _c('dx-button', {
    class: [_vm.cancelButtonClasses],
    attrs: {
      "size": "small"
    },
    on: {
      "dx-button-click": function($event) {
        _vm.handleAction('cancel')
      }
    }
  }, [_vm._v("\n\t\t\t\t\t" + _vm._s(_vm.cancelBtnText) + "\n\t\t\t\t")]) : _vm._e()], 1) : _vm._e()]), _vm._v(" "), (_vm.modal) ? _c('div', {
    staticClass: "dx-msgbox-wrapper--mask",
    on: {
      "click": function($event) {
        _vm.handleAction('cancel')
      }
    }
  }) : _vm._e()])])
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

/***/ 7:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export trim */
/* unused harmony export hasOwn */
/* harmony export (immutable) */ __webpack_exports__["b"] = isVNode;
/* unused harmony export throttle */
/* unused harmony export loadImageAsync */
/* harmony export (immutable) */ __webpack_exports__["c"] = merge;
/* unused harmony export contains */
/* unused harmony export hasClass */
/* unused harmony export addClass */
/* unused harmony export removeClass */
function trim(string) {
    return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '')
}

function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key)
}

// 判断是否为节点
function isVNode(node) {
    return typeof node === 'object' && hasOwn(node, 'componentOptions')
}

// 节流函数
function throttle(action, delay) {
    let timeout = null
    let lastRun = 0
    return function() {
        if (timeout) {
            return
        }
        let elapsed = Date.now() - lastRun
        let context = this
        let args = Array.prototype.slice.call(arguments)
        let runCallback = function() {
            lastRun = Date.now()
            timeout = null
            action.apply(context, args)
        }
        if (elapsed >= delay) {
            runCallback()
        } else {
            timeout = setTimeout(runCallback, delay)
        }
    }
}

// 异步加载图片

function loadImageAsync(src, resolve, reject) {
    let image = new Image()
    image.src = src

    image.onload = function() {
        resolve({
            naturalHeight: image.naturalHeight, // 图片的原始大小与图片设置的大小无关
            naturalWidth: image.naturalWidth,
            src: image.src
        })
    }

    image.onerror = function(e) {
        reject(e)
    }
}
// 注册及删除监听事件
const on = (function() {
    if (document.addEventListener) {
        return function(el, event, handler) {
            el.addEventListener(event, handler, false)
        }
    } else if (document.attachEvent) {
        return function(el, event, handler) {
            el.attachEvent('on' + event, handler)
        }
    } else {
        return function(el, event, handler) {
            el[on + 'event'] = handler
        }
    }
})()
const off = (function() {
    if (document.removeEventListener) {
        return function(el, event, handler) {
            el.removeEventListener(event, handler, false)
        }
    } else if (document.detachEvent) {
        return function(el, event, handler) {
            el.detachEvent('on' + event, handler)
        }
    } else {
        return function(el, event, handler) {
            el[on + 'event'] = null
        }
    }
})()

// 注册函数
const _ = {
    on,
    off
}
/* harmony export (immutable) */ __webpack_exports__["a"] = _;

// 合并对象,并没有考虑深层次的情况
function merge(obj = {}, ...args) {
    for (let i = 0, len = args.length; i < len; i++) {
        let tempObj = args[i]
        if (tempObj) {
            for (let prop in tempObj) {
                if (tempObj.hasOwnProperty(prop)) {
                    obj[prop] = tempObj[prop]
                }
            }
        }
    }
    return obj
}

function contains(parentEl, el, container) {
    // 第一个节点是否包含第二个节点
    // contains 方法支持情况：chrome+ firefox9+ ie5+, opera9.64+(估计从9.0+),safari5.1.7+
    if (parentEl === el) {
        return true
    }
    if (!el || !el.nodeType || el.nodeType !== 1) {
        return false
    }
    if (parentEl.contains) {
        return parentEl.contains(el)
    }
    if (parentEl.compareDocumentPosition) {
        return !!(parentEl.compareDocumentPosition(el) & 16)
    }
    var prEl = el.parentNode
    while (prEl && prEl !== container) {
        if (prEl === parentEl) {
            return true
        }
        prEl = prEl.parentNode
    }
    return false
}
function hasClass(el, cls) {
    if (!el || !cls) return false
    if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.')
    if (el.classList) {
        return el.classList.contains(cls)
    } else {
        return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1
    }
};

function addClass(el, cls) {
    if (!el) return
    var curClass = el.className
    var classes = (cls || '').split(' ')

    for (var i = 0, j = classes.length; i < j; i++) {
        var clsName = classes[i]
        if (!clsName) continue

        if (el.classList) {
            el.classList.add(clsName)
        } else if (!hasClass(el, clsName)) {
            curClass += ' ' + clsName
        }
    }
    if (!el.classList) {
        el.className = curClass
    }
};

/* istanbul ignore next */
function removeClass(el, cls) {
    if (!el || !cls) return
    var classes = cls.split(' ')
    var curClass = ' ' + el.className + ' '

    for (var i = 0, j = classes.length; i < j; i++) {
        var clsName = classes[i]
        if (!clsName) continue

        if (el.classList) {
            el.classList.remove(clsName)
        } else if (hasClass(el, clsName)) {
            curClass = curClass.replace(' ' + clsName + ' ', ' ')
        }
    }
    if (!el.classList) {
        el.className = trim(curClass)
    }
}

/***/ })

/******/ });