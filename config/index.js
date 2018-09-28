// 项目地址及打包路径配置文件
const path = require('path')
const BASE_PATH = path.join(path.resolve(__dirname, '../'))

module.exports = {
    HTML_PATH: path.join(BASE_PATH, 'src/index.html'), // Html页面模板路径
    STYLE_PATH: 'styles/',
    SCRIPT_PATH: 'scripts/',
    IMAGE_PATH: 'images/',
    OUTPUT_PATH: path.join(BASE_PATH, 'lib'), // 组件库打包路径
    PAEG_OUTPUT_PATH: path.join(BASE_PATH, 'dist'),// gp-page打包路径
    SRC_PATH: path.join(BASE_PATH, 'src/app.js'),
    COMPONENTS_PATH: path.join(BASE_PATH, 'src/components/'),
    PUBLIC_PATH: '/',
    BASE_PATH: BASE_PATH,
    PORT: 3000,
    SRC: path.join(BASE_PATH, 'src'),
    GEN_CSS_PATH_FROM: path.join(BASE_PATH, 'src/components/theme-chalk/src/style/'),
    build: {
        env: {
            NODE_ENV: '"development"'
        },
        productionSourceMap: false
    },
    dev: {
        env: {
            NODE_ENV: '"production"'
        },
        cssSourceMap: false
    },
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    }
}
