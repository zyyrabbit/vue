<template>
 <div class="wrap-content">
 	<div class="item-content">
	    <dx-heading :level="1">upload 文件上传</dx-heading>
	    <p>上传文件</p>
  </div>
  <div class="item-content">
	    <dx-heading :level="1">基本用法</dx-heading>
	    <p>上传文件的基础用法</p>
	    <dx-show-code :htmlString="htmlString1">
          <div style="width:300px">
       		     <dx-upload 
                  action="https://jsonplaceholder.typicode.com/posts/" 
                  name="demoFilename" 
                  tip="只能上传图片文件 jpg/png格式"></dx-upload>
          </div>
	    </dx-show-code>
  </div>
  <div class="item-content">
      <dx-heading :level="1">基本用法</dx-heading>
      <p>上传文件之前拦截文件</p>
      <dx-show-code :htmlString="htmlString2">
          <div style="width:300px">
               <dx-upload 
                  action="https://jsonplaceholder.typicode.com/posts/" 
                  name="demoFilename" 
                  :before-upload="beforeUpload"></dx-upload>
          </div>
      </dx-show-code>
  </div>
  <div class="item-content">
      <div style="margin-bottom:2rem">
        <dx-heading :level="1">upload Attributes</dx-heading>
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
        <dx-heading :level="1">upload Event</dx-heading>
        <p>点击button会，会执行一个上传文件函数</p>
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
        attrDatas: [
                    {
                      param: 'action',
                      illustrate: '上传文件地址',
                      type: 'String',
                      optionVal: '---',
                      defaultVal: '---'
                    },
                    {
                      param: 'before-upload',
                      illustrate: '上传文件之前回调函数',
                      type: 'String',
                      optionVal: '---',
                      defaultVal: '---'
                    }
                  ]
      }
    },
    methods: {
        beforeUpload(file) {
            console.log(file)
            return true
        }
    },
    created() {
    // 基本用法
        this.htmlString1 = `<template> 
                              <dx-upload 
                                  action="https://jsonplaceholder.typicode.com/posts/" 
                                  name="demoFilename" 
                                  tip="只能上传图片文件 jpg/png格式"
                              >
                              </dx-upload>
                         </template>`
        this.htmlString2 = `<template> 
                            <dx-upload 
                                action="https://jsonplaceholder.typicode.com/posts/" 
                                name="demoFilename" 
                                :before-upload="beforeUpload"></dx-upload>
                           </template>`
    }
  }
</script>
<style>
</style>
