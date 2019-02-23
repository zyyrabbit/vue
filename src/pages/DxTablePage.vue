<template>
	<div class="wrap-content">
		<div class="item-content">
		    <dx-heading :level="1">table 表格</dx-heading>
		    <p>当数据较多，一般用表格显示数据</p>
 		</div>
		<div class="item-content">
			 <dx-heading :level="1">基本用法</dx-heading>
	    	<p>表格基本数据显示</p>
	    	<dx-show-code :htmlString="htmlString1" :scriptString="scriptString1">
		    	 <dx-table 
			    :data="tableData" 
			    :borderRow="true" 
			    :borderColumn="true"
			    >
			        <dx-table-column prop="name"  label="姓名" ></dx-table-column>
			        <dx-table-column prop="age"  label="年龄" ></dx-table-column>
			        <dx-table-column prop="sex"  label="性别"></dx-table-column>
			        <dx-table-column prop="height" label="身高" ></dx-table-column>
			        <dx-table-column prop="blood" label="血型"></dx-table-column>
			    </dx-table>
		    </dx-show-code>
    	</div>
    	<div class="item-content">
			<dx-heading :level="1">为表格添加排序功能</dx-heading>
	    	<p>当需要给表格中的数据进行排序</p>
	    	<dx-show-code :htmlString="htmlString2" :scriptString="scriptString1">
		    	 <dx-table 
			    :data="tableData" 
			    :borderRow="true" 
			    :borderColumn="true"
			    >
			        <dx-table-column prop="name"  label="姓名" :sortable="true"></dx-table-column>
			        <dx-table-column prop="age"  label="年龄" :sortable="true"></dx-table-column>
			        <dx-table-column prop="sex"  label="性别"></dx-table-column>
			        <dx-table-column prop="height" label="身高" ></dx-table-column>
			        <dx-table-column prop="blood" label="血型"></dx-table-column>
			    </dx-table>
		    </dx-show-code>
    	</div>
    	<div class="item-content">
			 <dx-heading :level="1">添加选择框列功能</dx-heading>
	    	 <p>可用于需要从表格选择数据</p>
	    	 <dx-show-code :htmlString="htmlString3" :scriptString="scriptString1">
		    	 <dx-table 
			    :data="tableData" 
			    :borderRow="true" 
			    :borderColumn="true"
			    >
			    	<dx-table-column :width="10" :selectable="true"></dx-table-column>
			        <dx-table-column prop="name"  label="姓名" ></dx-table-column>
			        <dx-table-column prop="age"  label="年龄" ></dx-table-column>
			        <dx-table-column prop="sex"  label="性别"></dx-table-column>
			        <dx-table-column prop="height" label="身高" ></dx-table-column>
			        <dx-table-column prop="blood" label="血型"></dx-table-column>
			    </dx-table>
		    </dx-show-code>
		</div>
		<div class="item-content">
			 <dx-heading :level="1">添加输入查询框功能</dx-heading>
	    	<p>用于从表格中查询数据，支持多个字段联查</p>
	    	<dx-show-code :htmlString="htmlString4" :scriptString="scriptString1">
		    	 <dx-table 
			    :data="tableData" 
			    :borderRow="true" 
			    :borderColumn="true"
			    >
			    	<dx-table-column prop="name"  label="姓名" :filterable="true"></dx-table-column>
			        <dx-table-column prop="age"  label="年龄" :filterable="true"></dx-table-column>
			        <dx-table-column prop="sex"  label="性别"></dx-table-column>
			        <dx-table-column prop="height" label="身高" ></dx-table-column>
			        <dx-table-column prop="blood" label="血型"></dx-table-column>
			    </dx-table>
		    </dx-show-code>
		</div>
		<div class="item-content">
			<dx-heading :level="1">添加输入对表格数据编辑/删除按钮</dx-heading>
	    	<p>支持对表格中单行数据进行编辑和删除操作，目前尚不支持自定义字段</p>
	    	<dx-show-code :htmlString="htmlString5" :scriptString="scriptString2">
		    	 <dx-table 
			    :data="tableData" 
			    :borderRow="true" 
			    :borderColumn="true"
			    :handleEdit="handleEdit"
			    :handleDelete="handleDelete"
			    >
			        <dx-table-column prop="name"  label="姓名" ></dx-table-column>
			        <dx-table-column prop="age"  label="年龄" ></dx-table-column>
			        <dx-table-column prop="sex"  label="性别"></dx-table-column>
			        <dx-table-column prop="height" label="身高" ></dx-table-column>
			        <dx-table-column prop="blood" label="血型"></dx-table-column>
			        <dx-table-column label="操作"></dx-table-column>
			    </dx-table>
		    </dx-show-code>
		</div>
		<div class="item-content">
			 <dx-heading :level="1">添加表格分页功能</dx-heading>
	    	<p>当表格数据较多时，可采用分页功能</p>
	    	<dx-show-code :htmlString="htmlString5" :scriptString="scriptString2">
		    	 <dx-table 
			    :data="tableData1" 
			    :borderRow="true" 
			    :borderColumn="true"
			    :pagination="true"
			    >
			    	<dx-table-column prop="name"  label="姓名"></dx-table-column>
			        <dx-table-column prop="age"  label="年龄"></dx-table-column>
			        <dx-table-column prop="sex"  label="性别"></dx-table-column>
			        <dx-table-column prop="height" label="身高" ></dx-table-column>
			        <dx-table-column prop="blood" label="血型"></dx-table-column>
			    </dx-table>
		    </dx-show-code>
		</div>
		<div class="item-content">
	      <div style="margin-bottom:2rem">
	        <dx-heading :level="1">Table Attributes</dx-heading>
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
	         <dx-heading :level="1">Table Event</dx-heading>
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
 		 <div class="item-content">
	      <div style="margin-bottom:2rem">
	        <dx-heading :level="1">Table-column Attributes</dx-heading>
	      </div>
	      <dx-table 
	      :data="attrDatas1" 
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
	export default{
		data() {
			return {
				tableData: [
                    {name: 'abc', age: 26, sex: '男', height: '171cm', blood: 'O'},
                    {name: 'lxf', age: 26, sex: '女', height: '163cm', blood: 'B'},
                    {name: 'zsj', age: 22, sex: '女', height: '155cm', blood: 'O'},
                    {name: 'sxy', age: 25, sex: '男', height: '173cm', blood: 'A'},
                    {name: 'jrf', age: 24, sex: '男', height: '165cm', blood: 'C'}
                    ],
				tableData1: [
                    {name: 'abc', age: 26, sex: '男', height: '171cm', blood: 'O'},
                    {name: 'lxf', age: 26, sex: '女', height: '163cm', blood: 'B'},
                    {name: 'zsj', age: 22, sex: '女', height: '155cm', blood: 'O'},
                    {name: 'sxy', age: 25, sex: '男', height: '173cm', blood: 'A'},
                    {name: 'jrf', age: 24, sex: '男', height: '165cm', blood: 'C'},
                    {name: 'zyy1', age: 26, sex: '男', height: '171cm', blood: 'O'},
                    {name: 'lxf1', age: 26, sex: '女', height: '163cm', blood: 'B'},
                    {name: 'zsj1', age: 22, sex: '女', height: '155cm', blood: 'O'},
                    {name: 'sxy1', age: 25, sex: '男', height: '173cm', blood: 'A'},
                    {name: 'jrf1', age: 24, sex: '男', height: '165cm', blood: 'C'},
                    {name: 'zyy2', age: 26, sex: '男', height: '171cm', blood: 'O'},
                    {name: 'lxf2', age: 26, sex: '女', height: '163cm', blood: 'B'},
                    {name: 'zsj2', age: 22, sex: '女', height: '155cm', blood: 'O'},
                    {name: 'sxy2', age: 25, sex: '男', height: '173cm', blood: 'A'},
                    {name: 'jrf2', age: 24, sex: '男', height: '165cm', blood: 'C'}   
                  ],
                attrDatas: [
                    {
						param: 'data',
						illustrate: '表格的输入数据',
						type: 'Array',
						optionVal: '---',
						defaultVal: '[ ]'
					},
                    {
						param: 'reverse',
	                    illustrate: '排序的方向',
	                    type: 'String',
	                    optionVal: 'descending,increaing',
	                    defaultVal: 'descending'
					},
                    {
						param: 'borderRow',
	                    illustrate: '是否为表格添加横线',
	                    type: 'Boolean',
	                    optionVal: '---',
	                    defaultVal: 'false'
					},
                    {
						param: 'borderColumn',
						illustrate: '是否为表格添加竖直线',
						type: 'Boolean',
						optionVal: '---',
						defaultVal: 'false'
                    },
                    {
						param: 'tableHeadClass',
						illustrate: '表格标题栏自定义样式类名',
						type: 'String',
						optionVal: '---',
						defaultVal: '---'
                    },
                    {
						param: 'tableBodyClass',
						illustrate: '表格内容自定义样式类名',
						type: 'String',
						optionVal: '---',
						defaultVal: '---'
                    },
                    {
						param: 'handleEdit',
						illustrate: '当设置表格支持编辑row行数据时回调,函数回调参数为row的index以及row',
						type: 'Function',
						optionVal: '---',
						defaultVal: '---'
                    },
                    {
						param: 'handleDelete',
						illustrate: '当设置表格支持删除row行数据时回调函数,回调参数为row的index以及row',
						type: 'Function',
						optionVal: '---',
						defaultVal: '---'
                    }
                  ],
				eventDatas: [
                    {
						eventName: 'onBefore',
						illustrate: '表格排序前触发的事件',
						cbArgs: '回调参数为排序的列column,排序属性键值,排序的方向'
                    },
                    {
						eventName: 'select-change',
						illustrate: '支持选择数据功能事件',
						cbArgs: '回调参数为包含所有选择的row一个array类型变量'
                    },
                    {
						eventName: 'all-select-change',
						illustrate: '勾选选择全部row数据的会触发的事件',
						cbArgs: '回调参数为包含所有选择的row一个array类型变量'
                    },
                    {
						eventName: 'filter-change',
						illustrate: '过滤表格数据后触发的事件',
						cbArgs: '回调参数为过滤后的包含所有row数据的array类型变量'
                    }
                    ],
                attrDatas1: [
                    {
						param: 'prop',
						illustrate: '表格列显示数据的对象字段键值',
						type: 'String',
						optionVal: '---',
						defaultVal: '---'
                    },
                    {
						param: 'width',
						illustrate: '设置表格列的宽度',
						type: 'Number',
						optionVal: '---',
						defaultVal: '---'
                    },
                    {
						param: 'label',
						illustrate: '设置表格列的title名',
						type: 'String',
						optionVal: '---',
						defaultVal: '---'
                    },
                    {
						param: 'sortable',
						illustrate: '设置该列是否支持排序功能',
						type: 'Boolean',
						optionVal: '---',
						defaultVal: 'false'
                    },
                    {
						param: 'sortMethod',
						illustrate: '自定义的排序函数',
						type: 'Function',
						optionVal: '---',
						defaultVal: '---'
                    },
                    {
						param: 'selectable',
						illustrate: '设置表格是否支持单选功能',
						type: 'Boolean',
						optionVal: '---',
						defaultVal: 'false'
                    },
                    {
						param: 'filterable',
						illustrate: '设置表格是否支持数据过滤功能',
						type: 'Boolean',
						optionVal: '---',
						defaultVal: 'false'
                    }
                  ]
			}
		},
		methods: {
			handleEdit($index, row) {
				console.log(row)
			},
			handleDelete($index, row) {
				console.log(row)
			}
		},
		created() {
		this.htmlString1 = `<template> 
    		<dx-table :data="tableData" :borderRow="true" :borderColumn="true" >
				 <dx-table-column prop="name"  label="姓名" ></dx-table-column>
				 <dx-table-column prop="age"  label="年龄" ></dx-table-column>
				 <dx-table-column prop="sex"  label="性别"></dx-table-column>
				 <dx-table-column prop="height" label="身高" ></dx-table-column>
				 <dx-table-column prop="blood" label="血型"></dx-table-column>
		    </dx-table>
          </template>`
		    this.scriptString1 = `export default {
				data(){
					return {
			        tableData:[
	                    {name:'zyy',age:26,sex:'男',height:'171cm',blood:'O'},
	                    {name:'lxf',age:26,sex:'女',height:'163cm',blood:'B'},
	                    {name:'zsj',age:22,sex:'女',height:'155cm',blood:'O'},
	                    {name:'sxy',age:25,sex:'男',height:'173cm',blood:'A'},
	                    {name:'jrf',age:24,sex:'男',height:'165cm',blood:'C'}
     				]
				}
			  }
   	       }`
	        this.htmlString2 =`<template> 
    		<dx-table :data="tableData" :borderRow="true" :borderColumn="true">
				 <dx-table-column prop="name"  label="姓名" :sortable="true"></dx-table-column>
				 <dx-table-column prop="age"  label="年龄" :sortable="true"></dx-table-column>
				 <dx-table-column prop="sex"  label="性别"></dx-table-column>
				 <dx-table-column prop="height" label="身高" ></dx-table-column>
				 <dx-table-column prop="blood" label="血型"></dx-table-column>
		    </dx-table>
          </template>`
	       this.htmlString3 = `<template> 
    		<dx-table :data="tableData" :borderRow="true" :borderColumn="true" >
			<dx-table-column :width="10" :selectable="true"></dx-table-column>
				 <dx-table-column prop="name"  label="姓名" ></dx-table-column>
				 <dx-table-column prop="age"  label="年龄" ></dx-table-column>
				 <dx-table-column prop="sex"  label="性别"></dx-table-column>
				 <dx-table-column prop="height" label="身高" ></dx-table-column>
				 <dx-table-column prop="blood" label="血型"></dx-table-column>
		    </dx-table>
          </template>`
          this.htmlString4 = `<template> 
    		<dx-table :data="tableData" :borderRow="true" :borderColumn="true">
			     <dx-table-column prop="name" label="姓名" :filterable="true" ></dx-table-column>
				 <dx-table-column prop="age"  label="年龄" :filterable="true" ></dx-table-column>
				 <dx-table-column prop="sex"  label="性别"></dx-table-column>
				 <dx-table-column prop="height" label="身高" ></dx-table-column>
				 <dx-table-column prop="blood" label="血型"></dx-table-column>
		    </dx-table>
          </template>`
         this.htmlString5 = `<template> 
    		<dx-table :data="tableData" :borderRow="true" :borderColumn="true"  :handleEdit="handleEdit" :handleDelete="handleDelete">
			     <dx-table-column prop="name" label="姓名" ></dx-table-column>
				 <dx-table-column prop="age"  label="年龄" ></dx-table-column>
				 <dx-table-column prop="sex"  label="性别"></dx-table-column>
				 <dx-table-column prop="height" label="身高" ></dx-table-column>
				 <dx-table-column prop="blood" label="血型"></dx-table-column>
				 <dx-table-column label="操作"></dx-table-column>
		    </dx-table>
          </template>`
          this.scriptString1 = `export default {
				data(){
					return {
			        tableData:[
	                    {name:'zyy',age:26,sex:'男',height:'171cm',blood:'O'},
	                    {name:'lxf',age:26,sex:'女',height:'163cm',blood:'B'},
	                    {name:'zsj',age:22,sex:'女',height:'155cm',blood:'O'},
	                    {name:'sxy',age:25,sex:'男',height:'173cm',blood:'A'},
	                    {name:'jrf',age:24,sex:'男',height:'165cm',blood:'C'}
     				]
				}
			  }
   	       }`
	    this.scriptString2 = `export default {
				data(){
					return {
			        tableData1:[
                    {name:'zyy',age:26,sex:'男',height:'171cm',blood:'O'},
                    {name:'lxf',age:26,sex:'女',height:'163cm',blood:'B'},
                    {name:'zsj',age:22,sex:'女',height:'155cm',blood:'O'},
                    {name:'sxy',age:25,sex:'男',height:'173cm',blood:'A'},
                    {name:'jrf',age:24,sex:'男',height:'165cm',blood:'C'},
                    {name:'hyp',age:25,sex:'女',height:'163cm',blood:'O'},
                    {name:'yhh',age:26,sex:'男',height:'160cm',blood:'A'},
                    {name:'sc',age:25,sex:'男',height:'173cm',blood:'B'},
                    {name:'zag',age:46,sex:'男',height:'173cm',blood:'O'},
                    {name:'zjh',age:72,sex:'男',height:'162cm',blood:'C'},
                    {name:'clh',age:65,sex:'女',height:'163cm',blood:'C'},
                    {name:'cml',age:29,sex:'男',height:'175cm',blood:'B'},
                    {name:'zcy',age:22,sex:'女',height:'165cm',blood:'B'},
                    {name:'lyw',age:45,sex:'男',height:'160cm',blood:'A'},
                    {name:'lj',age:24,sex:'男',height:'170cm',blood:'C'},
                    {name:'tb',age:25,sex:'男',height:'183cm',blood:'O'},
                    {name:'zxy',age:25,sex:'男',height:'181cm',blood:'B'},
                    {name:'lhx',age:25,sex:'男',height:'185cm',blood:'O'},
                    {name:'yxk',age:27,sex:'男',height:'175cm',blood:'A'},
                    {name:'xxs',age:10,sex:'女',height:'165cm',blood:'C'},
                    {name:'gzs',age:16,sex:'男',height:'171cm',blood:'O'},
                    {name:'dxs',age:21,sex:'女',height:'163cm',blood:'B'},
                    {name:'yjs',age:25,sex:'女',height:'155cm',blood:'O'},
                    {name:'jy',age:30,sex:'男',height:'165cm',blood:'A'},
                    {name:'hjy',age:45,sex:'男',height:'165cm',blood:'C'},
                    {name:'hzy',age:26,sex:'男',height:'173cm',blood:'O'},
                    {name:'xjp',age:56,sex:'男',height:'177cm',blood:'B'},
                    {name:'zjl',age:34,sex:'男',height:'173cm',blood:'O'},
                    {name:'jcw',age:45,sex:'男',height:'179cm',blood:'A'},
                    {name:'sxzj',age:33,sex:'男',height:'173cm',blood:'C'}
                  ]
				}
			  },
			  	methods:{
	      			handleEdit($index,row){
	        		console.log(row);
	      			},
	      			handleDelete($index,row){
	        			console.log(row);
	      			}
    	}
   	       }`
		}
	}
</script>
<style>
</style>