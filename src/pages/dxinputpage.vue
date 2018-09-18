<template>
 <div class="wrap-content">
 	<div class="item-content">
	    <dx-heading :level="1">Input 输入框</dx-heading>
	    <p>用于用户输入数据</p>
  	</div>
  	<div class="item-content">
	    <dx-heading :level="1">基本用法</dx-heading>
        <p>input默认设置为元素的80%,如果需要设置自定义宽度，请自行覆盖dx-input</p>
	    <dx-show-code :htmlString="htmlString" :scriptString="scriptString">
          <div class="margin-bottom-10">
            <dx-input v-model="val1"></dx-input>
          </div>
          <div class="margin-bottom-10" style="font-size: 1.4rem">
            标签：<dx-input v-model="val2"></dx-input>
          </div>
	    </dx-show-code>
 	</div>
 	<div class="item-content">
	    <dx-heading :level="1">input输入框添加前后缀</dx-heading>
	    <dx-show-code :htmlString="htmlString1" :scriptString="scriptString">
            <div class="margin-bottom-10">
            	<dx-input v-model="val3" >
                <span>label:</span>
              </dx-input>
            </div>
            <div class="margin-bottom-10">
              <dx-input v-model="val4">
                <span slot="left">label</span>
              </dx-input>
            </div>
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
    data() {
      return {
        val1: '',
        val2: '',
        val3: '',
        val4: '',
        attrDatas: [
                    {
                        param: 'inputStyle',
                        illustrate: 'input的style样式',
                        type: 'Object',
                        optionVal: '---',
                        defaultVal: '---'
                    },
                    {
                        param: 'inputClass',
                        illustrate: 'input的class样式',
                        type: 'Object',
                        optionVal: '---',
                        defaultVal: '---'
                    },
                    {
                        param: 'placeholder',
                        illustrate: '自定义输入框提示信息',
                        type: 'String',
                        optionVal: '---',
                        defaultVal: '---'
                    },
                    {
                        param: 'originType',
                        illustrate: 'input类型',
                        type: 'String',
                        optionVal: '---',
                        defaultVal: '---'
                    },
                    {
                        param: 'disabled',
                        illustrate: '禁止输入框',
                        type: 'Boolean',
                        optionVal: '---',
                        defaultVal: false
                    }
                  ]
      }
    },
    created() {
        // 基本用法
        this.htmlString = `<template> 
                           	 	<div class="margin-bottom-10">
                                    <dx-input v-model="val"></dx-input>
                                </div>
                                <div class="margin-bottom-10" style="font-size: 1.4rem">
                                    标签：<dx-input v-model="val1"></dx-input>
                                </div>
                         </template>`
        this.htmlString1 = `<template> 
	                            <dx-input v-model="val" max="true"></dx-input>
                           </template>`
        this.scriptString = `export default {
                                data(){
                                  return {
                                        val1: '',
                                        val2: '',
                                        val3: '',
                                        val4: ''
                                  }
                                }
                              }`
    }
  }
</script>
<style>
  .margin-bottom-10 {
    margin-bottom: 1rem;
  }
</style>

