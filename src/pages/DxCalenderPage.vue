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
      <dx-heading :level="1">自定义日历天数显示</dx-heading>
      <dx-show-code :htmlString="htmlString1">
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
                      param: 'navs',
                      illustrate: '导航标题栏，支持二级标题导航',
                      type: 'Array',
                      optionVal: '---',
                       defaultVal: '---'
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
