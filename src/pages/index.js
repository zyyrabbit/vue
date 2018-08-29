import DxSelectPage from './dxselectpage.vue'
import DxRadioPage from './dxradiopage.vue'
import DxTablePage from './dxtablepage.vue'
import DxButtonPage from './dxbuttonpage.vue'
import DxNavPage from './dxnavpage.vue'
import DxInputPage from './dxInputpage.vue'
import DxPaginationPage from './dxpaginationpage.vue'
import DxFormPage from './DxFormPage.vue'
import DxCarouselPage from './DxCarouselPage.vue'
import DxNotifyPage from './DxNotifyPage.vue'
import DxProgessPage from './DxProgessPage.vue'
import DxUploadPage from './DxUploadPage.vue'
const pages = [
    { path: 'dxselectpage', title: 'select选择框', component: DxSelectPage },
    { path: 'dxradiopage', title: 'radio选择框', component: DxRadioPage },
    { path: 'dxformpage', title: 'form表单', component: DxFormPage },
    { path: 'dxtablepage', title: 'table表格', component: DxTablePage },
    { path: 'dxbuttonpage', title: 'button按钮', component: DxButtonPage },
    { path: 'dxnavpage', title: 'nav导航栏', component: DxNavPage },
    { path: 'dxInputpage', title: 'input输入框', component: DxInputPage },
    { path: 'dxpaginationpage', title: 'pagination分页', component: DxPaginationPage },
    { path: 'DxCarouselPage', title: 'carousel轮播组件', component: DxCarouselPage },
    { path: 'DxNotifyPage', title: 'notify消息通知组件', component: DxNotifyPage },
    { path: 'DxProgessPage', title: 'progress进度条', component: DxProgessPage },
    { path: 'DxUploadPage', title: 'upload文件上传', component: DxUploadPage }
]
export default pages
