// 采用策略模式
// 正确返回字符串的长度---1.可以采用Array.from方法 或 使用正则表达式
const caluStrLen = (str) => { return str.replace(/[^\x00-\xff]/g, 'aa').length }

export default {
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
}
