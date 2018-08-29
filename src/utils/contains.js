 const contains = function (parentEl, el, container) {
         // 第一个节点是否包含第二个节点
                //contains 方法支持情况：chrome+ firefox9+ ie5+, opera9.64+(估计从9.0+),safari5.1.7+
             if (parentEl == el) {
                 return true;
             }
             if (!el || !el.nodeType || el.nodeType != 1) {
                 return false;
             }
             if (parentEl.contains ) {
                 return parentEl.contains(el);
             }
             if ( parentEl.compareDocumentPosition ) {
                 return !!(parentEl.compareDocumentPosition(el) & 16);
             }
             var prEl = el.parentNode;
             while(prEl && prEl != container) {
                 if (prEl == parentEl)
                     return true;
                 prEl = prEl.parentNode;
             }
             return false;
         };
export default contains;