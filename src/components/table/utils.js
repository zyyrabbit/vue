export const orderBy = function(array, sortProp, reverse, sortMethod) {
	// 判断array是否为数组，且数组是否为空
	if (!Array.isArray(array) || array.length === 0) {
		return array
	}
	if (typeof reverse === 'string') {
		reverse = reverse === 'descending' ? -1 : 1
	}
	if (!sortProp) {
		return array
	}
	// 排序的顺序
    const order = reverse && reverse === -1 ? -1 : 1
    let _sort = (a, b, sortProp) => {
		return a[sortProp] === b[sortProp] ? 0 : a[sortProp] > b[sortProp] ? order : -order
    }
    if (sortMethod && typeof sortMethod === 'function') {
		_sort = (a, b, sortProp) => {
			return sortMethod(a, b, sortProp) ? order : -order
		}
    }
	// 数组排序方法
	return array.slice().sort(function(a, b) {
		return _sort(a, b, sortProp)
	})
}
