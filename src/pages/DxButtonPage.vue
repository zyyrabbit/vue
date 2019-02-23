<template>
 <div class="wrap-content">
 	<div class="item-content">
	    <dx-heading :level="1">Button 按钮</dx-heading>
	    <p>用于用户点击按钮</p>
  </div>
  <div class="item-content">
	    <dx-heading :level="1">基本用法</dx-heading>
	    <p>按钮的基础用法</p>
	    <dx-show-code :htmlString="htmlString1">
        <dx-button>默认按钮</dx-button>
        <dx-button type="text">文字按钮</dx-button>
	    	<dx-button type="primary">基本按钮</dx-button>
        <dx-button type="pinking">粉色按钮</dx-button>
        <dx-button type="gray">灰色按钮</dx-button>
        <dx-button type="warning">警告按钮</dx-button>
	    </dx-show-code>
  </div>
  <div class="item-content">
      <dx-heading :level="1">禁用按钮</dx-heading>
      <p>按钮不可用</p>
      <dx-show-code :htmlString="htmlString2" >
        <dx-button  :disabled="true">默认按钮</dx-button>
        <dx-button  icon="edit" :disabled="true" class="margin-left-1rem">编辑</dx-button>
        <dx-button  icon="delete"  :disabled="true" class="margin-left-1rem">删除</dx-button>
      </dx-show-code>
  </div>
  <div class="item-content">
	    <dx-heading :level="1">图标按钮</dx-heading>
	    <p>带图标的按钮提高辨识度或节省空间</p>
	    <dx-show-code :htmlString="htmlString3">
	    	<dx-button  icon="search">搜索</dx-button>
        <dx-button  icon="edit" class="margin-left-1rem">编辑</dx-button>
        <dx-button  icon="delete" class="margin-left-1rem">删除</dx-button>
	    </dx-show-code>
  </div>
  <div class="item-content">
      <dx-heading :level="1">按钮大小</dx-heading>
      <p>设置有三种按钮大小</p>
      <dx-show-code :htmlString="htmlString4">
        <dx-button type="primary" size="large">大按钮</dx-button>
        <dx-button type="primary" class="margin-left-1rem">默认大小按钮</dx-button>
        <dx-button type="primary"  size="small" class="margin-left-1rem">小按钮</dx-button>
      </dx-show-code>
  </div>
  <div class="item-content">
      <dx-heading :level="1">父元素等宽按钮</dx-heading>
      <p>父元素等宽按钮</p>
      <dx-show-code :htmlString="htmlString5">
        <dx-button type="primary" size="full">超大按钮</dx-button>
      </dx-show-code>
  </div>
  <div class="item-content">
      <div style="margin-bottom:2rem">
        <dx-heading :level="1">Button Attributes</dx-heading>
      </div>
      <dx-table 
      :data="attrDatas" 
      :borderRow="true" 
      tableHeadClass="table-head"
      >
        <dx-table-column prop="param" label="参数" ></dx-table-column>
        <dx-table-column prop="illustrate"  label="说明"></dx-table-column>
        <dx-table-column prop="type"  label="类型"></dx-table-column>
        <dx-table-column prop="optionVal" label="可选值" width="80"></dx-table-column>
        <dx-table-column prop="defaultVal" label="默认值" width="80"></dx-table-column>
      </dx-table>
  </div>
   <div class="item-content">
      <div style="margin-bottom:2rem">
        <dx-heading :level="1">Button Event</dx-heading>
       <p>点击button会，会触发一个dx-button-click事件，用于执行回调参数为event</p>
      </div>
  </div>
 </div>
</template>
<script>
  export default {
    data() {
      return {
        htmlString1: '',
        htmlString2: '',
        htmlString3: '',
        htmlString4: '',
        htmlString5: '',
        attrDatas: [
                    {
                      param: 'type',
                      illustrate: '按钮样式',
                      type: 'String',
                      optionVal: 'text,warning,pinking,primary,gray',
                      defaultVal: '---'
                    },
                    {
                      param: 'size',
                      illustrate: '设置按钮的大小',
                      type: 'String',
                      optionVal: 'large,middle,small,full',
                      defaultVal: 'middle'
                    },
                    {
                      param: 'disabled',
                      illustrate: '禁用按钮',
                      type: 'Boolean',
                      optionVal: '---',
                      defaultVal: 'false'
                    },
                    {
                      param: 'nativeType',
                      illustrate: 'button原生样式',
                      type: 'String',
                      optionVal: 'button,submit,reset',
                      defaultVal: '---'
                    }
                  ]
      }
    },
    created() {
        // 基本用法
        this.htmlString1 = `<template> 
                              <dx-button>默认按钮</dx-button>
                              <dx-button type="text">文字按钮</dx-button>
                              <dx-button type="primary">基本按钮</dx-button>
                              <dx-button type="pinking">粉色按钮</dx-button>
                              <dx-button type="gray">灰色按钮</dx-button>
                              <dx-button type="warning">警告按钮</dx-button>
                         </template>`
        this.htmlString2 = `<template> 
                            <dx-button  :disabled="true">默认按钮</dx-button>
                            <dx-button  icon="edit" :disabled="true">编辑</dx-button>
                            <dx-button  icon="delete"  :disabled="true">删除</dx-button>
                           </template>`
        // 扩展用法
        this.htmlString3 = `<template> 
                              <dx-button  icon="search">搜索</dx-button>
                              <dx-button  icon="edit">编辑</dx-button>
                              <dx-button  icon="delete">删除</dx-button>
                          </template>`
        this.htmlString4 = `<template> 
                              <dx-button type="primary" size="full">大按钮</dx-button>
                              <dx-button type="primary" size="large">大按钮</dx-button>
                              <dx-button type="primary" >默认大小按钮</dx-button>
                              <dx-button type="primary"  size="small">小按钮</dx-button>
                          </template>`
        this.htmlString5 = `<template> 
                              <dx-button type="primary" size="full">超大按钮</dx-button>
                          </template>`
    }
  }
</script>
