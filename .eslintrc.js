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
        // allow async-await
        'generator-star-spacing': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        "space-before-function-paren": ["error",{
            "anonymous": "never",
            "named": "never",
            "asyncArrow": "always"
        }]
    }
}