<template>
 <div class="wrap-content">
 	<div class="item-content">
	    <dx-heading :level="1">Progress 进度条</dx-heading>
	    <p>用于显示加载进度</p>
  </div>
  <div class="item-content">
	    <dx-heading :level="1">基本用法</dx-heading>
	    <p>默认不显示百分比</p>
	    <dx-show-code :htmlString="htmlString1">
        <dx-progress :percentage="0" :showText="false"></dx-progress>
        <dx-progress :percentage="40" :showText="false" color="rgb(103, 194, 58)"></dx-progress>
        <dx-progress :percentage="80"  :showText="false" color="#f56c6c"></dx-progress>
        <dx-progress :percentage="100"  :showText="false"  status="success"></dx-progress>
	    </dx-show-code>
  </div>
  <div class="item-content">
      <dx-heading :level="1">基本用法</dx-heading>
      <p>百分比内显示</p>
      <dx-show-code :htmlString="htmlString2">
        <dx-progress :percentage="0" :stroke-width="18" textInside></dx-progress>
        <dx-progress :percentage="40" :stroke-width="18" textInside color="rgb(103, 194, 58)"></dx-progress>
        <dx-progress :percentage="80" :stroke-width="18" textInside color="#f56c6c"></dx-progress>
        <dx-progress :percentage="100" :stroke-width="18" textInside status="success"></dx-progress>
      </dx-show-code>
  </div>
  <div class="item-content">
      <dx-heading :level="1">基本用法</dx-heading>
      <p>百分比外显示</p>
      <dx-show-code :htmlString="htmlString3">
        <dx-progress :percentage="0" ></dx-progress>
        <dx-progress :percentage="40" color="rgb(103, 194, 58)"></dx-progress>
        <dx-progress :percentage="80" color="#f56c6c"></dx-progress>
        <dx-progress :percentage="100" status="success"></dx-progress>
      </dx-show-code>
  </div>
  <div class="item-content">
      <div style="margin-bottom:2rem">
        <dx-heading :level="1">Progess Attributes</dx-heading>
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
 </div>
</template>
<script>
  export default {
    data() {
      return {
        htmlString1: '',
        scriptString1: '',
        ind: 1,
        attrDatas: [
                    {
                      param: 'percentage',
                      illustrate: '百分比（必填）',
                      type: 'Number',
                      optionVal: '---',
                      defaultVal: '0-100'
                    },
                     {
                      param: 'status',
                      illustrate: '进度条状态',
                      type: 'String',
                      optionVal: 'success',
                      defaultVal: '---'
                    },
                     {
                      param: 'color',
                      illustrate: '进度条内部背景颜色',
                      type: 'String',
                      optionVal: '---',
                      defaultVal: '---'
                    },
                     {
                      param: 'strokeWidth',
                      illustrate: '进度条宽度（单位：px)',
                      type: 'Number',
                      optionVal: '---',
                      defaultVal: '6'
                    },
                     {
                      param: 'textInside',
                      illustrate: '百分比内显示',
                      type: 'Boolean',
                      optionVal: '---',
                      defaultVal: 'false'
                    },
                    {
                      param: 'showText',
                      illustrate: '是否显示百分比',
                      type: 'Boolean',
                      optionVal: '---',
                      defaultVal: 'true'
                    },
                    {
                      param: 'iconClass',
                      illustrate: '进度条最终状态',
                      type: 'String',
                      optionVal: '---',
                      defaultVal: 'fa fa-check-circle'
                    }
                  ]
      }
    },
    created() {
    // 基本用法
        this.htmlString1 = `<template> 
                                <dx-progress :percentage="0" :showText="false"></dx-progress>
                                <dx-progress :percentage="40" :showText="false" color="rgb(103, 194, 58)"></dx-progress>
                                <dx-progress :percentage="80"  :showText="false" color="#f56c6c"></dx-progress>
                                <dx-progress :percentage="100"  :showText="false"  status="success"></dx-progress>
                         </template>`
        this.htmlString2 = `<template>
                                <dx-progress :percentage="0" ></dx-progress>
                                <dx-progress :percentage="40" color="rgb(103, 194, 58)"></dx-progress>
                                <dx-progress :percentage="80" color="#f56c6c"></dx-progress>
                                <dx-progress :percentage="100" status="success"></dx-progress>
                          </template>`
        this.htmlString3 =  `<template>
                                <dx-progress :percentage="0" ></dx-progress>
                                <dx-progress :percentage="40" color="rgb(103, 194, 58)"></dx-progress>
                                <dx-progress :percentage="80" color="#f56c6c"></dx-progress>
                                <dx-progress :percentage="100" status="success"></dx-progress>
                          </template>`
    }
  }
</script>

