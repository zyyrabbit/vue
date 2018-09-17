<template>
	<ul 
		class="dx-pager clearfix" 
		@click.stop.prevent="clickPage($event)"
	>
		<li  
			v-if="pageCount > 0" 
			:class="{disbaled:1 === currentPage}" 
			class="pre"
		>
			<i 
				class="icon iconfont dx-prev dx-pager-icon"
				aria-hidden="true"
			>
			</i>
		</li>
		<li 
			v-if="pageCount > 0"  
			:class="{active: 1 === currentPage}"
			:style="[1 === currentPage && activeStyle]"
		>
			1
		</li>
		<li  
			v-if="showPrevMore" 
			:class="[quickprevIconClass]"
			class="dx-more quickpre"
		>
			<i 
				class="icon iconfont dx-ellipsis" 
				aria-hidden="true"
			>
			</i>
		</li>
		<li 
			v-for="(page,index) in pager" 
			:key="index"   
			:class="{active: page === currentPage}"
			:style="[page === currentPage && activeStyle]"
		>
			{{ page }}
		</li>
		<li 
			v-if="showNextMore"
			:class="[quicknextIconClass]"
			class="dx-more quicknext" 
		>
			<i 
				class="icon iconfont dx-ellipsis" 
				aria-hidden="true"
			>
			</i>
		</li>
		<li
			v-if="pageCount > 1"  
			:class="{active: pageCount === currentPage}"
			:style="[pageCount === currentPage && activeStyle]"
		>
			{{ pageCount }}
		</li>
		<li 
			v-if="pageCount > 0" 
			:class="{ disbaled: pageCount === currentPage}" 
			class="next"
		>	
			<i 
				class="icon iconfont dx-next dx-pager-icon" 
				aria-hidden="true"
			>
			</i>
		</li>
	</ul>
</template>
<script>
	export default {
		name: 'DxPager',
		componentName: 'DxPager',
		props: {
			pageCount: {
				type: Number,
				default: 0
			},
			currentPage: {
				type: Number,
				default: 1
			},
			activeStyle: Object
		},
		data() {
			return {
				showPrevMore: false,
				showNextMore: false,
				quicknextIconClass: 'dx-icon-more',
				quickprevIconClass: 'dx-icon-more'
			}
		},
		computed: {
			pager() {
				const pages = []
				const pagerCount = 7
				const middle = Math.floor(pagerCount / 2)

				let pageCount = parseInt(this.pageCount)
				let currentPage = parseInt(this.currentPage)
				let showPrevMore = false
				let showNextMore = false
				// 判断是否需要显示quickpre和quicknext按钮
				if (pageCount > pagerCount) {
					if (currentPage > pagerCount - middle) {
						showPrevMore = true
					}
					if (currentPage < pageCount - middle) {
						showNextMore = true
					}
				}
				// 根据是否显示quickpre和quicknext按钮分情况讨论
				if (showPrevMore && !showNextMore) {
					for (let start = pageCount - pagerCount + 2; start < pageCount; start++) {
						pages.push(start)
					}
				} else if (!showPrevMore && showNextMore) {
					for (let start = 2; start < pagerCount; start++) {
						pages.push(start)
					}
				} else if (showPrevMore && showNextMore) {
					let offset = middle - 1
					for (let start = currentPage - offset, len = currentPage + offset; start <= len; start++) {
						pages.push(start)
					}
				} else {
					for (let start = 2; start < pageCount; start++) {
						pages.push(start)
					}
				}

				this.showPrevMore = showPrevMore
				this.showNextMore = showNextMore
				return pages
			}
		},
		methods: {
			clickPage($event) {
				let target = $event.target
				if (target.tagName === 'UL') {
					return
				}

				while (target.tagName !== 'LI') {
					// 这里代码有一点兼容性不好
					target = target.parentElement
				}

				let newPage = parseInt(target.textContent)
				let currentPage = this.currentPage
				let pageCount = this.pageCount
				let className = target.className

				if (className.indexOf('dx-more') !== -1) {
					if (className.indexOf('quickpre') !== -1) {
						newPage = currentPage - 5
					} else if (className.indexOf('quicknext') !== -1) {
						newPage = currentPage + 5
					}
				} else if (className.indexOf('pre') !== -1) {
					newPage = currentPage - 1
				} else if (className.indexOf('next') !== -1) {
					newPage = currentPage + 1
				}
				if (!isNaN(newPage)) {
					if (newPage < 1) {
						newPage = 1
					}
					if (newPage > pageCount) {
						newPage = pageCount
					}
				}
				if (newPage !== currentPage) {
					this.$emit('dx-pager-change', newPage)
				}
			}
		}
	}
</script>
<style lang="scss">
	.dx-pager {
		display: inline-block;
	}
	.dx-pager>li {
		float: left;
		padding: 0 0.8rem;
	    border: 0.1rem solid #d1dbe5;
	    border-right: 0;
	    background-color: $--dx-pager-li-background-color;
	    font-size: $--dx-pager-li-font-size;
	    min-width: 2.8rem;
	    line-height: $--dx-pager-li-line-height;
	    cursor: pointer;
	    text-align: center;
	}
	.dx-pager>li:last-child {
		border-right: 0.1rem solid #d1dbe5;
	}
	 .dx-pager>li.active {
		 background-color: $--dx-pager-li-background-color-active;
		 color: $--dx-pager-li-color;
	} 
	/*pre,next按钮禁止样式*/
	.dx-pager>li.disbaled {
		cursor: not-allowed;
	}

	.dx-pager-icon {
		line-height: $--dx-pager-li-line-height;
		font-size: $--dx-pager-li-font-size;
	}

</style>