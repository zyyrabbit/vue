<template>
	<div class="dx-tabel--wrap">
	    <div style="display:none">
	    	<slot></slot>
	    </div>
	    <div 
	    	v-if="states.hasFilter"
	    	class="dx-tabel-query-wrap" 
	    >
	    	<span 
	    		v-for="(column,index) in filterColumns" 
	    		:key="index" 
	    	>
	    		<dx-input 
	    			v-model="column.filterValue"
	    		>
	    			{{column.label}}:
	    		</dx-input>
	    	</span>
	    	<span class="dx-tabel-query-btn">
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
			class="dx-tabel-not-find"
		>
			没有找到符合条件的数据
		</div>
		<div 
			v-if="pagination"
			class="dx-tabel-pagination-wrap"
		>
			<dx-pagination  
				:total = "data.length" 
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
				this.store.commit('setData', this.data.slice(start, end))
			}
		}
	}
</script>

<style lang="scss">
	
	.dx-tabel-query-wrap {
		margin-bottom:2rem;
	}

	.dx-tabel-query-btn {
		margin-left:2rem;
	}

	/*没有找到数据时的样式*/
	.dx-tabel-not-find{
		border:0.1rem solid #ddd;
		border-top:0;
		line-height:4rem;
		font-size:1.6rem;
		text-align:center;
	}
	.dx-tabel-pagination-wrap{
		margin-top:1rem;
		text-align:right;
	} 

</style>