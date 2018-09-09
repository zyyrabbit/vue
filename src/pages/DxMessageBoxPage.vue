<template>
 <div class="wrap-content">
 	<div class="item-content">
	    <dx-heading :level="1">MessageBox 弹窗</dx-heading>
	    <p>用于消息弹窗</p>
  	</div>
  	<div class="item-content">
	    <dx-heading :level="1">基本用法</dx-heading>
	    <p>默认消息弹窗</p>
	    <dx-show-code :htmlString="htmlString" :scriptString="scriptString">
        	<dx-button @dx-button-click="openMessageBox" type="primary">点击弹窗</dx-button>
	    </dx-show-code>
 	  </div>
    <div class="item-content">
      <dx-heading :level="1">自定义消息内容</dx-heading>
      <p>自定义消息内容</p>
      <dx-show-code :htmlString="htmlString" :scriptString="scriptString">
          <dx-button @dx-button-click="openMessageBox1" type="primary">自定义消息内容</dx-button>
      </dx-show-code>
    </div>
    <div class="item-content">
      <dx-heading :level="1">按钮居中</dx-heading>
      <p>按钮居中排列</p>
      <dx-show-code :htmlString="htmlString" :scriptString="scriptString">
          <dx-button @dx-button-click="openMessageBox2" type="primary">按钮居中</dx-button>
      </dx-show-code>
    </div>
    <div class="item-content">
      <div style="margin-bottom:2rem">
        <dx-heading :level="1">MessageBox Attributes</dx-heading>
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
      openMessageBox() {
        this.$messageBox({
          message: '我是快乐的小弹窗'
        })
      },
      openMessageBox1() {
        let h = this.$createElement
        this.$messageBox({
          title: '自定义消息',
          message: h('p', null, [
            h('span', null, '我是自定义的内容啊 '),
            h('i', { style: 'color: teal' }, 'VNode')
          ])
        })
      },
      openMessageBox2() {
        this.$messageBox({
          center: true,
          title: '自定义消息',
          message: '按钮居中排列'
        })
      }
    }
  }
</script>
<style>
</style>
