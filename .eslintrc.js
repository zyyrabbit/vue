// https://eslint.org/docs/user-guide/configuring

module.exports = {
    //将 ESLint 限制到一个特定的项目
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 6
    },
    env: {
        es6: true,
        commonjs: true,
        mocha: true,
        browser: true
    },
    //导入共享配置
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    extends: 'standard',
    // required to lint *.vue files
    plugins: [
        'html'
    ],
    // add your custom rules here
    rules: {
        'no-tabs': 0,
        'indent': 0,
        // allow paren-less arrow functions
        'arrow-parens': 0,
        'block-spacing': 0,
        'keyword-spacing': 0,
        'comma-spacing': 0,
        "space-infix-ops": 0,//中缀操作符周围要不要有空格
        "semi-spacing": [0, {"before": false, "after": true}],//分号前后空格
        "space-before-blocks": [0, "always"],//不以新行开始的块{前面要不要有空格
        // allow async-await
        'generator-star-spacing': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        "space-before-function-paren": ["error", "never"]
    }
}