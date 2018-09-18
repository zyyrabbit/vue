import Vue from 'vue'
import DxNav from './dx-nav.vue'
import DxRadio from './dx-radio.vue'
import DxSelect from './dx-select.vue'
import DxMessageBox from './messagebox/index.js'
import DxNotify from './notify/index.js'
import DxFormItem from './dx-form-item.vue'
import DxForm from './dx-form.vue'
import DxHeading from './dx-heading.vue'
import DxShowCode from './dx-show-code.vue'
import DxTable from './table/dx-table.vue'
import DxTableColumn from './table/dx-table-column.js'
import DXInput from './dx-input.vue'
import DxButton from './dx-button.vue'
import DxPagination from './pagination/dx-pagination.vue'
import DxCarousel from './dx-carousel.vue'
import DxCollapseTransition from './transitions/collapse-transition'
import DxProgress from './dx-progress.vue'
import DxCalender from './calendar/dx-calendar.vue'
import DxUpload from './uploader/dx-upload.vue'
import DxIndicator from './indicator'
import DxRate from './dx-rate.vue'
import DxTabs from './dx-tabs.vue'
import DxCheckboxGroup from './checkbox/dx-checkbox-group.vue'
import DxCheckbox from './checkbox/dx-checkbox.vue'
import DxMessage from './message'

import './theme-chalk/src/style/font/iconfont.css'
import './theme-chalk/src/style/index.css'
const components = [
	DxNav,
	DxRadio,
	DxSelect,
	DxFormItem,
	DxForm,
	DxHeading,
	DxShowCode,
	DxTable,
	DxTableColumn,
	DXInput,
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
	install.installed = true
}
// 注册vue组件
if (typeof window !== 'undefined' && Vue) {
   install(Vue)
};
Vue.DxMessageBox = DxMessageBox
Vue.DxNotify = DxNotify
Vue.DxMessage = DxMessage
module.exports = {
	DxNav,
	DxRadio,
	DxSelect,
	DxFormItem,
	DxForm,
	DxHeading,
	DxShowCode,
	DxTable,
	DxTableColumn,
	DXInput,
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
