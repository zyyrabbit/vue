<template>
	<li   
		:class="[horizontal ? 'dx-li-horizontal' : '',{'is-open':openSub},{'has-sub':hasSub}]" 
		class="dx-li"
	>	
		<slot>
		   	<div 
		   		@mouseover="show = true" 
		   		@mouseout="show = false"
		   	>
			   	<router-link  
			   		:to="item[linkName]"
			   	>
			   		{{item[titleName]}}
			   	</router-link>
			  	<span 
			   		v-if="item.gap" 
			   		class="dx-li-item-gap"
			   	>
			   		{{item.gap}}
			   	</span>
			   	<div  
			   		v-if="openSub" 
			   		class="dx-li-sub-items"
			   	>
			   		<dx-ul> 
			   		   	<dx-li 
			   		   		v-for="(subItem,index) in item.subItems" 
			   		   		:key="index" 
			   		   		:item="subItem" 
			   		   	>
			   		   	</dx-li>
			   		</dx-ul>
			   </div>
		   </div>
		</slot>
    </li>   
</template>
<script>
	export default {
		name: 'DxLi',
		componentName: 'DxLi',
		props: {
			item: {
				type: Object,
				default: () => { return {} }
			},
			horizontal: Boolean,
			linkName: {
				type: String,
				default: 'link'
			},
			titleName: {
				type: String,
				default: 'title'
			}
		},
		data() {
			return {
				show: false
			}
		},
		computed: {
			hasSub() {
				return this.item.subItems
			},
			openSub() {
				return this.hasSub && this.show
			}
		}
	}
</script>
<style>
/* 从这里发现，如果元素样式position:absolute，设置width:100%,
   宽度技术是相对最近使用非static定位元素的宽度？
  */
  	.dx-li{
		position:relative;
  	}
  	.dx-li a{
		display: inline-block;
		padding: 0 0.5rem;
	}
  	.dx-li-item-gap{
		width: 1px;
		height: 80%;
	}
  	.dx-li-horizontal{
  		float:left;
  	}
  	.dx-li.has-sub{
  		border:1px solid #e3e4e5;
  		border-bottom:none;
  	}
    .dx-li.is-open{
    	background:#fff;
    	/* 防止子列表打开，父列表抖动 */
    	border:1px solid #e3e4e5;
    }
    .dx-li-sub-items{
		margin-top:-0.1rem;
		margin-left:-0.1rem;
		width:150%;
		background:#fff;
		border:1px solid #e3e4e5;
		border-top:none;
		position:absolute;
		max-height:30rem;
		overflow: auto;
    }
 
</style>