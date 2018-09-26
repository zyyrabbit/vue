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
/******/ 	return __webpack_require__(__webpack_require__.s = 140);
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

/***/ 140:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dx_notify_vue__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dx_notify_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__dx_notify_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_utils_js__ = __webpack_require__(7);



// 构建构造函数
const NotifyConstructor = __WEBPACK_IMPORTED_MODULE_0_vue___default.a.extend(__WEBPACK_IMPORTED_MODULE_1__dx_notify_vue___default.a)
let instance
let key = 'dx-notify-message'
let msgId = 0
const autoClose = message => {
	// 标识不会自动关闭
	if (message.duration === 0) {
		return null
	}
	return setTimeout(() => {
		instance.close(message)
	}, message.duration || 8000)
}
// 初始化一个全局消息通知实例
const initInstance = () => {
	let mountEl = document.createElement('div')
	instance = new NotifyConstructor({
		el: mountEl
	})
}
// 打开弹窗
const Notify = message => {
	if (!instance) {
		initInstance()
	}
	let _message = Object(__WEBPACK_IMPORTED_MODULE_2__utils_utils_js__["c" /* merge */])({}, message)
	_message.key = key + msgId++
	_message.index = instance.msgQueue.length
	_message.timer = autoClose(_message)
	if (Object(__WEBPACK_IMPORTED_MODULE_2__utils_utils_js__["b" /* isVNode */])(_message.content)) {
		instance.$slots[_message.key] = [_message.content]
		_message.content = null
		instance.content = null
	}
	instance.msgQueue.push(_message)
    // 设置挂载元素
    document.body.appendChild(instance.$el)
}
/* harmony default export */ __webpack_exports__["default"] = (Notify);


/***/ }),

/***/ 141:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(142)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(144),
  /* template */
  __webpack_require__(145),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 142:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(143);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("5070de56", content, true);

/***/ }),

/***/ 143:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.dx-notify{position:fixed;bottom:1rem;right:0;z-index:99999;font-size:1.5rem;color:#666\n}\n.dx-notify__msg-list{width:30rem;height:8rem;border-radius:0.6rem;box-shadow:1px 1px 1rem #ccc;margin-right:1rem;margin-top:2rem;padding:1rem 2rem;background:#fff;transition:all 1s\n}\n.dx-notify__msg-list--title{font-weight:700;color:#000;padding-bottom:0.5rem\n}\n.dx-notify__msg-list--close{font-weight:400;float:right;color:#aaa;font-size:1.8rem;cursor:pointer\n}\n.msg-list-enter{-ms-transform:translateY(8rem);transform:translateY(8rem)\n}\n.msg-list-leave-to{opacity:0;z-index:-1\n}\n.msg-list-leave-active{position:absolute;right:0\n}\n", ""]);

// exports


/***/ }),

/***/ 144:
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

exports.default = {
	data: function data() {
		return {
			// 消息队列
			msgQueue: []
		};
	},

	methods: {
		close: function close(message) {
			if (message.timer) {
				clearTimeout(message.timer);
				message.timer = null;
			}
			for (var i = message.index + 1; i < this.msgQueue.length; i++) {
				this.msgQueue[i].index--;
			}
			this.msgQueue.splice(message.index, 1);
		}
	}
};

/***/ }),

/***/ 145:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "dx-notify"
  }, [_c('transition-group', {
    attrs: {
      "name": "msg-list",
      "tag": "ul",
      "mode": "out-in"
    }
  }, _vm._l((_vm.msgQueue), function(msg, index) {
    return _c('li', {
      key: msg.key,
      staticClass: "dx-notify__msg-list"
    }, [_c('p', {
      staticClass: "dx-notify__msg-list--title"
    }, [_c('span', [_vm._v(_vm._s(msg.title))]), _vm._v(" "), _c('span', {
      staticClass: "dx-notify__msg-list--close",
      on: {
        "click": function($event) {
          _vm.close(msg)
        }
      }
    }, [_vm._v(" \n\t\t     \t\t\tx\n\t\t     \t\t")])]), _vm._v(" "), _c('p', {
      staticClass: "dx-notify__msg-list--message"
    }, [_vm._t(msg.key, [_vm._v("\n\t\t\t\t\t\t" + _vm._s(msg.content) + "\n\t\t\t\t\t")])], 2)])
  }))], 1)
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