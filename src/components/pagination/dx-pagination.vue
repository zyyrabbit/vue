<template>
	<div class="dx-pagination clearfix">
		<div 
			v-if="showPageInfo" 
			class="dx-pagination-page-info"
		>
			当前第{{internalCurPage}}页/共{{pageCount}}页
		</div>
		<div  
			v-if="showPageSize"
			class="dx-pagination-page-size"
		>
			<dx-select 
				v-model="internalPageSize"
				:items="pageSizes" 
			/>
			<!-- <span>条/每天</span> -->
		</div>
		<div class="dx-pagination-pager">
			<!-- <span class="narrow">&lt;</span> -->
		    <dx-pager 
		    	:activeStyle="activeStyle"  
		    	:current-page="internalCurPage" 
		    	:page-count="pageCount"
		    	@dx-pager-change="changePage"
		    />
		   <!--  <span class="narrow">&gt;</span> -->
		</div>
		<div 
			v-if="showJumpPage" 
			class="dx-pagination-jump-page" 
		>
			跳至
			<input 
				type="text" 
				@keyup.enter="jumpTo" 
			/>
			页
		</div>
	</div>
</template>
<script>
import DxPager from './dx-pager.vue'
export default{
	name: 'DxPagination',
	components: {
		DxPager
	},
	props: {
		showPageInfo: {
			type: Boolean,
			default: false
		},
		showPageSize: {
			type: Boolean,
			default: false
		},
		showJumpPage: {
			type: Boolean,
			default: false
		},
		currentPage: Number,
		total: {
			type: Number,
			default: 0
		},
		pageSize: {
			type: Number,
			default: 5
		},
		pageSizes: {
			type: Array,
			default: function() {
				return [5, 10, 20, 40, 70]
			}
		},
		activeStyle: Object
	},
	data() {
		return {
			internalCurPage: this.currentPage,
			internalPageSize: this.pageSize
		}
	},
	computed: {
		pageCount() {
			if (this.pageSize !== 0) {
				return Math.ceil(this.total / this.internalPageSize)
			}
		}
	},
	watch: {
		internalPageSize(newVal, oldVal) {
			let oldCurPage = this.internalCurPage
			let curIndex = oldCurPage * oldVal

			this.internalCurPage = curIndex > this.total ? Math.ceil(this.total / newVal) : Math.ceil(curIndex / newVal)
			// 这里修复的bug问题，当internalCurPage的值没有改变的触发不了update-page事件
			if (newVal !== oldVal && this.internalCurPage === oldCurPage) {
				this.$emit('dx-pagination-page-update', {currentPage: oldCurPage, pageSize: newVal})
			}
		},
		internalCurPage(newVal) {
			this.$emit('dx-pagination-page-update', {currentPage: newVal, pageSize: this.internalPageSize})
		}

	},
	methods: {
		// 改变页面时
		changePage(page) {
			this.internalCurPage = page
		},
		// 跳转到指定页面
		jumpTo(event) {
			let page = parseInt(event.target.value, 10)
			page = page < 1 ? 1 : page < this.pageCount ? page : this.pageCount
			this.internalCurPage = page
		}
	}
}
</script>
<style lang="scss">
	.dx-pagination {
		font-size: $--dx-pagination-font-size;
		line-height: $--dx-pagination-line-height;
	}
	/*div 使用inline-block 会出现对不齐的问题 给div添加 vertical-align:top;*/
	.dx-pagination>div {
		display: inline-block;
		/*float:left;*/
		vertical-align: top;
	}
	.dx-pagination-page-size {
		width: 6rem;
	    margin-left: 1rem;
	}
	.dx-pagination-pager {
		margin: 0 1rem;

	}
    .dx-pagination-jump-page>input {
		width: 4rem;
		margin: 0 0.8rem;
		border: 0.1rem solid #aaa;
	    border-radius: 0.5rem;
		line-height: 3rem;
		text-align: center;
		font-size: $--dx-pagination-jump-page-font-size;
    }
</style>