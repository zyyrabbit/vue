<template>
 <div class="wrap-content">
 	<div class="item-content">
	    <dx-heading :level="1">Tabs 标签页</dx-heading>
	    <p>用于移动端标签页切换</p>
  </div>
  <div class="item-content">
	    <dx-heading :level="1">基本用法</dx-heading>
	    <p>Tabs的基础用法</p>
	    <dx-show-code :htmlString="htmlString" :scriptString="scriptString">
	    	<dx-tabs v-model="tabValue" :tabs="tabs" @input="tabClick"></dx-tabs>
	    </dx-show-code>
  </div>
  <div class="item-content">
      <div style="margin-bottom: 2rem">
        <dx-heading :level="1">Tabs Attributes</dx-heading>
      </div>
      <dx-table 
        :data="attrDatas" 
        :borderRow="true" 
        tableHeadClass="table-head"
      >
        <dx-table-column prop="param" label="参数" ></dx-table-column>
        <dx-table-column prop="illustrate"  label="说明"></dx-table-column>
        <dx-table-column prop="type"  label="类型"></dx-table-column>
        <dx-table-column prop="defaultVal" label="默认值" width="80"></dx-table-column>
      </dx-table>
  </div>
  <div class="item-content">
      <div style="margin-bottom: 2rem">
        <dx-heading :level="1">Tabs Event</dx-heading>
      </div>
      <dx-table 
        :data="eventDatas" 
        :borderRow="true" 
        tableHeadClass="table-head"
      >
          <dx-table-column prop="eventName"  label="事件名称" ></dx-table-column>
          <dx-table-column prop="illustrate"  label="说明"></dx-table-column>
          <dx-table-column prop="cbArgs"  label="回调参数"></dx-table-column>
      </dx-table>
  </div>
 </div>
</template>
<script>
  export default {
    data() {
      return {
        tabValue: 0,
        tabs: [{
          label: '标签1',
          value: 0
        }, {
          label: '标签2',
          value: 1
        }, {
          label: '标签3',
          value: 2
        }],
        htmlString: '',
        scriptString: '',
        attrDatas: [
                    {
                      param: 'tabs',
                      illustrate: '对象数组，注目前label为标签页，value标签页的值',
                      type: 'Array',
                      defaultVal: '---'
                    },
                    {
                      param: 'input',
                      illustrate: '触发事件,传入的参数为标签页对应的值',
                      type: 'Function',
                      defaultVal: '---'
                    }
                  ],
        eventDatas: [
                    {
                       eventName: 'input',
                       illustrate: '标签页切换触发事件',
                       cbArgs: '回调参数为标签绑定的值'
                    }
                ]
      }
    },
    methods: {
      tabClick(value) {
        console.log(value)
      }
    },
    created() {
    // 基本用法
        this.htmlString = `<template> 
                              <dx-tabs v-model="tabValue" :tabs="tabs" @input="tabClick($event)"></dx-tabs>
                            </template>`
        this.scriptString = `export default {
               data() {
                  return {
                    tabValue: 0,
                    tabs: [{
                      label: 'tab1',
                      value: 0
                    }, {
                      label: 'tab2',
                      value: 1
                    }, {
                      label: 'tab3',
                      value: 2
                    }]
                  }
                },
                methods: {
                  tabClick(value) {
                    console.log(value)
                  }
                }
              }`
    }
  }
</script>
<style>
</style>
