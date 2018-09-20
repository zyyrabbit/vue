import DxProgress from './dx-progress.vue'

/* istanbul ignore next */
DxProgress.install = function(Vue) {
  Vue.component(DxProgress.name, DxProgress)
}

export default DxProgress
