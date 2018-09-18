<template>
 <div class="wrap-content">
 	<div class="item-content">
	    <dx-heading :level="1">Message 指示器</dx-heading>
	    <p>消息提示器</p>
  	</div>
  	<div class="item-content">
	    <dx-heading :level="1">基本用法</dx-heading>
	    <p>用于提示消息</p>
	    <dx-show-code :htmlString="htmlString" :scriptString="scriptString">
        	<dx-button @dx-button-click="openMessage">提示</dx-button>
          <dx-button @dx-button-click="openMessage1" class="margin-left-1rem">成功</dx-button>
          <dx-button @dx-button-click="openMessage2" class="margin-left-1rem">警告</dx-button>
          <dx-button @dx-button-click="openMessage3" class="margin-left-1rem">错误</dx-button>
          <dx-button @dx-button-click="openMessage4" class="margin-left-1rem">自定义内容</dx-button>
	    </dx-show-code>
 	  </div>
    <div class="item-content">
      <dx-heading :level="1">便捷方法</dx-heading>
      <p>提供错误、警告特定类型的方法</p>
      <dx-show-code :htmlString="htmlString1" :scriptString="scriptString1">
          <dx-button @dx-button-click="openMessage5">便捷提示</dx-button>
          <dx-button @dx-button-click="openMessage6" class="margin-left-1rem">全局调用</dx-button>
          <dx-button @dx-button-click="openMessage7" class="margin-left-1rem">直接输入消息</dx-button>
      </dx-show-code>
    </div>
    <div class="item-content">
      <div style="margin-bottom:2rem">
        <dx-heading :level="1">Message Attributes</dx-heading>
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
  import Vue from 'vue'
  export default {
    data() {
      return {
        htmlString: '',
        scriptString: '',
        htmlString1: '',
        scriptString1: '',
        attrDatas: [
                    {
                      param: 'content',
                      illustrate: '消息内容',
                      type: 'string,Vnode',
                      optionVal: '---',
                      defaultVal: '---'
                     },
                     {
                      param: 'type',
                      illustrate: '消息类型',
                      type: 'string',
                      optionVal: '["info","success","warning","error"]',
                      defaultVal: 'info'
                     }
                  ]
      }
    },
    created() {
    // 基本用法
        this.htmlString = `<template> 
                            <dx-button @dx-button-click="openMessage">提示</dx-button>
                            <dx-button @dx-button-click="openMessage1">成功</dx-button>
                            <dx-button @dx-button-click="openMessage2">警告</dx-button>
                            <dx-button @dx-button-click="openMessage3">错误</dx-button>
                         </template>`
        this.scriptString = `export default {
                               methods: {
                                   openMessage() {
                                      this.$message({
                                        content: '这是一条提示信息！'
                                      })
                                    },
                                    openMessage1() {
                                      this.$message({
                                        content: '这是一条成功信息！',
                                        type: 'success'
                                      })
                                    },
                                    openMessage2() {
                                      this.$message({
                                        content: '这是一条警告信息！',
                                        type: 'warning'
                                      })
                                    },
                                    openMessage3() {
                                      this.$message({
                                        content: '这是一条错误信息！',
                                        type: 'error'
                                      })
                                    }
                                }
                              }`
        this.htmlString1 = `<template> 
                            <dx-button @dx-button-click="openMessage4">便捷提示</dx-button>
                            <dx-button @dx-button-click="openMessage6">全局调用</dx-button>
                            <dx-button @dx-button-click="openMessage7" class="margin-left-1rem">直接输入消息</dx-button>
                         </template>`
        this.scriptString1 = `export default {
                               methods: {
                                   openMessage4() {
                                      this.$message.info({
                                        content: '这是一条提示信息！'
                                      })
                                    },
                                    openMessage6() {
                                      Vue.DxMessage({
                                        content: '这是一条全局调用提示信息！'
                                      })
                                    },
                                     openMessage7() {
                                         this.$message('这是一条直接提示信息！')
                                     }
                                }
                              }`
    },
    methods: {
      openMessage() {
        this.$message({
          content: '这是一条提示信息！'
        })
      },
      openMessage1() {
        this.$message({
          content: '这是一条成功信息！',
          type: 'success'
        })
      },
      openMessage2() {
        this.$message({
          content: '这是一条警告信息！',
          type: 'warning'
        })
      },
      openMessage3() {
        this.$message({
          content: '这是一条错误信息！',
          type: 'error'
        })
      },
      openMessage4() {
        let h = this.$createElement
        this.$message({
          content: h('div', null, ['这是自定义Vnode内容']),
          type: 'info'
        })
      },
      openMessage5() {
        this.$message.info({
          content: '这是一条提示信息！'
        })
      },
      openMessage6() {
        Vue.DxMessage({
          content: '这是一条提示信息！'
        })
      },
      openMessage7() {
         this.$message('这是一条直接提示信息！')
      }
    }
  }
</script>
<style>
</style>
