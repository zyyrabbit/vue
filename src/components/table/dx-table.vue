<template>
	<div class="dx-table">
	    <div style="display:none">
	    	<slot></slot>
	    </div>
	    <div 
	    	v-if="states.hasFilter"
	    	class="dx-table__query" 
	    >
	    	<span 
	    		v-for="(column, index) in filterColumns" 
	    		:key="index" 
	    	>
	    		<dx-input
	    			class="dx-table__query--input"
	    			v-model="column.filterValue"
	    		>
	    			{{column.label}}:
	    		</dx-input>
	    	</span>
	    	<span class="dx-table__query--btn">
	    		<dx-button   
	    			icon="search" 
	    			type="primary" 
	    			@dx-button-click="filterData()"
	    		>
	    			查询
	    		</dx-button>
	    	</span>
	    </div>
		<div>
		     <dx-table-body  
		      :store="store" 
		      :borderRow="borderRow" 
		      :tableHeadClass="tableHeadClass" 
		      :borderColumn="borderColumn" 
		      :tableBodyClass="tableBodyClass"
		      :handleEdit="handleEdit"
		      :handleDelete="handleDelete"
		      />
		</div>
		<div 
			v-if="states.hasFilter && states.data.length === 0" 
			class="dx-table--not-find"
		>
			没有找到符合条件的数据
		</div>
		<div 
			v-if="pagination"
			class="dx-table--pagination-wrap"
		>
			<dx-pagination  
				:total="data.length" 
				:current-page="1" 
				:show-page-info="true" 
				:show-jump-page="true" 
				:show-page-size="true" 
				:page-size="pageSize"
				@dx-pagination-page-update="changePage"
			/>
		</div>
	</div>
</template>
<script>
    import Store from './table-store.js'
    import DxTableBody from './dx-table-body.vue'
    let tableId = 0
	export default{
		name: 'DxTable',
		components: {
			DxTableBody
		},
		props: {
			data: {
				type: Array,
				default: function() {
					return []
				}
			},
			// 是否显示表格行border
			borderRow: {
				type: Boolean,
				default: false
			},
			// 是否显示表格行border
			borderColumn: {
				type: Boolean,
				default: false
			},
			tableHeadClass: String, // 表格头部自定义样式
			tableBodyClass: String, // 表格body自定义样式
			handleEdit: Function,
			handleDelete: Function,
			pagination: {
				type: Boolean,
				default: false
			},
			pageSize: {
				type: Number,
				default: 5
			}
		},
		data() {
			// 初始化table-store
			const store = new Store(this)
			return {
				store
			}
		},
		computed: {
			columns() {
				return this.store.states.columns
			},
			states() {
				return this.store.states
			},
			filterColumns() {
				return this.store.states.columns.filter((column) => {
					return column.filterable
				})
			}
		},
		watch: {
			data: {
				immediate: true,
				handler(val) {
				// 如果设置分页则初始化时候，
				if (this.pagination) {
				val = val.slice(0, this.pageSize)
				}
				this.store.commit('setData', val)
				}
			}
        },
        created() {
			this.tableId = 'DxTable' + '-' + tableId++
		},
		methods: {
			filterData: function() {
				this.store.commit('filterData')
			},
			changePage: function(newPage) {
				let start = (newPage.currentPage - 1) * newPage.pageSize
				let	end = start + newPage.pageSize
				// console.log(start, end, this.data, this.data.slice(start, end))
				this.store.commit('setData', this.data.slice(start, end))
			}
		}
	}
</script>

<style lang="scss">
	@include B(table) {
		@include E(query) {
			margin-bottom: 2rem;
			@include M(input) {
				line-height: $--dx-table-query-input-line-height;
				height: $--dx-table-query-input-height;
				max-width: 40%;
				margin-right: 2rem;
			}
		}

		@include M(not-find) {
			border: 0.1rem solid #ddd;
			border-top: 0;
			line-height: $--dx-table-line-height-not-find;
			font-size: $--dx-table-font-size-not-find;
			text-align: center;
		}

		@include M(pagination-wrap) {
			margin-top: 1rem;
			text-align: right;
		}
	}

</style>