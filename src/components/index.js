import Vue from 'vue'
import DxCalender from './calendar/index.js'
import DxCheckbox from './checkbox/index.js'
import DxCheckboxGroup from './checkbox-group/index.js'
import DxIndicator from './indicator/index.js'
import DxMessage from './message/index.js'
import DxMessageBox from './message-box/index.js'
import DxTable from './table/index.js'
import DxTableColumn from './table-column/index.js'
import DxButton from './button/index.js'
import DxCarousel from './carousel/index.js'
import DxForm from './form/index.js'
import DxFormItem from './form-item/index.js'
import DxInput from './input/index.js'
import DxNav from './nav/index.js'
import DxNotify from './notify/index.js'
import DxPagination from './pagination/index.js'
import DxProgress from './progress/index.js'
import DxRadio from './radio/index.js'
import DxRate from './rate/index.js'
import DxSelect from './select/index.js'
import DxTabs from './tabs/index.js'
import DxCollapseTransition from './transitions/index.js'
import DxUpload from './uploader/index.js'

import './theme-chalk/src/style/index.css'
const components = [
	DxNav,
	DxRadio,
	DxSelect,
	DxFormItem,
	DxForm,
	DxTable,
	DxTableColumn,
	DxInput,
	DxButton,
	DxPagination,
	DxCarousel,
	DxCollapseTransition,
	DxProgress,
	DxUpload,
	DxCalender,
	DxIndicator,
	DxRate,
	DxTabs,
	DxCheckboxGroup,
	DxCheckbox,
	DxMessage
]

const install = function(Vue) {
	// 判断是否已经注册，如果已经注册则返回
	if (install.installed) return
	components.map(component => {
		Vue.component(component.name, component)
	})

	Vue.prototype.$indicator = DxIndicator
	Vue.prototype.$message = DxMessage
	Vue.prototype.$messageBox = DxMessageBox
	Vue.prototype.$notify = DxNotify

	install.installed = true
}
// 注册vue组件
if (typeof window !== 'undefined' && window.Vue) {
   install(window.Vue)
}
module.exports = {
	version: '1.0.0',
	install,
	DxNav,
	DxRadio,
	DxSelect,
	DxFormItem,
	DxForm,
	DxTable,
	DxTableColumn,
	DxInput,
	DxButton,
	DxPagination,
	DxCarousel,
	DxProgress,
	DxUpload,
	DxCalender,
	DxIndicator,
	DxRate,
	DxTabs,
	DxCheckboxGroup,
	DxCheckbox,
	DxMessage
}
module.exports.default = module.exports
