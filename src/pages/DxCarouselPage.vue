<template>
 <div class="wrap-content">
 	<div class="item-content">
	    <dx-heading :level="1">Carousel 轮播(至少三张图片)</dx-heading>
	    <p>用于图片展示</p>
  </div>
  <div class="item-content">
	    <dx-heading :level="1">基本用法</dx-heading>
	    <p>轮播的基础用法</p>
	    <dx-show-code :htmlString="htmlString1" :scriptString="scriptString">
	    	<dx-carousel :imageUrls="imgUrls" width="100%" height="300px"></dx-carousel>
	    </dx-show-code>
  </div>
  <div class="item-content">
      <div style="margin-bottom:2rem">
        <dx-heading :level="1">Carousel Attributes</dx-heading>
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
  import pic1 from '../images/carousel/1.jpg'
  import pic2 from '../images/carousel/2.jpg'
  import pic3 from '../images/carousel/3.jpg'
  import pic4 from '../images/carousel/4.jpg'

  export default {
    data() {
      return {
        htmlString1: '',
        scriptString: '',
        attrDatas: [
                    {
                      param: 'width',
                      illustrate: '轮播图片宽度',
                      type: 'String',
                      defaultVal: '---'
                    },
                    {
                      param: 'heihgt',
                      illustrate: '轮播图片高度',
                      type: 'String',
                      defaultVal: '---'
                    },
                    {
                      param: 'background',
                      illustrate: '是否采用background模式',
                      type: 'Boolean',
                      defaultVal: 'false'
                    },
                    {
                      param: 'imgUrls',
                      illustrate: '轮播图片地址',
                      type: 'Array',
                      defaultVal: '[ ]'
                    }
                  ],
        imgUrls: [
                    pic1,
                    pic2,
                    pic3,
                    pic4
                  ]
      }
    },
    created() {
    // 基本用法
        this.htmlString1 = `<template> 
                              <dx-carousel :imageUrls="imgUrls" width="100%" height="300px"></dx-carousel>
                            </template>`
        this.scriptString = `export default {
                                data() {
                                  return {
                                      imgUrls: [
                                                'images/carousel/1.jpg',
                                                'images/carousel/2.jpg',
                                                'images/carousel/3.jpg',
                                                'images/carousel/4.jpg'
                                              ]
                                    }
                                }
                              }`
    }
  }
</script>
<style>
</style>
