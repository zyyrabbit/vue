<template>
 <div class="wrap-content">
 	<div class="item-content">
	    <dx-heading :level="1">Notify 消息通知</dx-heading>
	    <p>用于全局的消息通过通知</p>
  </div>
  <div class="item-content">
	    <dx-heading :level="1">基本用法</dx-heading>
	    <p>默认消息通知</p>
	    <dx-show-code :htmlString="htmlString1"  :scriptString="scriptString1">
        <dx-button @dx-button-click="open()">自动关闭</dx-button>
        <dx-button @dx-button-click="open1()">消息内容为Vnode</dx-button>
        <dx-button @dx-button-click="open2()" type="primary">不会自动关闭</dx-button>
	    </dx-show-code>
  </div>
  <div class="item-content">
      <div style="margin-bottom:2rem">
        <dx-heading :level="1">Notify Attributes</dx-heading>
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
                      param: 'title',
                      illustrate: '消息标题',
                      type: 'String',
                      optionVal: '---',
                      defaultVal: '---'
                    },
                     {
                      param: 'content',
                      illustrate: '消息内容',
                      type: 'String,vnode',
                      optionVal: '---',
                      defaultVal: '---'
                    },
                     {
                      param: 'duration',
                      illustrate: '消息提示持续时间，单位必须为毫秒！如果为0，表示不会自动关闭',
                      type: 'Numer',
                      optionVal: '---',
                      defaultVal: '8000ms'
                    }
                  ]
      }
    },
    created() {
    // 基本用法
        this.htmlString1 = `<template> 
                                <dx-button @dx-button-click="open()">自动关闭</dx-button>
                                <dx-button @dx-button-click="open2()" type="primary">不会自动关闭</dx-button>
                         </template>`
        this.scriptString1 = `export default {
          methods: {
            open() {
                this.$notify({
                  title: '提示' + this.ind++,
                  content: '自动关闭'
                })
            },
            open1() {
              let h = this.$createElement
              this.$notify({
                title: '提示' + this.ind++,
                content: h('div', {}, ['自定义vnode'])
              })  
            },
            open2() {
                this.$notify({
                  duration: 0,
                  title: '提示' + this.ind++,
                  content: '不会自动关闭'
                })
            }
              }
        }`
    },
    methods: {
        open() {
            this.$notify({
              title: '提示' + this.ind++,
              content: '自动关闭'
            })
        },
        open1() {
            let h = this.$createElement
            this.$notify({
              title: '提示' + this.ind++,
              content: h('div', {}, ['自定义vnode'])
            })  
        },
        open2() {
            this.$notify({
              duration: 0,
              title: '提示' + this.ind++,
              content: '不会自动关闭'
            })
        }
    }
  }
</script>

