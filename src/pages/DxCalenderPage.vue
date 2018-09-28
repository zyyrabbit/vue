<template>
 <div class="wrap-content">
 	  <div class="item-content">
	    <dx-heading :level="1">Calender 日历</dx-heading>
	    <p>用于表示日历组件</p>
  	</div>
  	<div class="item-content">
	    <dx-heading :level="1">基本用法</dx-heading>
	    <p>基本日历展示</p>
	    <dx-show-code :htmlString="htmlString">
        <div style="width: 50%;">
          <dx-calendar></dx-calendar>
        </div>
	    </dx-show-code>
    </div>
    <div class="item-content">
      <dx-heading :level="1">只显示当前月份</dx-heading>
      <p>当前月份</p>
      <dx-show-code :htmlString="htmlString1">
        <div style="width: 50%;">
          <dx-calendar currentMonth></dx-calendar>
        </div>
      </dx-show-code>
    </div>
    <div class="item-content">
      <dx-heading :level="1">自定义日历天数显示</dx-heading>
      <dx-show-code :htmlString="htmlString2">
        <div style="width: 50%;">
          <dx-calendar>
              <div 
                slot-scope="slotProps"
              >
                {{ '*' + slotProps.date + '*' }}
              </div>
          </dx-calendar>
        </div>
      </dx-show-code>
 	  </div>
    <div class="item-content">
      <div style="margin-bottom:2rem">
        <dx-heading :level="1">Calender Attributes</dx-heading>
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
           <dx-heading :level="1">Calender Event</dx-heading>
         </div>
         <dx-table 
         :data="eventDatas" 
         :borderRow="true" 
         tableHeadClass="table-head"
         >
          <dx-table-column prop="eventName"  label="事件名称" ></dx-table-column>
          <dx-table-column prop="illustrate"  label="说明"></dx-table-column>
          <dx-table-column prop="cbArgs"  label="回调参数"></dx-table-column>
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
                      param: 'size',
                      illustrate: '日历组件，显示天数',
                      type: 'Number',
                      optionVal: '35, 42',
                      defaultVal: '42'
                     },
                     {
                      param: 'currentMonth',
                      illustrate: '只显示当前月份',
                      type: 'Boolan',
                      optionVal: '---',
                      defaultVal: 'false'
                     }
                  ],
        eventDatas: [
                    {
                      eventName: 'month-change',
                      illustrate: '当改变月份时，触发',
                      cbArgs: '改变后当前月份(0-11)'
                    },
                     {
                      eventName: 'year-change',
                      illustrate: '当改变年份时，触发',
                      cbArgs: '改变后当前年份'
                    }
                  ]
      }
    },
    created() {
    // 基本用法
        this.htmlString = `<template> 
                            <dx-calendar></dx-calendar>
                         </template>`
        this.htmlString1 = `<template> 
                            <dx-calendar currentMonth></dx-calendar>
                         </template>`
        this.htmlString2 = `<template> 
                              <dx-calendar>
                                 <div 
                                    slot-scope="slotProps"
                                  >
                                    {{ slotProps.date }}
                                  </div>
                              </dx-calendar>
                         </template>`
    }
  }
</script>
<style lang="scss">
/* @include e(calendar) {
        margin: {
          top: 0.3rem;
        }
        @include m(item) {
          padding-bottom: 0.22rem;
          width: 0.57rem;
          margin: 0 auto;
          >p:nth-child(1) {
            width: 0.57rem;
            height: 0.57rem;
            text-align: center;
            line-height: 0.57rem;
            color: #7E7E7E;
            border-radius: 50%;
            @include when(sign) {
              background-color: #8DD0EC;
              color: #FFFFFF!important;
            }
            @include when(today) {
              border: 0.03rem solid #8DD0EC;
              color: #8DD0EC;
            }
          }
        }
      } */
</style>
