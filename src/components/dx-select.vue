<template>
	<div class="dx-select">
		<!-- 下拉框主体内容 -->
		<div 
			v-clickoutside="closeItems" 
			class="dx-select-content" 
		>
			<!-- 下拉选择框部分 -->
			<div 
				class="dx-select-input" 
				@click="toggleItems"
			>
				<input 
					v-model="selectLabel" 
					class="dx-select-input-origin"
					:readonly="readonly" 
					type="text"  
					:placeholder="placeholder"
				>
				<!-- 下拉框指示器 -->	
				<!-- <span class="dx-select-input-ind" :class="{open:isShow}"></span> -->
				<i 
					class="fa fa-caret-down dx-select-input-ind" 
					aria-hidden="true"
				>
				</i>	
			</div>
			<!-- 下拉列表 -->
			<ul 
				v-show="isShow"
				class="dx-select-ul"  
				@click="selectItem($event)"
			>
				<li 
					v-for="(item,index) in items" 
					:key="index"
					:data-index="index"
					:class="{selected:index === selecteIndex}"  
					class="dx-select-li" 
				>
					{{isObject ? item[labelKey] : item}}
				</li>
			</ul>
		</div>		
	</div>
</template>
<script>
	import clickoutside from '../directives/clickoutside.js'
	export default{
		name: 'DxSelect',
		directives: {clickoutside},
		props: {
			items: Array, // 传入的数据
			labelKey: String, // 传入的数组元素为对象时标签键值
			valueKey: String, // 传入的数组元素为对象时实际选择的键值
			value: {}, // select组件绑定的父组件值
			readonly: { // 是否为只读，默认为禁止
				type: Boolean,
				default: true
			},
			onSelect: Function, // 数据选择后的回调函数，为option选项值
			placeholder: String,
			remote: Boolean, // 是否为远程加载数据显示标志
			remoteMethod: Function // 如果设置为从服务器端加载，则为回调函数，回调值
		},
		data() {
			return {
				isShow: false,
				selecteIndex: '-1',
				selectLabel: this.value
			}
		},
		computed: {
			// 判断items是否为对象数组或原生数组
			isObject: function() {
				let isObject = Object.prototype.toString.call(this.items[0]).toLowerCase() ===
					'[object object]'
				// 如果输入items是对象数组，则进行一些检查
				if (isObject) {
					if (this.labelKey && this.valueKey) {
						if (typeof this.items[0][this.labelKey] === 'undefined' || typeof this.items[0][this.valueKey] === 'undefined') {
							throw new Error('The label-key and label-vlaue attrs not find in items[0] object!')
						}
					} else {
						throw new Error('If the items is object array,the label-key and label-vlaue attrs is reuqired!')
					}
				}

				return isObject
			}
		},
		methods: {
			closeItems: function() {
				this.isShow = false
			},
			toggleItems: function() {
				this.isShow = !this.isShow
			},
			// 选择列表时的处理函数,采用代理函数
			selectItem: function($event) {
				let item, selectValue
				// 取选择的item上index
                this.selecteIndex = parseInt($event.target.getAttribute('data-index'))
                // 根据index取得相应的item
				item = this.items[this.selecteIndex]
				// 根据items中的数据类型取相应的值
				selectValue = this.isObject ? item[this.valueKey] : item
				this.selectLabel = this.isObject ? item[this.labelKey] : item
				this.$emit('input', selectValue)
				this.onSelect && this.onSelect(selectValue)
				this.closeItems()
			}
		}
	}
</script>
<style>
	/*整体样式*/
	.dx-select{
		position:relative;
		font-size:1.6rem;
		z-index:1;
		display:inline-block;
		min-width:6rem;
		max-width:20rem;
	}
	/*选择框标签样式*/
	.dx-select .dx-select-label{
		position:absolute;
		left:0;
		font-size:1.875rem;
	}
	/*自定义选择框标签样式*/
	.dx-select .dx-select-content{
		position:relative;
	}
	/*下拉列表箭头指示器样式*/
	.dx-select-input-ind{
		/*width:1.2rem;
		height:1.2rem;*/
		position:absolute;
		top:50%;
		transform: translateY(-50%);
		right:1rem;
		/*text-align:center;*/
		color:#aaa;
		/*background: url("../images/icons/narrow.png") no-repeat center center;*/
	}
	/*下拉列表打开时样式*/
	.dx-select-input-ind.open{
		/*background: url("../images/icons/narrow-down.png") no-repeat center center;*/
	}
	/*自定义input框标签样式*/
	.dx-select .dx-select-input-origin{
		padding-left:1rem;
		width:100%;
		border:0.1rem solid #b3b3b3;
		font-size:1.6rem;
		background:#fff;
		line-height:3rem;
		border-radius:0.5rem;
		cursor:pointer;
	}
	/*下拉列表ul样式*/
	.dx-select .dx-select-ul{
		position:absolute;
		margin-top:0.3rem;
		width:100%;
		cursor:pointer;
		background:#fff;
		z-index:999;
		font-size:1.5rem;
		color:#a3a3a3;
		border-radius:0.2rem;
		box-shadow: 0 0 0.3rem #aaa;
		padding: 0;
		text-align:left;
	}
	/*下拉列表li样式*/
	.dx-select-ul li{
		padding:0.5rem 0rem 0.5rem 1rem;
		list-style: none;
	}
	.dx-select-ul li:hover{
		color:#666;
		background:#eee;
	}
	.dx-select-ul li.selected{
		/*color:#FFC125;*/
		color:#666;
	}
</style>