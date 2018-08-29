<template>
 <div class="wrap-content">
 	<div class="item-content">
	    <dx-heading :level="1">Input 输入框</dx-heading>
	    <p>用于用户输入数据</p>
  	</div>
  	<div class="item-content">
	    <dx-heading :level="1">基本用法</dx-heading>
	    <dx-show-code :htmlString="htmlString" :scriptString="scriptString">
        	<dx-input v-model="val" >基本用法</dx-input>
	    </dx-show-code>
 	</div>
 	<div class="item-content">
	    <dx-heading :level="1">控制input输入框的大小</dx-heading>
	    <p>与父元素同框</p>
	    <dx-show-code :htmlString="htmlString1" :scriptString="scriptString">
        	<dx-input v-model="val" :max="true">label</dx-input>
	    </dx-show-code>
 	</div>
    <div class="item-content">
      <div style="margin-bottom:2rem">
        <dx-heading :level="1">Input Attributes</dx-heading>
      </div>
      <dx-table 
      :data="attrDatas" 
      :borderRow="true" 
      tableHeadClass="table-head"
      >
        <dx-table-column prop="param" label="参数" ></dx-table-column>
        <dx-table-column prop="illustrate"  label="说明"></dx-table-column>
        <dx-table-column prop="type"  label="类型"></dx-table-column>
        <dx-table-column prop="optionVal" label="可选值" ></dx-table-column>
        <dx-table-column prop="defaultVal" label="默认值" ></dx-table-column>
      </dx-table>
  </div>
 </div>
</template>
<script>
  export default {
    data(){
      return {
      	val:'',
        attrDatas:[
                    { param:'size',illustrate:'输入框的style样式',type:'Object',defaultVal:null},
                    { param:'max',illustrate:'输入框的长度widt=100%',type:'Boolean',defaultVal:false}
                  ]
      }
    },
    created(){
    	// 基本用法
        this.htmlString = `<template> 
                           	 	<dx-input v-model="val">基本用法</dx-input>
                         </template>`
        this.htmlString1 = `<template> 
	                            <dx-input v-model="val" max="true"></dx-input>
                           </template>`
        this.scriptString = `export default {
                                data(){
                                  return {
                                    val:''
                                  }
                                }
                              }`
    }
  }
</script>
<style>
</style>

