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
/******/ 	return __webpack_require__(__webpack_require__.s = 213);
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

/***/ 213:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dx_carousel_vue__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dx_carousel_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__dx_carousel_vue__);


/* istanbul ignore next */
__WEBPACK_IMPORTED_MODULE_0__dx_carousel_vue___default.a.install = function(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__dx_carousel_vue___default.a.name, __WEBPACK_IMPORTED_MODULE_0__dx_carousel_vue___default.a)
}

/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__dx_carousel_vue___default.a);


/***/ }),

/***/ 214:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(215)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(217),
  /* template */
  __webpack_require__(218),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 215:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(216);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("14c1e5e2", content, true);

/***/ }),

/***/ 216:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.dx-carousel{background-color:#aaa;position:relative;overflow:hidden\n}\n.dx-carousel--animate{transition:0.5s\n}\n.dx-carousel__content{position:absolute\n}\n.dx-carousel__content--inner{width:100%;height:100%\n}\n.dx-carousel__content--pre{background-color:#99a9bf\n}\n.dx-carousel__content--mid{background-color:#d3dce6\n}\n.dx-carousel__content--next{background-color:#666666\n}\n.dx-carousel--btn{width:4rem;height:4rem;position:absolute;top:50%;-ms-transform:translateY(-50%);transform:translateY(-50%);border:none;outline:none;padding:0;margin:0;cursor:pointer;transition:.1s;border-radius:50%;background-color:rgba(31,45,61,0.3);color:#fff;z-index:0;text-align:center;font-size:1.2rem\n}\n.dx-carousel--left-btn{left:10%\n}\n.dx-carousel--right-btn{right:10%\n}\n.dx-carousel__labels{position:absolute;bottom:10%;left:50%;-ms-transform:translateX(-50%);transform:translateX(-50%);opacity:.48;border-radius:0.8rem\n}\n.dx-carousel__labels--item{float:left;margin:0 1rem\n}\n.dx-carousel__labels--item-btn{width:1.5rem;height:1.5rem;display:block;border-radius:50%;background-color:#fff;border:none;outline:none;padding:0;margin:0;cursor:pointer;transition:.1s\n}\n.dx-carousel__labels--item-btn.is-active{background-color:red\n}\n", ""]);

// exports


/***/ }),

/***/ 217:
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
	name: 'DxCarousel',
	componentName: 'DxCarousel',
	props: {
		background: Boolean,
		height: String,
		width: String,
		imageUrls: {
			type: Array, // 轮播图片的地址数组数据
			default: function _default() {
				return [];
			}
		},
		timeInterval: {
			type: Number,
			default: 3000
		}
	},
	data: function data() {
		return {
			activeInd: 0, // 指示活动图片的index
			// pre容器的对象数据
			pre: {
				translateX: '-100%',
				imgSrc: ''
			},
			mid: {
				translateX: '0',
				imgSrc: ''
			},
			next: {
				translateX: '100%',
				imgSrc: ''
			},
			enableTransition: true, // 是否暂时关闭动画
			timer: null, // 定时器
			hover: false, // 鼠标移动到容器元素，是否显示点击按钮
			animating: false // 标志是否处于动画中,主要用来限制点击的次数
		};
	},

	computed: {
		/* 设置轮播图片的大小 */
		itemsSize: function itemsSize() {
			return {
				height: this.height,
				width: this.width
			};
		},
		imageNum: function imageNum() {
			return this.imageUrls.length;
		}
	},
	mounted: function mounted() {
		var _this = this;

		// 初始化轮播图片地址
		this.showImg(this.imageNum - 1, this.activeInd, this.activeInd + 1);
		this.timer = setInterval(function () {
			_this.translate('left');
		}, this.timeInterval);
	},

	methods: {
		/* 赋值相应的图片url */
		showImg: function showImg(preInd, midInd, nextInd) {
			this.pre.imgSrc = this.imageUrls[preInd];
			this.mid.imgSrc = this.imageUrls[midInd];
			this.next.imgSrc = this.imageUrls[nextInd];
		},

		/* 计算轮播图片的位置 */
		calculPosition: function calculPosition() {
			if (this.activeInd === this.imageNum - 1) {
				this.showImg(this.activeInd - 1, this.activeInd, 0);
			} else if (this.activeInd === 0) {
				this.showImg(this.imageNum - 1, this.activeInd, this.activeInd + 1);
			} else {
				this.showImg(this.activeInd - 1, this.activeInd, this.activeInd + 1);
			}
			this.animating = false;
		},

		/* 处理鼠标移入事件 */
		handleMouseEnter: function handleMouseEnter() {
			this.hover = true;
			this.pauseTimer();
		},

		/* 处理鼠标移出事件 */
		handleMouseLeave: function handleMouseLeave() {
			this.hover = false;
			this.startTimer();
		},
		startTimer: function startTimer() {
			var _this2 = this;

			this.timer = setInterval(function () {
				_this2.translate('left');
			}, 3000);
		},
		pauseTimer: function pauseTimer() {
			clearTimeout(this.timer);
			this.timer = null;
		},
		preClick: function preClick() {
			if (!this.animating) {
				this.translate('left');
			}
		},
		nextClick: function nextClick() {
			if (!this.animating) {
				this.translate('right');
			}
		},
		translate: function translate(dir, activeInd) {
			var _this3 = this;

			// 启动动画
			this.enableTransition = true;
			this.animating = true;
			if (dir === 'left') {
				this.pre.translateX = parseInt(this.pre.translateX) - 100 + '%';
				this.mid.translateX = parseInt(this.mid.translateX) - 100 + '%';
				this.next.translateX = parseInt(this.next.translateX) - 100 + '%';
				setTimeout(function () {
					// 暂时关闭动画移动
					_this3.enableTransition = false;
					// 让代码pre,mid,next元素复原
					_this3.pre.translateX = _this3.mid.translateX;
					_this3.mid.translateX = _this3.next.translateX;
					_this3.next.translateX = '100%';
					_this3.activeInd = activeInd || activeInd === 0 ? activeInd : (_this3.activeInd + 1) % _this3.imageNum;
					_this3.calculPosition();
				}, 500);
			} else if (dir === 'right') {
				this.pre.translateX = parseInt(this.pre.translateX) + 100 + '%';
				this.mid.translateX = parseInt(this.mid.translateX) + 100 + '%';
				this.next.translateX = parseInt(this.next.translateX) + 100 + '%';
				setTimeout(function () {
					_this3.enableTransition = false;
					_this3.next.translateX = _this3.mid.translateX;
					_this3.mid.translateX = _this3.pre.translateX;
					_this3.pre.translateX = '-100%';
					_this3.activeInd = activeInd || activeInd === 0 ? activeInd : (_this3.activeInd + _this3.imageNum - 1) % _this3.imageNum;
					_this3.calculPosition();
				}, 500);
			}
		},

		/* 指示器点击事件处理 */
		btnClick: function btnClick(index) {
			if (index !== this.activeInd && !this.animating) {
				// 判断指示的位置与当前active图片的index
				if (index > this.activeInd) {
					this.next.imgSrc = this.imageUrls[index];
					this.translate('left', index);
				} else {
					this.pre.imgSrc = this.imageUrls[index];
					this.translate('right', index);
				}
			}
		}
	}
};

/***/ }),

/***/ 218:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "dx-carousel",
    style: ({
      height: _vm.height,
      width: _vm.width
    }),
    on: {
      "mouseenter": function($event) {
        $event.stopPropagation();
        _vm.handleMouseEnter()
      },
      "mouseleave": function($event) {
        $event.stopPropagation();
        _vm.handleMouseLeave()
      }
    }
  }, [_c('div', {
    staticClass: "dx-carousel__content",
    class: {
      'dx-carousel--animate': _vm.enableTransition
    },
    style: ([{
      transform: ("translateX(" + (_vm.pre.translateX) + ")")
    }, _vm.itemsSize])
  }, [(_vm.background) ? _c('div', {
    staticClass: "dx-carousel__content--inner dx-carousel__content--inner--pre",
    style: ({
      background: ("url(" + (_vm.pre.imgSrc) + ")")
    })
  }) : _c('img', {
    attrs: {
      "src": _vm.pre.imgSrc
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "dx-carousel__content",
    class: {
      'dx-carousel--animate': _vm.enableTransition
    },
    style: ([{
      transform: ("translateX(" + (_vm.mid.translateX) + ")")
    }, _vm.itemsSize])
  }, [(_vm.background) ? _c('div', {
    staticClass: "dx-carousel__content--inner dx-carousel__content--inner--mid",
    style: ({
      background: ("url(" + (_vm.mid.imgSrc) + ")")
    })
  }) : _c('img', {
    attrs: {
      "src": _vm.mid.imgSrc
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "dx-carousel__content",
    class: {
      'dx-carousel--animate': _vm.enableTransition
    },
    style: ([{
      transform: ("translateX(" + (_vm.next.translateX) + ")")
    }, _vm.itemsSize])
  }, [(_vm.background) ? _c('div', {
    staticClass: "dx-carousel__content--inner dx-carousel__content--inner--next",
    style: ({
      background: ("url(" + (_vm.next.imgSrc) + ")")
    })
  }) : _c('img', {
    attrs: {
      "src": _vm.next.imgSrc
    }
  })]), _vm._v(" "), _c('button', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.hover),
      expression: "hover"
    }],
    staticClass: "dx-carousel-left--btn  dx-carousel--btn",
    on: {
      "click": function($event) {
        _vm.nextClick()
      }
    }
  }, [_c('i', {
    staticClass: "icon iconfont dx-prev"
  })]), _vm._v(" "), _c('button', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.hover),
      expression: "hover"
    }],
    staticClass: "dx-carousel--right-btn  dx-carousel--btn",
    on: {
      "click": function($event) {
        _vm.preClick()
      }
    }
  }, [_c('i', {
    staticClass: "icon iconfont dx-next"
  })]), _vm._v(" "), _c('div', [_c('ul', {
    staticClass: "dx-carousel__labels clearfix"
  }, _vm._l((_vm.imageNum), function(item, index) {
    return _c('li', {
      key: index,
      staticClass: "dx-carousel__labels--item",
      on: {
        "click": function($event) {
          _vm.btnClick(index)
        }
      }
    }, [_c('button', {
      staticClass: "dx-carousel__labels--item-btn",
      class: {
        'is-active': index === _vm.activeInd
      }
    })])
  }))])])
},staticRenderFns: []}

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


/***/ })

/******/ });