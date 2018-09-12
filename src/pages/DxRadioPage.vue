<template>
 <div class="wrap-content">
 	<div class="item-content">
	    <dx-heading :level="1">Radio 单选框</dx-heading>
	    <p>单选框用于从一组数据中选择一个，如果数据过多建议使用select下拉框</p>
  	</div>
  	<div class="item-content">
	    <dx-heading :level="1">基本用法</dx-heading>
	    <p>单选框的基本用法</p>
	    <dx-show-code :htmlString="htmlString1">
        	<dx-radio v-model="radio" name="radio" label="1">选项1</dx-radio>
	    	<dx-radio v-model="radio" name="radio" label="2">选项2</dx-radio>
	    </dx-show-code>
 	</div>
  	<div class="item-content">
      <dx-heading :level="1">禁用单选按钮</dx-heading>
      <p>单选按钮不可用</p>
      <dx-show-code :htmlString="htmlString2" >
        <dx-radio v-model="radio1" disabled label="1">选项1</dx-radio>
	    <dx-radio v-model="radio1" disabled label="2">选项2</dx-radio>
      </dx-show-code>
    </div>
  
    <div class="item-content">
      <div style="margin-bottom:2rem">
        <dx-heading :level="1">Radio Attributes</dx-heading>
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
        radio: '1',
        radio1: '1',
        htmlString1: '',
        htmlString2: '',
        attrDatas: [
                    {
                      param: 'label',
                      illustrate: '单选按钮的实际选择值',
                      type: 'String,Number,Boolean',
                      optionVal: '---',
                      defaultVal: '---'
                    },
                    {
                      param: 'disabled',
                      illustrate: '禁用单选按钮',
                      type: 'Boolean',
                      optionVal: '---',
                      defaultVal: 'false'
                    },
                    {
                      param: 'name',
                      illustrate: '原生name属性',
                      type: 'String',
                      optionVal: '---',
                      defaultVal: '---'
                    }
                  ]
      }
    },
    created() {
        // 基本用法
        this.htmlString1 = `<template> 
                            <dx-radio v-model="radio" label="1">选项1</dx-radio>
	    					<dx-radio v-model="radio" >选项2</dx-radio>
                         </template>`
        this.htmlString2 = `<template> 
                             <dx-radio v-model="radio1" disabled label="1">选项1</dx-radio>
	    					<dx-radio v-model="radio1" disabled>选项2</dx-radio>
                           </template>`
    }
  }
</script>
<style>
</style>
