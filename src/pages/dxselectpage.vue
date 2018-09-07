<template>
 <div class="wrap-content">
 	<div class="item-content">
	    <dx-heading :level="1">Select 选择器</dx-heading>
	    <p>当选择的元素过多时，应该应用select选择器</p>
  </div>
  <div class="item-content">
	    <dx-heading :level="1">基本用法</dx-heading>
	    <p>输入items中元素类型为基本类型，非对象类型如String</p>
	    <dx-show-code :htmlString="htmlString1" :scriptString="scriptString1">
	    	<dx-select :items="items1" v-model="selectValue1" placeholder="请选择"></dx-select>
	    </dx-show-code>
  </div>
  <div class="item-content">
	    <dx-heading :level="1">扩展用法</dx-heading>
	    <p>输入items为对象数组,此时label-key和value-key为必须的元素特性</p>
	    <dx-show-code :htmlString="htmlString2" :scriptString="scriptString2">
	    	<dx-select :items="items2" label-key="name" value-key="value" v-model="selectValue2" placeholder="请选择"></dx-select>
	    </dx-show-code>
  </div>
  <div class="item-content">
      <div style="margin-bottom:2rem">
        <dx-heading :level="1">Select Attributes</dx-heading>
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
    data(){
      return {
      	items1:['选项1','选项2','选项3','选项4'],
        selectValue1:'',
        htmlString1:'',
        scriptString1:'',

        items2:[{name:'选项1',value:0}, {name:'选项2',value:1}],
        selectValue2:'',
        htmlString2:'',
        scriptString2:'',
        attrDatas:[
                    { param:'items',illustrate:'下拉框需要展示的数组数据',type:'Array',optionVal:'---',defaultVal:'---'},
                    { param:'labelKey',illustrate:'当数组元素为对象时标签的键值',type:'String',optionVal:'---',defaultVal:'---'},
                    { param:'valueKey',illustrate:'当数组元素为对象时实际选择值的键值',type:'String',optionVal:'---',defaultVal:'---'},
                    { param:'readonly',illustrate:'设置输入框是否只读',type:'Boolean',optionVal:'---',defaultVal:'true'},
                    { param:'placeholder',illustrate:'输入框默认显示字符串',type:'String',optionVal:'---',defaultVal:'---'},
                    { param:'remote',illustrate:'是否为服务器端加载数据',type:'Boolean',optionVal:'---',defaultVal:'---'},
                    { param:'remoteMethod',illustrate:'当为远程加载服务器数据时的异步加载数据函数，返回值为需要显示的数据',type:'Function',optionVal:'---',defaultVal:'---'},
                     { param:'onSelect',illustrate:'选中下拉框数据时的回调函数，回调参数为实际选择项的实际值',type:'Function',optionVal:'---',defaultVal:'---'}
                  ]
      }
    },
    created(){
    	// 基本用法
        this.htmlString1 =`<template> 
                            <dx-select :items="items1" v-model="selectValue1"  placeholder="请选择">
                            </dx-select>
                       </template>`;
    	  this.scriptString1 = `export default {
   						 data(){
      						return {
						        items1:['选项1','选项2','选项3','选项4'],
						        selectValue1:''
      						}
   					   },
   				    }`;

        // 扩展用法
         this.htmlString2 =`<template> 
                            <dx-select :items="items2" v-model="selectValue2" label-key="name" value-key="value" placeholder="请选择">
                            </dx-select>
                          </template>`;
    	this.scriptString2 = `export default {
   						 data(){
      						return {
      							items2:[{name:'选项1',value:0},{name:'选项2',value:1}],
						        selectValue2:''
      						}
   					   },
   				    }`;
    }
  }
</script>
<style>
</style>
