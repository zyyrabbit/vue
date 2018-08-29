<template>
 <div class="wrap-content">
 	<div class="item-content">
	    <dx-heading :level="1">Pagination 分页</dx-heading>
	    <p>当数据较多时，可选用分页功能</p>
  	</div>
  	<div class="item-content">
	    <dx-heading :level="1">基本用法</dx-heading>
	    <p>最基本的分页功能，包含向前和向后按钮</p>
	    <dx-show-code :htmlString="htmlString1">
        	<dx-pagination  :total = "50" :current-page="1"></dx-pagination>
	    </dx-show-code>
 	  </div>
    <div class="item-content">
      <dx-heading :level="1">带有显示当前页和总共页说明</dx-heading>
      <dx-show-code :htmlString="htmlString2">
          <dx-pagination  :total = "50" :current-page="1" :showPageInfo="true"></dx-pagination>
      </dx-show-code>
    </div>
    <div class="item-content">
      <dx-heading :level="1">带有跳转功能的分页组件</dx-heading>
      <dx-show-code :htmlString="htmlString3">
          <dx-pagination  :total = "50" :current-page="1" :showJumpPage="true"></dx-pagination>
      </dx-show-code>
    </div>
    <div class="item-content">
      <dx-heading :level="1">可选择每页多少条数功能</dx-heading>
      <dx-show-code :htmlString="htmlString4">
          <dx-pagination  :total = "50" :current-page="1" :showPageSize="true"></dx-pagination>
      </dx-show-code>
    </div>
    <div class="item-content">
      <div style="margin-bottom:2rem">
        <dx-heading :level="1">pagination Attributes</dx-heading>
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
           <dx-heading :level="1">pagination Event</dx-heading>
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
    data(){
      return {
      	
        attrDatas:[
                    { param:'total',illustrate:'显示的数据个数',type:'Number',optionVal:'---',defaultVal:'0'},
                    { param:'showPageInfo',illustrate:'是否添加当前分页和共多少分页信息',type:'Boolean',optionVal:'---',defaultVal:'false'},
                    { param:'showPageSize',illustrate:'是否添加改变当前页面的调试选择框',type:'Boolean',optionVal:'---',defaultVal:'false'},
                    { param:'showJumpPage',illustrate:'是否添加跳转页面功能',type:'Boolean',optionVal:'---',defaultVal:'false'},
                    { param:'currentPage',illustrate:'设置当前页',type:'Number',optionVal:'---',defaultVal:'---'},
                    { param:'pageSize',illustrate:'设置每页显示的条数',type:'Number',optionVal:'---',defaultVal:'5'},
                    { param:'pageSizes',illustrate:'如果添加改变每页显示条数选择框,则可以传入一个分页数组',type:'Array',optionVal:'---',defaultVal:'[5,10,20,40,70]'}
                  ],
        eventDatas:[
                    { eventName:'change-page',illustrate:'点击页面页码时触发的事件',cbArgs:'回调参数为相应页码'}
                  ]
      }
    },
    created(){
    	// 基本用法
        this.htmlString1 =`<template> 
                            <dx-pagination  :total = "50" :current-page="1"></dx-pagination>
                         </template>`;
        this.htmlString2 =`<template> 
                            <dx-pagination  :total = "50" :current-page="1" :showPageInfo="true"></dx-pagination>
                         </template>`;
        this.htmlString3 =`<template> 
                            <dx-pagination  :total = "50" :current-page="1" :showJumpPage="true"></dx-pagination>>
                         </template>`;
        this.htmlString4 =`<template> 
                            <dx-pagination  :total = "50" :current-page="1" :showPageSize="true"></dx-pagination>
                         </template>`;
        // this.scriptString = `export default {
        //                         data(){
        //                           return {
        //                             navs:[
        //                                   {title:'一级标题',path:''},
        //                                   {title:'一级标题',path:'',subNavs:[{title:'二级标题',path:''}]},
        //                                   {title:'一级标题',path:''}
        //                                 ],
        //                           }
        //                         }
        //                       }`;
    }
  }
</script>
<style>
</style>
