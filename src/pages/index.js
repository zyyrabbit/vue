import Vue from 'vue'
import DxSelectPage from './DxSelectPage.vue'
import DxRadioPage from './DxRadioPage.vue'
import DxTablePage from './DxTablePage.vue'
import DxButtonPage from './DxButtonPage.vue'
import DxNavPage from './DxNavPage.vue'
import DxInputPage from './DxInputPage.vue'
import DxPaginationPage from './DxPaginationPage.vue'
import DxFormPage from './DxFormPage.vue'
import DxCarouselPage from './DxCarouselPage.vue'
import DxNotifyPage from './DxNotifyPage.vue'
import DxProgessPage from './DxProgessPage.vue'
import DxUploadPage from './DxUploadPage.vue'
import DxCalenderPage from './DxCalenderPage.vue'
import DxMessageBoxPage from './DxMessageBoxPage.vue'
import DxCheckboxPage from './DxCheckboxPage.vue'
import DxMessagePage from './DxMessagePage.vue'
// 移动端组件
import DxIndicatorPage from './DxIndicatorPage.vue'
import DxRatePage from './DxRatePage.vue'
import DxTabsPage from './DxTabsPage.vue'

import DxHeading from './components/dx-heading.vue'
import DxShowCode from './components/dx-show-code.vue'
Vue.component(DxHeading.name, DxHeading)
Vue.component(DxShowCode.name, DxShowCode)
export const pcPages = [
    { path: 'dxselectpage', title: 'select 选择框', component: DxSelectPage },
    { path: 'dxradiopage', title: 'radio 选择框', component: DxRadioPage },
    { path: 'dxformpage', title: 'form 表单', component: DxFormPage },
    { path: 'dxtablepage', title: 'table 表格', component: DxTablePage },
    { path: 'dxbuttonpage', title: 'button 按钮', component: DxButtonPage },
    { path: 'dxnavpage', title: 'nav 导航栏', component: DxNavPage },
    { path: 'dxInputpage', title: 'input 输入框', component: DxInputPage },
    { path: 'dxpaginationpage', title: 'pagination 分页', component: DxPaginationPage },
    { path: 'dxcarouselpage', title: 'carousel 轮播', component: DxCarouselPage },
    { path: 'dxnotifypage', title: 'notify 消息通知', component: DxNotifyPage },
    { path: 'dxprogesspage', title: 'progress 进度条', component: DxProgessPage },
    { path: 'DxCalenderPage', title: 'calender 日历', component: DxCalenderPage },
    { path: 'DxUploadPage', title: 'upload 上传文件', component: DxUploadPage },
    { path: 'DxMessageBoxPage', title: 'messageBox 消息弹窗', component: DxMessageBoxPage },
    { path: 'DxCheckboxPage', title: 'checkbox 多选框', component: DxCheckboxPage },
    { path: 'DxMessagePage', title: 'message 消息', component: DxMessagePage }
]

// 移动端组件
export const mobilePages = [
    { path: 'DxIndicatorPage', title: 'indicator 加载指示器', component: DxIndicatorPage },
    { path: 'DxRatePage', title: 'rate 打分', component: DxRatePage },
    { path: 'DxTabsPage', title: 'tabs 标签页', component: DxTabsPage }
]
