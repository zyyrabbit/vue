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
	    	<dx-tabs v-model="tabValue" :tabs="tabs" @input="tabClick($event)"></dx-tabs>
	    </dx-show-code>
  </div>
  <div class="item-content">
      <div style="margin-bottom:2rem">
        <dx-heading :level="1">Star Attributes</dx-heading>
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
 </div>
</template>
<script>

  export default {
    data() {
      return {
        tabValue: 0,
        tabs: [{
          label: '待上课',
          value: 0
        }, {
          label: '正在上课',
          value: 1
        }, {
          label: '已上课',
          value: 2
        }],
        htmlString: '',
        scriptString: '',
        attrDatas: [
                    {
                      param: 'tabs',
                      illustrate: '标签页切换数据，注目前label为标签页，value标签页的值',
                      type: 'Object',
                      defaultVal: '---'
                    },
                    {
                      param: 'input',
                      illustrate: '触发事件,传入的参数为标签页对应的值',
                      type: 'Function',
                      defaultVal: '---'
                    }
                  ]
      }
    },
    methods: {
      tabClick($event) {
        console.log($event)
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
                      label: '待上课',
                      value: 0
                    }, {
                      label: '正在上课',
                      value: 1
                    }, {
                      label: '已上课',
                      value: 2
                    }],
                    htmlString: '',
                    scriptString: '',
                    attrDatas: [
                                {
                                  param: 'rating',
                                  illustrate: '设置级别',
                                  type: 'Number',
                                  defaultVal: '0'
                                }
                              ]
                  }
                },
                methods: {
                  tabClick($event) {
                    console.log($event)
                  }
                }
              }`;
    }
  }
</script>
<style>
</style>
