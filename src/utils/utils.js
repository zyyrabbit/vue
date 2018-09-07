const trim = function(string) {
    return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '')
}
export function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key)
}
// 判断是否为节点
export function isVNode(node) {
    return typeof node === 'object' && hasOwn(node, 'componentOptions')
}

// 节流函数
export function throttle(action, delay) {
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

export function loadImageAsync(src, resolve, reject) {
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
export const _ = {
    on,
    off
}
// 合并对象,并没有考虑深层次的情况
export function merge(obj = {}, ...args) {
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

export function contains(parentEl, el, container) {
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
export function hasClass(el, cls) {
    if (!el || !cls) return false
    if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.')
    if (el.classList) {
        return el.classList.contains(cls)
    } else {
        return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1
    }
};

export function addClass(el, cls) {
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
export function removeClass(el, cls) {
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
};