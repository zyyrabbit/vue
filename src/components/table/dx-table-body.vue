<template>
 	<table 
 		ref="table" 
 		:class="{'vertical':borderColumn,'horizontal':borderRow}" 
 		class="dx-table-body"
 	>
	 	<colgroup>
	 	  	<col 
	 	  		v-for="column in columns" 
	 	  		:key="column.id" 
	 	  		:width="column.width" 
	 	  		:name="column.id"
	 	  	/>
	 	</colgroup>
	 	<thead 
	 		:class="[tableHeadClass]"
	 		class="dx-table-body-table-head" 
	 	> 
	 	     <!-- 表格标题 -->
	 	   	<tr>
	 	   		<th 
	 	   			v-for="column in columns" 
	 	   			:key="column.id" 
	 	   			@click="toggleSortData(column)"
	 	   		>
	 	   			<span v-if="!column.isExpand && column.selectable">
	 	      	    	<input 
	 	      	    		ref="selectedAll"
	 	      	    		class="dx-table-body-checkbox" 
	 	      	    		type="checkbox" 
	 	      	    		@click="toggleSelectAllRows($event.target.checked)"
	 	      	    	>
	 	      	    </span>
	 	      	    <span v-else-if="!column.isExpand">
	 	      	    	{{column.renderHeader(column.label)}}
		 	   			<span 
		 	   				v-if="column.sortable" 
		 	   				class="dx-table-body-sort-index"
		 	   			>
			 	   			<i 
			 	   				:class="{'sort-active':column.reverse !== 'descending'}" 
			 	   				class="fa fa-caret-up dx-table-body-icon-up" 
			 	   				aria-hidden="true"
			 	   			>
			 	   			</i>
			 	   			<i :class="{'sort-active':column.reverse === 'descending'}" 
			 	   				class="fa fa-caret-down dx-table-body-icon-down" 
			 	   				aria-hidden="true"
			 	   			>
			 	   			</i>
		 	   			</span>
	 	   			</span>
	 	   		</th>
	 	   	</tr>
	 	</thead>
	 	<tbody 
	 		:class="[tableBodyClass]" 
	 		class="dx-table-body-table-body"
	 	>
	 	  	<!-- 表格内容 -->
	 	    <tr v-for="(row,index) in data" 
	 	    	:key="index"
	 	    >
	 	      	<td v-for="column in columns" 
	 	      		:key="column.id"
	 	      	>
	 	      	    <span 
	 	      	    	v-if="column.selectable" 
	 	      	    	key="select"
	 	      	    >
	 	      	    	<input  
	 	      	    		class="dx-table-body-checkbox" 
	 	      	    		type="checkbox" 
	 	      	    		@click="toggleSelectRow(index)"
	 	      	    	>
	 	      	    </span>
	 	      	    <span 
	 	      	    	v-else-if="column.label === '操作' && (handleEdit || handleDelete)"
	 	      	    	key="handle"
	 	      	    >
	 	      	    	<dx-button 
	 	      	    		v-if="handleEdit"  
	 	      	    		type="primary" 
	 	      	    		icon="pencil" 
	 	      	    		size="small"
	 	      	    		@dx-button-click="handleEdit(index,row)"
	 	      	    	>
	 	      	    		编辑
	 	      	    	</dx-button>
	 	      	    	<dx-button 
	 	      	    		v-if="handleDelete"  
	 	      	    		type="warning" 
	 	      	    		icon="trash" 
	 	      	    		size="small"
	 	      	    		@dx-button-click="handleDelete(index,row)"
	 	      	    	>
	 	      	    		删除
	 	      	    	</dx-button>
	 	      	    </span>
	 	      	   	<dx-table-cell 
	 	      	   		v-else 
	 	      	   		:index="index"
	 	      	   		:column="column" 
	 	      	   		:row="row" 
	 	      	   	/>
	 	      	</td>	
	 	    </tr>
	 	</tbody>
 	</table>
</template> 
<script>
import DxTableCell from './dx-table-cell.js'
// table-body组件
export default {
	components: {
		DxTableCell
	},
	props: {

		store: {
			required: true
		},
		borderColumn: {
			type: Boolean,
			default: false
		},
		borderRow: {
			type: Boolean,
			default: false
		},
		tableHeadClass: String,
		tableBodyClass: String,
		handleEdit: Function,
		handleDelete: Function
	},
	computed: {
		// 找到父table组件
		parent() {
			return this.$parent
		},
		states() {
			return this.store.states
		},
		columns() {
			return this.states.columns
		},
		data() {
			return this.states.data
		},
		selectHead() {
			// 需要判断是否存在选择列，通过表格标题栏来判断
			return this.$refs.selectedAll && this.$refs.selectedAll[0]
		},
		table() {
			return this.$refs.table
		}
	},
	created() {
		const self = this
		this.parent.$on('clear-all-select', function() {
			// 在清除按钮点击事件时，需要判断是否存在按钮
			if (self.selectHead) {
				self.selectHead.checked = false
				self.toggleSelectAllRows(false)
			}
		})
	},
	methods: {
		// 切换排序
		toggleSortData: function(column) {
			if (column.sortable) {
				this.store.commit('sortData', column)
				column.reverse = column.reverse === 'descending' ? 'increaing' : 'descending'
			}
		},
		// 选择单行数据
		toggleSelectRow: function(index) {
			// this.$refs.selectedAll为什么是数组？
			this.selectHead.checked = false
			this.store.commit('toggleSelectData', index)
		},
		// 点击头部的全部选中
		toggleSelectAllRows: function(isCheckedAll) {
			// 优化一下
			let inputs = this.table.querySelectorAll(".dx-table-body input[type='checkbox']")
			Array.prototype.map.call(inputs, function(value) {
				value.checked = isCheckedAll
			})
			this.store.commit('toggleSelectAllDatas', isCheckedAll)
		}
	}
}
</script>
<style>
	.dx-table-body{
		/*border-spacing: 30px;*/
		/*合并表格边框*/
		border-collapse: collapse;
		font-size:1.6rem;
		width:100%;
		color:#5e6d82;
		cursor: default;
		/*border:0.1rem solid #aaa;*/
		/*table-layout: fixed;*/
	}
	/*表格默认表格单元样式*/
	.dx-table-body th,td{
		text-align:left;
		padding:1rem;
		padding-left:2rem;
	}
	/*是否显示竖直边框*/
	.dx-table-body.vertical{
		border:0;
		border-left:0.1rem solid #ddd;
	}
	.dx-table-body.vertical th,.dx-table-body.vertical td{
		border-right:0.1rem solid #ddd;
	}
	/*表格是否显示行边框*/
	.dx-table-body.horizontal{
		border:0;
		border-top:0.1rem solid #ddd;
	}
	.dx-table-body.horizontal th,.dx-table-body.horizontal td{		
		border-bottom:0.1rem solid #ddd;
	}
	.dx-table-body.vertical.horizontal{
		border-top:0.1rem solid #ddd;
		border-left:0.1rem solid #ddd;
	}
	/*表格行，鼠标滑过样式*/
	.dx-table-body tbody tr:hover{
		background:#eef1f6;
	}

	/*表格排序指示器*/
	.dx-table-body-sort-index{
		position:relative;
		margin-left:0.3rem;
	}
	.dx-table-body-icon-up,.dx-table-body-icon-down{
		position:absolute;
		color:#aaa;
	}
	.dx-table-body-icon-up{
		top:-0.1rem;
	}
	.dx-table-body-icon-down{
		bottom:-0.1rem;
	}
	.dx-table-body.sort-active{
		color:#000;
	}
	/*如果设置可以选择，checkbox按钮样式*/
	.dx-table-body-checkbox{
		display:inline-block;
		width:1.8rem;
		height:1.8rem;
		background:#fff;
		color:#fff;
	}
</style>