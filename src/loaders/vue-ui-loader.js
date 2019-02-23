const keyStr = '\\{((?:(?:\\s*Dx[^,\\s]+)(?:,|\\s)*)+)\\}'
const getKeysRep = new RegExp(keyStr)
const onDemandLoadStr = `import\\s+${keyStr}\\s+from\\s+'dx-vue-ui'`
const onDemandLoadReg = new RegExp(onDemandLoadStr, 'g')
/**
 * loader Function
 * @param {String} content 文件内容
 */
module.exports = function(content) {
    content = content.replace(onDemandLoadReg, function(matchStr) {
        // 得到组件的keys
        let keys = matchStr.match(getKeysRep)[1]
        // 去除空格
        keys = keys && keys.replace(/\s*/g, function() {
            return ''
        }).split(',')
        // 遍历构造字符串
        let converterLoads = []
        converterLoads.push(`import 'dx-vue-ui/lib/style/index.css'`)
        keys.forEach(key => {
            let fileName = key.slice(2).replace(/([^^])([A-Z])/g, '$1-$2').toLowerCase()
            converterLoads.push(`import ${key} from 'dx-vue-ui/lib/${fileName}.js'`)
        })
        return converterLoads.join('\n')
    })
    this.callback(null, content)
}
