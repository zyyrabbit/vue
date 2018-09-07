<template>
 <div class="wrap-content">
 	<div class="item-content">
	    <dx-heading :level="1">Indicator 指示器</dx-heading>
	    <p>用于移动端加载页面指示器</p>
  	</div>
  	<div class="item-content">
	    <dx-heading :level="1">基本用法</dx-heading>
	    <p>用于移动端页面理由加载切换</p>
	    <dx-show-code :htmlString="htmlString" :scriptString="scriptString">
        	<dx-button @dx-button-click="openIndicator">加载指示器</dx-button>
	    </dx-show-code>
 	</div>
    <div class="item-content">
      <div style="margin-bottom:2rem">
        <dx-heading :level="1">Indicator Attributes</dx-heading>
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
        htmlString: '',
        scriptString: '',
        attrDatas: [
                    {
                      param: 'text',
                      illustrate: '文字说明',
                      type: 'string',
                      optionVal: '---',
                      defaultVal: '---'
                     },
                     {
                      param: 'spiner',
                      illustrate: '自定义加载动画',
                      type: 'string',
                      optionVal: '---',
                      defaultVal: '---'
                     }
                  ]
      }
    },
    created() {
    // 基本用法
        this.htmlString = `<template> 
                            <dx-button @dx-button-click="openIndicator">加载指示器</dx-button>
                         </template>`
        this.scriptString = `export default {
                               methods: {
                                  openIndicator() {
                                    this.$indicator.open({
                                      text: '加载中...'
                                    })
                                    setTimeout(() => {
                                       this.$indicator.close()
                                    }, 2000)
                                  }
                                }
                              }`
    },
    methods: {
      openIndicator() {
        this.$indicator.open({
          text: '加载中...'
        })
        setTimeout(() => {
           this.$indicator.close()
        }, 2000)
      }
    }
  }
</script>
<style>
</style>
