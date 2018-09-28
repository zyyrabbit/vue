# vue-ui

[![](https://travis-ci.org/zyyrabbit/vue.svg?branch=master)](https://travis-ci.org/zyyrabbit/vue)
[![](https://img.shields.io/npm/v/element-react.svg)](https://www.npmjs.com/package/dx-vue-ui)
[![](https://img.shields.io/npm/dm/element-react.svg)](https://www.npmjs.com/package/dx-vue-ui)

[vue-ui](https://github.com/ElemeFE/element) was initially written in [Vue](https://vuejs.org/), which has many simple UI components. I want to emphasize again that it is very very simple. Because the main purpose of this library is to learn, and to create your own component library on a re-based basis. And I hope you can fork this repository or pull down to study the code. Finally, I sincerely hope that this repository can help you.

## Getting Started

### Install

```bash
npm install dx-vue-ui --save
```

### Usage

I recommend you writing code in modern ECMAScript 6.

```js
import Vue from 'vue'
import VueUI from 'vue-ui'
Vue.use(VueUI)
```

Also we provide an advanced way to [tree shaking](https://blog.engineyard.com/2016/tree-shaking) the code with [Webpack 2](https://webpack.github.io/)

```js
import Vue from 'vue'
import 'dx-vue-ui/lib/style/index.css'
import DxSelect from 'dx-vue-ui/lib/select.js'
Vue.use(DxSelect) or Vue.component('DxSelect', DxSelect)
```

### Todos

- [ ] Unit testing
- [ ] End to end testing

## License

MIT