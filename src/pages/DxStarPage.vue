<template>
 <div class="wrap-content">
 	<div class="item-content">
	    <dx-heading :level="1">Star 评级</dx-heading>
	    <p>用于评级级别</p>
  </div>
  <div class="item-content">
	    <dx-heading :level="1">基本用法</dx-heading>
	    <p>Star的基础用法</p>
	    <dx-show-code :htmlString="htmlString">
	    	<dx-star :rating="4"></dx-star>
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
 </div>
</template>
<script>

  export default {
    data() {
      return {
        htmlString: '',
        attrDatas: [
                    {
                      param: 'rating',
                      illustrate: '设置级别',
                      type: 'Number',
                      defaultVal: '0'
                    }
                  ]
      }
    },
    created() {
    // 基本用法
        this.htmlString = `<template> 
                              <dx-star :rating="3"></dx-star>
                            </template>`
    }
  }
</script>
<style>
</style>
