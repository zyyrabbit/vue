<template>
 	<table 
 		ref="table" 
 		:class="{'is-vertical': borderColumn,'is-horizontal': borderRow}" 
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
	 		class="dx-table-body__table-head" 
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
	 	      	    		class="dx-table-body--checkbox" 
	 	      	    		type="checkbox" 
	 	      	    		@click="toggleSelectAllRows($event.target.checked)"
	 	      	    	>
	 	      	    </span>
	 	      	    <span v-else-if="!column.isExpand">
	 	      	    	{{column.renderHeader(column.label)}}
		 	   			<span 
		 	   				v-if="column.sortable" 
		 	   				class="dx-table-body__table-head--sort-index"
		 	   			>
			 	   			<i 
			 	   				:class="{'is-sort-active':column.reverse !== 'descending'}" 
			 	   				class="icon iconfont dx-up dx-table-body__table-head--icon-up" 
			 	   				aria-hidden="true"
			 	   			>
			 	   			</i>
			 	   			<i :class="{'is-sort-active':column.reverse === 'descending'}" 
			 	   				class="icon iconfont dx-down dx-table-body__table-head--icon-down" 
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
	 		class="dx-table-body__table-body"
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
	 	      	    		class="dx-table-body--checkbox" 
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
	 	      	    		@dx-button-click="handleEdit(index, row)"
	 	      	    	>
	 	      	    		编辑
	 	      	    	</dx-button>
	 	      	    	<dx-button 
	 	      	    		v-if="handleDelete"  
	 	      	    		type="warning" 
	 	      	    		icon="trash" 
	 	      	    		size="small"
	 	      	    		@dx-button-click="handleDelete(index, row)"
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
<style lang="scss">
	@include B(table-body) {
		/*border-spacing: 30px;*/
		/*合并表格边框*/
		width: 100%;
		border-collapse: collapse;
		font-size:$--dx-table-body-font-size;
		color: $--dx-table-body-color;
		cursor: default;
		/*border:0.1rem solid #aaa;*/
		/*table-layout: fixed;*/
		/*表格默认表格单元样式*/
		th, td {
			text-align: left;
			padding: 1rem;
			padding-left: 2rem;
		}

		/*表格行，鼠标滑过样式*/
		tbody tr:hover {
			background-color: $--dx-table-body-tr-backgrounde-color-hover;
		}
		/*是否显示竖直边框*/
		@inlcude when(vertical) {
			border: 0;
			border-left: 0.1rem solid #ddd;
			th, td {
				border-right: 0.1rem solid #ddd;
			}
		}

		/*表格是否显示行边框*/
		@inlcude when(horizontal) {
			border: 0;
			border-top: 0.1rem solid #ddd;
			th, td {
				border-bottom: 0.1rem solid #ddd;
			}
		}
		/* 显示行、列边框 */
		@include when(vertical) {
			@include when(horizontal) {
				border-top: 0.1rem solid #ddd;
				border-left: 0.1rem solid #ddd;
				th, td {
					border: 0.1rem solid #ddd;
				}
			}
		}

		@include E(table-head) {
			/*表格排序指示器*/
			@include M(sort-index) {
				position: relative;
				margin-left: 0.3rem;
		    }

		    @include M(icon-up icon-down) {
				position: absolute;
				color: #aaa;
				 @include when(sort-active) {
					color: $--dx-table-body-color-sort-active;
				}
		    }

		    @include M(icon-up) {
				top: -0.2rem;
		    }

		    @include M(icon-down) {
				bottom: -0.2rem;
		    }
		}
		
		/*如果设置可以选择，checkbox按钮样式*/
		@include M(checkbox) {
			display: inline-block;
			width: $--dx-table-body-checkbox-height;
			height: $--dx-table-body-checkbox-height;
			background: $--dx-table-body-checkbox-background-color;
			color: $--dx-table-body-checkbox-color;
		}
	}
</style>