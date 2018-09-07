// 根据输入重复次数，输出相应字符串
const repeatN = (str, n = 0) => {
    let res = ''
    while (n) {
        if (n % 2 === 1) { res += str };
        if (n > 1) { str += str };
        n >>= 1
    }
    return res
}
const genWrapTag = (str, tag, endFlage, text, n) => {
    let blankNum = repeatN('&nbsp&nbsp&nbsp', n)
    // 需要判断是否为
    return text ? `<${tag} class="hljs-tag">${blankNum}${str}</${tag}>` :
        `<${tag} class="hljs-tag">${blankNum}&lt${endFlage}${str}&gt</${tag}>`
}
// 用于字符串匹配栈
const matchTags = []
matchTags.push('-1')

// 正则表达式,用于匹配格式化<template>代码
// 字符串空格
let regTagContent = /<.+?>|(\S[^<>]+)/g // 非贪婪模式
let regGetTag = /(\w[\w-_]+)\s*/

const formatHtmlCode = str => {
    // str = blankSpace(str);
    let parseRes = ''
    let startTag
    let tag
    let endTagflag
    str.replace(regTagContent, (s, m) => {
        s = s && s.trim()
        m = m && m.trim()

        // 如果v存在，说明为标签之间的文本匹配
        if (m) {
            parseRes += genWrapTag(m, 'div', '', true, Math.max(matchTags.length - 1, 0))
        } else if (s) {
            // 去掉<>
            s = s.slice(1, -1)
            // 判断是否为tag闭合，即判断是否含有/
            endTagflag = /\//.test(s)
            startTag = matchTags.pop()
            tag = s.match(regGetTag)[1]
            if (endTagflag && startTag === tag) {
                parseRes += genWrapTag(tag, 'div', '/', false, Math.max(matchTags.length - 1, 0))
            } else {
                matchTags.push(startTag)
                matchTags.push(tag)
                parseRes += genWrapTag(s, 'div', '', false, Math.max(matchTags.length - 2, 0))
            }
        }
    })
    if (matchTags.length > 1) {
        console.error('输入模板不匹配！')
        return ''
    }
    return parseRes
}
// 正则表达式,用于匹配格式化<script><style>代码
let regContent = /.+/g
const genWrapSptAndStyTag = (str, tag, n) => {
    let blankNum = repeatN('&nbsp&nbsp&nbsp', n)
    // 需要判断是否为
    return `<${tag} class="hljs-tag">${blankNum}${str}</${tag}>`
}
const formatSptAndStyCode = (str) => {
    let parseRes = ''
    let startTag
    let tag
    let nextTag
    let preLen
    let len
    let blankNum
    parseRes += genWrapSptAndStyTag('&ltscript&gt', 'div', 0)

    str.replace(regContent, (s) => {
        // 过滤掉<>
        s = s.trim()
        // 全局匹配
        tag = s.match(/[{}]/g)
        blankNum = matchTags.length
        if (tag) {
            preLen = len = tag.length
            while (len > 0) {
                nextTag = tag.shift()
                startTag = matchTags.pop()
                if (startTag !== '{' || nextTag !== '}') {
                    matchTags.push(startTag)
                    matchTags.push(nextTag)
                }
                len--
            }
        }
        // 暂时解决{}空格不匹配的问题
        if (preLen === 1 && nextTag === '}') { blankNum -= 1 }
        parseRes += genWrapSptAndStyTag(s, 'div', blankNum)
    })
    if (matchTags.length > 1) {
        console.error('输入模板不匹配！', matchTags)
        return ''
    }
    parseRes += genWrapSptAndStyTag('&lt/script&gt', 'div', 0)
    return parseRes
}
// 包装输出
const matchMethods = {
    formatHtmlCode: formatHtmlCode,
    formatSptAndStyCode: formatSptAndStyCode
}
const formatCode = (matchType, str) => {
    return matchMethods[matchType](str)
}
export default formatCode
