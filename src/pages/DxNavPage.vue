<template>
 <div class="wrap-content">
 	<div class="item-content">
	    <dx-heading :level="1">Nav 导航栏</dx-heading>
	    <p>用于导航网页内容</p>
  	</div>
  	<div class="item-content">
	    <dx-heading :level="1">基本用法</dx-heading>
	    <p>侧边栏导航</p>
	    <dx-show-code :htmlString="htmlString" :scriptString="scriptString">
        	<dx-nav :navs="navs"></dx-nav>
	    </dx-show-code>
 	</div>
    <div class="item-content">
      <div style="margin-bottom:2rem">
        <dx-heading :level="1">Nav Attributes</dx-heading>
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
        navs: [
              { title: '用户管理' },
              { title: '商品管理',
                subNavs: [
                  {title: '商品库存', path: ''},
                  {title: '商品销量', path: ''},
                  {title: '供应商', path: ''}
                ]
              },
              { title: '系统管理' },
              { title: '订单管理' },
              { title: '权限管理',
                subNavs: [
                {title: '岗位权限', path: ''},
                {title: '角色权限', path: ''},
                {title: '用户权限', path: ''}
                ]
              },
              { title: '广告管理' }
            ],
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
                            <dx-nav :navs="navs"></dx-nav>
                         </template>`
        this.scriptString = `export default {
                                data(){
                                  return {
                                    navs:[
                                          { title: '用户管理' },
                                          { title: '商品管理',
                                            subNavs: [
                                              {title: '商品库存', path: ''},
                                              {title: '商品销量', path: ''},
                                              {title: '供应商', path: ''}
                                            ]
                                          },
                                          { title: '系统管理' },
                                          { title: '订单管理' },
                                          { title: '权限管理',
                                            subNavs: [
                                            {title: '岗位权限', path: ''},
                                            {title: '角色权限', path: ''},
                                            {title: '用户权限', path: ''}
                                            ]
                                          },
                                          { title: '广告管理' }
                                      ],
                                  }
                                }
                              }`
    }
  }
</script>
<style>
</style>
