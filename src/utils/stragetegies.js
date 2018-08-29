// 采用策略模式
// 正确返回字符串的长度---1.可以采用Array.from方法 或 使用正则表达式
const caluStrLen = (str) => { return str.replace(/[^\x00-\xff]/g, 'aa').length }

export default {
    // args值为单个rule对象
	required: (rule, value, callback) => {
        if (value === '') {
            callback && typeof callback === 'function' && callback()
            return true
        }
        return false
     },
    minLength: (rule, value, callback) => {
        if (caluStrLen(value) < rule.min) {
             callback && typeof callback === 'function' && callback()
            return true
        }
        return false
    },
    maxLength: (rule, value, callback) => {
        if (caluStrLen(value) > rule.max) {
            callback && typeof callback === 'function' && callback()
            return true
        }
        return false
    },
    isMobile: (rule, value, callback) => {
        if (!/^1[34578][0-9]{9}$/.test(+value)) {
            return true
        }
         callback && typeof callback === 'function' && callback()
        return false
    },
    confirmSame: (rule, value, callback) => {
        if (value !== rule.sameFieldValue) {
            callback && typeof callback === 'function' && callback()
            return true
        }
        return false
    },
    // 判断输入是否为中文、字母，数字，下划线
    isNumAndCharAnd_: (rule, value, callback) => {
        if (!/^[\w_]|[\u4E00-\u9FA5]*$/.test(value)) {
            callback && typeof callback === 'function' && callback()
            return true
        }
        return false
    }
}
