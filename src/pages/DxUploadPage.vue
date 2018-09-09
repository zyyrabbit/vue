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
                  name="demoFilename"></dx-upload>
          </div>
	    </dx-show-code>
  </div>
  <div class="item-content">
      <dx-heading :level="1">限制文件类型上传</dx-heading>
      <dx-show-code :htmlString="htmlString2">
          <div style="width:300px">
               <dx-upload 
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :accept="['jpg', 'png']"
                  name="demoFilename"
                  tip="只能上传图片文件 jpg/png格式"></dx-upload>
          </div>
      </dx-show-code>
  </div>
   <div class="item-content">
      <dx-heading :level="1">限制文件大小</dx-heading>
      <dx-show-code :htmlString="htmlString2">
          <div style="width:300px">
               <dx-upload 
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :limit="1"
                  unit="KB"
                  name="demoFilename"
                  tip="文件大小为1kB"></dx-upload>
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
              optionVal: '必填',
              defaultVal: '---'
            },
            {
              param: 'name',
              illustrate: '上传文件参数名',
              type: 'String',
              optionVal: '---',
              defaultVal: '---'
            },
            {
              param: 'accept',
              illustrate: '上传文件限制类型',
              type: 'Array',
              optionVal: '---',
              defaultVal: '常规文件都支持'
            },
            {
              param: 'limit',
              illustrate: '限制上传文件大小,结合单元一起',
              type: 'Number',
              optionVal: '---',
              defaultVal: '8'
            },
            {
              param: 'unit',
              illustrate: '上传文件大小单位',
              type: 'String',
              optionVal: 'KB,MB,GB',
              defaultVal: 'MB'
            },
            {
              param: 'tip',
              illustrate: '上传文件提示信息',
              type: 'String',
              optionVal: '---',
              defaultVal: '---'
            },
            {
              param: 'withCredentials',
              illustrate: '是否需要发送cookie验证信息',
              type: 'Boolean',
              optionVal: '---',
              defaultVal: 'false'
            },
            {
              param: 'showFileList',
              illustrate: '是否展示上午文件详细信息',
              type: 'Boolean',
              optionVal: '---',
              defaultVal: 'false'
            },
             {
              param: 'onBefore',
              illustrate: '文件上传之前回调函数，参数为file文件信息对象，若果返回为false,则放弃本次上传',
              type: 'Function',
              optionVal: '---',
              defaultVal: '---'
            },
            {
              param: 'onProgress',
              illustrate: '若浏览器支持FormData,文件上传进度回调，参数为进度对象data',
              type: 'Function',
              optionVal: '---',
              defaultVal: '---'
            },
            {
              param: 'onSuccess',
              illustrate: '文件成功上传回调函数，参数为文件上传对象file',
              type: 'Function',
              optionVal: '---',
              defaultVal: '---'
            },
            {
              param: 'onError',
              illustrate: '文件失败上传回调函数，参数为失败信息',
              type: 'Function',
              optionVal: '---',
              defaultVal: '---'
            },
            {
              param: 'onRemove',
              illustrate: '移除上传文件（可以上传时，也可终止文件上传）',
              type: 'Function',
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
                                      :showFileList="true">
                                </dx-upload>
                              >
                         </template>`
        this.htmlString2 = `<template> 
                                <dx-upload 
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    :accept="['jpg', 'png']"
                                    name="demoFilename"
                                    :showFileList="true"
                                    tip="只能上传图片文件 jpg/png格式">
                                </dx-upload>
                           </template>`
    }
  }
</script>
<style>
</style>
