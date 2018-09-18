<template>
 <div class="wrap-content">
 	<div class="item-content">
	    <dx-heading :level="1">Star 评分</dx-heading>
	    <p>用于评分级别</p>
  </div>
  <div class="item-content">
	    <dx-heading :level="1">用于评分</dx-heading>
	    <p>用于用户评价</p>
	    <dx-show-code :htmlString="htmlString">
	    	<dx-rate v-model="rate"></dx-rate>
	    </dx-show-code>
  </div>
  <div class="item-content">
      <dx-heading :level="1">只用于显示评分</dx-heading>
      <p>只用于展示用户等评价</p>
      <dx-show-code :htmlString="htmlString1">
        <dx-rate :rating="3" only-display></dx-rate>
      </dx-show-code>
  </div>
   <div class="item-content">
      <dx-heading :level="1">自定义尺寸</dx-heading>
      <p>设置font-size自定义大小尺寸, 单位为rem</p>
      <dx-show-code :htmlString="htmlString2">
        <dx-rate :rating="3" size="2.2" only-display></dx-rate>
      </dx-show-code>
  </div>
  <div class="item-content">
      <dx-heading :level="1">change改变事件</dx-heading>
      <p>当用户改变评级时，触发</p>
      <dx-show-code :htmlString="htmlString3">
           <dx-rate :rating="3" size="small" @change="change"></dx-rate>
      </dx-show-code>
  </div>
  <div class="item-content">
      <div style="margin-bottom:2rem">
        <dx-heading :level="1">Star Attributes</dx-heading>
      </div>
      <dx-table 
      :data="attrDatas" 
      :borderRow="true" 
      tableHeadClass="table-head"
      >
        <dx-table-column prop="param" label="参数" ></dx-table-column>
        <dx-table-column prop="illustrate"  label="说明"></dx-table-column>
        <dx-table-column prop="type"  label="类型"></dx-table-column>
        <dx-table-column prop="defaultVal" label="默认值" width="80"></dx-table-column>
      </dx-table>
  </div>
   <div class="item-content">
      <div style="margin-bottom:2rem">
        <dx-heading :level="1">Event Attributes</dx-heading>
      </div>
      <dx-table 
      :data="eventDatas" 
      :borderRow="true" 
      tableHeadClass="table-head"
      >
        <dx-table-column prop="eventName" label="事件名称" ></dx-table-column>
        <dx-table-column prop="illustrate"  label="事件说明"></dx-table-column>
        <dx-table-column prop="cbArgs"  label="回调参数"></dx-table-column>
      </dx-table>
  </div>
 </div>
</template>
<script>
  export default {
    data() {
      return {
        rate: null,
        htmlString: '',
        attrDatas: [
                    {
                      param: 'rating',
                      illustrate: '设置评分的级别',
                      type: 'Number',
                      optionVal:'---',
                      defaultVal: '0'
                    },
                    {
                      param: 'size',
                      illustrate: '设置评分的尺寸',
                      type: 'String',
                      optionVal:'---',
                      defaultVal: '---'
                    },
                     {
                      param: 'only-display',
                      illustrate: '设置为只读',
                      type: 'Boolean',
                      optionVal:'---',
                      defaultVal: 'false'
                    }
                  ],
        eventDatas: [
                    {
                      eventName: 'change',
                      illustrate: '评分级别改变时，触发该事件',
                      cbArgs: '评分级别，为(1-5)Number类型'
                    }]
      }
    },
    created() {
        // 基本用法
        this.htmlString = `<template> 
                              <dx-rate v-model="rate"></dx-rate>
                            </template>`
        this.htmlString1 = `<template> 
                              <dx-rate :rating="3" only-display></dx-rate>
                            </template>`
        this.htmlString2 = `<template> 
                              <dx-rate :rating="3" size="22" only-display></dx-rate>
                            </template>`
        this.htmlString3 = `<template> 
                              <dx-rate :rating="3" size="small" @change="change"></dx-rate>
                            </template>`
    },
    methods: {
      change(rate) {
        console.log(rate)
      }
    }
  }
</script>
<style>
</style>
