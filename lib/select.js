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
/******/ 	return __webpack_require__(__webpack_require__.s = 88);
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

/***/ }),

/***/ 88:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dx_select_vue__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dx_select_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__dx_select_vue__);


/* istanbul ignore next */
__WEBPACK_IMPORTED_MODULE_0__dx_select_vue___default.a.install = function(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__dx_select_vue___default.a.name, __WEBPACK_IMPORTED_MODULE_0__dx_select_vue___default.a)
}

/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__dx_select_vue___default.a);


/***/ }),

/***/ 89:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(90)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(92),
  /* template */
  __webpack_require__(94),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 90:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(91);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("487cdade", content, true);

/***/ }),

/***/ 91:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.dx-select{position:relative;font-size:1.6rem;z-index:1;display:inline-block;min-width:6rem;max-width:20rem\n}\n.dx-select__content{position:relative\n}\n.dx-select__input--origin{padding-left:1rem;width:100%;border:0.1rem solid #b3b3b3;font-size:1.6rem;background-color:#fff;line-height:3rem;border-radius:0.5rem;cursor:pointer\n}\n.dx-select__input--ind{position:absolute;top:50%;-ms-transform:translateY(-50%);transform:translateY(-50%);right:1rem;color:#aaa\n}\n.dx-select__ul{position:absolute;margin-top:0.3rem;width:100%;cursor:pointer;background-color:#fff;z-index:999;font-size:1.5rem;color:#a3a3a3;border-radius:0.2rem;box-shadow:0 0 0.3rem #aaa;padding:0;text-align:left\n}\n.dx-select__ul--li{padding:0.5rem 0rem 0.5rem 1rem;list-style:none\n}\n.dx-select__ul--li:hover{color:#666;background-color:#eee\n}\n.dx-select__ul--li.is-selected{color:#666\n}\n", ""]);

// exports


/***/ }),

/***/ 92:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _clickoutside = __webpack_require__(93);

var _clickoutside2 = _interopRequireDefault(_clickoutside);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	name: 'DxSelect',
	directives: { clickoutside: _clickoutside2.default },
	props: {
		items: Array, // 传入的数据
		labelKey: String, // 传入的数组元素为对象时标签键值
		valueKey: String, // 传入的数组元素为对象时实际选择的键值
		value: {}, // select组件绑定的父组件值
		readonly: { // 是否为只读，默认为禁止
			type: Boolean,
			default: true
		},
		onSelect: Function, // 数据选择后的回调函数，为option选项值
		placeholder: String,
		remote: Boolean, // 是否为远程加载数据显示标志
		remoteMethod: Function // 如果设置为从服务器端加载，则为回调函数，回调值
	},
	data: function data() {
		return {
			isShow: false,
			selecteIndex: '-1',
			selectLabel: this.value
		};
	},

	computed: {
		// 判断items是否为对象数组或原生数组
		isObject: function isObject() {
			var isObject = Object.prototype.toString.call(this.items[0]).toLowerCase() === '[object object]';
			// 如果输入items是对象数组，则进行一些检查
			if (isObject) {
				if (this.labelKey && this.valueKey) {
					if (typeof this.items[0][this.labelKey] === 'undefined' || typeof this.items[0][this.valueKey] === 'undefined') {
						throw new Error('The label-key and label-vlaue attrs not find in items[0] object!');
					}
				} else {
					throw new Error('If the items is object array,the label-key and label-vlaue attrs is reuqired!');
				}
			}
			return isObject;
		}
	},
	methods: {
		closeItems: function closeItems() {
			this.isShow = false;
		},
		openItems: function openItems() {
			this.isShow = true;
		},
		// 选择列表时的处理函数,采用代理函数
		selectItem: function selectItem($event) {
			var item = void 0,
			    selectValue = void 0;
			// 取选择的item上index
			this.selecteIndex = parseInt($event.target.getAttribute('data-index'));
			// 根据index取得相应的item
			item = this.items[this.selecteIndex];
			// 根据items中的数据类型取相应的值
			selectValue = this.isObject ? item[this.valueKey] : item;
			this.selectLabel = this.isObject ? item[this.labelKey] : item;
			this.$emit('input', item);
			this.onSelect && this.onSelect(item);
			this.closeItems();
		}
	}
}; //
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

/***/ }),

/***/ 93:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_utils_js__ = __webpack_require__(7);
// 导入注册函数

// 存储所有的添加该指令的元素数组
const nodeList = []
const ctx = '@@@clickoutsideContext' // ctx应该是内容扩展的缩写
let startClick = null
// 在document上注册监听函数
// 这里event,target是不是考虑兼容性？
__WEBPACK_IMPORTED_MODULE_0__utils_utils_js__["a" /* _ */].on(document, 'mousedown', event => (startClick = event))
__WEBPACK_IMPORTED_MODULE_0__utils_utils_js__["a" /* _ */].on(document, 'mouseup', event => {
	nodeList.forEach((node) => { node[ctx].handler(event, startClick) })
})

/* harmony default export */ __webpack_exports__["default"] = ({
	// 只执行一次，指令第一次绑定到元素时，执行初始化操作,el挂载元素
	bind: function(el, binding, vnode) {
		let id = nodeList.push(el) - 1
		// 实际上是一个闭包利用
		const handler = function(mouseup = {}, mousedown = {}) {
			if (!vnode.context ||
				!mouseup.target ||
				!mousedown.target ||
				el.contains(mouseup.target) ||
				el.contains(mousedown.target) ||
				el === mouseup.target ||
				// 不知道为什么加这个判断？
				(vnode.context.popperElm &&
				(vnode.context.popperElm.contains(mouseup.target) ||
					vnode.context.popperElm.contains(mousedown.target)))) {
				return
			}
			// 不理解？
			if (binding.expression && el[ctx].methodName && vnode.context[el[ctx].methodName]) {
				vnode.context[el[ctx].methodName]()
			} else {
				el[ctx].bindingFn && el[ctx].bindingFn()
			}
		}
		el[ctx] = {
			id,
			methodName: binding.expression,
			handler,
			bindingFn: binding.value
		}
	},
	update: function(el, binding, vnode) {
		el[ctx].methodName = binding.expression
		el[ctx].bindingFn = binding.value
	},
	// 只执行一次，解绑指令时
	unbind: function(el, binding, vnode) {
		for (let i = 0, len = nodeList.length; i < len; i++) {
			if (nodeList[i][ctx].id === el[ctx].id) {
				nodeList.splice(i, 1)
				break
			}
		}
	}
});


/***/ }),

/***/ 94:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "dx-select"
  }, [_c('div', {
    directives: [{
      name: "clickoutside",
      rawName: "v-clickoutside",
      value: (_vm.closeItems),
      expression: "closeItems"
    }],
    staticClass: "dx-select__content"
  }, [_c('div', {
    staticClass: "dx-select__input",
    on: {
      "click": function($event) {
        $event.stopPropagation();
        return _vm.openItems($event)
      }
    }
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.selectLabel),
      expression: "selectLabel"
    }],
    staticClass: "dx-select__input--origin",
    attrs: {
      "readonly": _vm.readonly,
      "type": "text",
      "placeholder": _vm.placeholder
    },
    domProps: {
      "value": (_vm.selectLabel)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.selectLabel = $event.target.value
      }
    }
  }), _vm._v(" "), _c('i', {
    staticClass: "icon iconfont dx-select__input--ind",
    class: [_vm.isShow ? 'dx-down' : 'dx-left'],
    attrs: {
      "aria-hidden": "true"
    }
  })]), _vm._v(" "), _c('ul', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.isShow),
      expression: "isShow"
    }],
    staticClass: "dx-select__ul",
    on: {
      "click": function($event) {
        _vm.selectItem($event)
      }
    }
  }, _vm._l((_vm.items), function(item, index) {
    return _c('li', {
      key: index,
      staticClass: "dx-select__ul--li",
      class: {
        'is-selected': index === _vm.selecteIndex
      },
      attrs: {
        "data-index": index
      }
    }, [_vm._v("\n\t\t\t\t" + _vm._s(_vm.isObject ? item[_vm.labelKey] : item) + "\n\t\t\t")])
  }))])])
},staticRenderFns: []}

/***/ })

/******/ });