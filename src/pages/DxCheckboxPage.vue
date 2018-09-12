<template>
 <div class="wrap-content">
  <div class="item-content">
      <dx-heading :level="1">Checkbox 多选框</dx-heading>
      <p>单选框用于从一组数据中选择多个数据</p>
    </div>
     <div class="item-content">
        <dx-heading :level="1">基本用法</dx-heading>
        <p>多选框的基本类型</p>
        <dx-show-code :htmlString="htmlString1" :scriptString="scriptString">
            <dx-checkbox-group v-model="checkList">
                <dx-checkbox label="标签1"></dx-checkbox>
                <dx-checkbox label="标签2"></dx-checkbox>
                <dx-checkbox label="标签3"></dx-checkbox>
                <dx-checkbox label="标签4"></dx-checkbox>
            </dx-checkbox-group>
        </dx-show-code>
    </div>

    <div class="item-content">
        <dx-heading :level="1">标签类型用法</dx-heading>
        <p>多选框的标签类型</p>
        <dx-show-code :htmlString="htmlString2" :scriptString="scriptString">
            <dx-checkbox-group v-model="checkList">
                <dx-checkbox label="标签1" btnType></dx-checkbox>
                <dx-checkbox label="标签2" btnType></dx-checkbox>
                <dx-checkbox label="标签3" btnType></dx-checkbox>
                <dx-checkbox label="标签4" btnType></dx-checkbox>
            </dx-checkbox-group>
        </dx-show-code>
    </div>

    <div class="item-content">
        <dx-heading :level="1">禁止选中</dx-heading>
        <p>禁止选中某个多选框</p>
        <dx-show-code :htmlString="htmlString3" :scriptString="scriptString">
            <dx-checkbox-group v-model="checkList">
                <dx-checkbox label="标签1" ></dx-checkbox>
                <dx-checkbox label="标签2" ></dx-checkbox>
                <dx-checkbox label="标签3" disabled></dx-checkbox>
                <dx-checkbox label="标签4" ></dx-checkbox>
            </dx-checkbox-group>
        </dx-show-code>
    </div>
  
    <div class="item-content">
      <div style="margin-bottom:2rem">
        <dx-heading :level="1">checkbox Attributes</dx-heading>
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
        checkList: ['标签1'],
        checkList1: ['标签1'],
        checkList2: ['标签1'],
        htmlString1: '',
        htmlString2: '',
        htmlString3: '',
        scriptString: '',
        attrDatas: [
                    {
                      param: 'label',
                      illustrate: '多选框标签，必须',
                      type: 'String',
                      optionVal: '---',
                      defaultVal: '---'
                    },
                    {
                      param: 'disabled',
                      illustrate: '禁用多选框',
                      type: 'Boolean',
                      optionVal: '---',
                      defaultVal: 'false'
                    },
                    {
                      param: 'name',
                      illustrate: '原生name属性',
                      type: 'String',
                      optionVal: '---',
                      defaultVal: '---'
                    },
                    {
                      param: 'btnType',
                      illustrate: '设置为标签格式',
                      type: 'Boolean',
                      optionVal: '---',
                      defaultVal: 'false'
                    },
                    {
                      param: 'value',
                      illustrate: '多选框绑定的值，如果为空，label值',
                      type: 'any',
                      optionVal: '---',
                      defaultVal: '---'
                    }
                  ]
      }
    },
    created() {
        // 基本用法
        this.htmlString1 = `<template> 
                                <dx-checkbox-group v-model="checkList">
                                    <dx-checkbox label="标签1"></dx-checkbox>
                                    <dx-checkbox label="标签2"></dx-checkbox>
                                    <dx-checkbox label="标签3"></dx-checkbox>
                                    <dx-checkbox label="标签4"></dx-checkbox>
                                </dx-checkbox-group>
                         </template>`
        this.htmlString2 = `<template> 
                                <dx-checkbox-group v-model="checkList">
                                    <dx-checkbox label="标签1" btnType></dx-checkbox>
                                    <dx-checkbox label="标签2" btnType></dx-checkbox>
                                    <dx-checkbox label="标签3" btnType></dx-checkbox>
                                    <dx-checkbox label="标签4" btnType></dx-checkbox>
                                </dx-checkbox-group>
                           </template>`
        this.scriptString = `export default {
                                          data() {
                                  return {
                                    checkList: ['标签1']
                                  }
                                }
                              }`
        this.htmlString3 = `<template> 
                                 <dx-checkbox-group v-model="checkList">
                                    <dx-checkbox label="标签1" ></dx-checkbox>
                                    <dx-checkbox label="标签2" ></dx-checkbox>
                                    <dx-checkbox label="标签3" disabled></dx-checkbox>
                                    <dx-checkbox label="标签4" ></dx-checkbox>
                                </dx-checkbox-group>
                           </template>`
    }
  }
</script>
<style>
</style>
