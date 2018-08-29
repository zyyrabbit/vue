<template>
	<div  
		class="dx-carousel" 
		:style="{height : height, width : width}" 
		@mouseenter.stop="handleMouseEnter()" 
		@mouseleave.stop="handleMouseLeave()" 
	>
	    <!-- pre轮播容器 -->
		<div  
		 	:class="{'dx-carousel-animate':enableTransition}" 
		 	class="dx-carousel-content"
		 	:style="[{transform: `translateX(${ pre.translateX })`}, itemsSize]" 
		>
			<img :src="pre.imgSrc"/>
		</div>
		  <!-- mid轮播容器 -->
		<div   
			:class="{'dx-carousel-animate':enableTransition}" 
			class="dx-carousel-content" 
			:style="[{transform: `translateX(${ mid.translateX })`}, itemsSize]"
		>
		  	<img :src="mid.imgSrc"/>
		</div>
		<!-- next轮播容器 -->
		<div  
			:class="{'dx-carousel-animate':enableTransition}" 
			class="dx-carousel-content"
			:style="[{transform: `translateX(${ next.translateX })`}, itemsSize]"
		>
		  	<img :src="next.imgSrc"/>
		</div>
		<!-- 向前向后按钮 -->
		<button 
			v-show="hover" 
			class="dx-carousel-left-btn  dx-carousel-btn" 
			@click="nextClick()"
		> 
			<i 
				class="fa fa-angle-left" 
				aria-hidden="true"
			>
			</i> 
		</button>
		<button 
			v-show="hover" 
			class="dx-carousel-right-btn  dx-carousel-btn" 
			@click="preClick()"
			> 
				<i 
					class="fa fa-angle-right" 
					aria-hidden="true"
				>
			</i> 
		</button>
		<!-- 轮播图片指示器 -->
		<div>
		  	<ul class="dx-carousel-labels clearfix">
		  		<li 
		  			v-for="(item,index) in imageNum" 
		  			:key="index" 
		  			class="dx-carousel-item" 
		  			@click="btnClick(index)" 
		  		>
		  			<button 
		  				:class="{'is-active':index === activeInd}" 
		  				class="dx-carousel-item-btn"
		  			>
					</button>
		  		</li>
		  	</ul>
		</div>
	 </div>
</template>
<script>
	export default {
		name: 'DxCarousel',
		componentName: 'DxCarousel',
		props: {
			height: String,
			width: String,
			imageUrls: {
				type: Array, // 轮播图片的地址数组数据
				default: function() {
					return []
				}
			},
			timeInterval: {
				type: Number,
				default: 3000
			}
		},
		data() {
			return {
				activeInd: 0, // 指示活动图片的index
				// pre容器的对象数据
				pre: {
					translateX: '-100%',
					imgSrc: ''
				},
				mid: {
					translateX: '0',
					imgSrc: ''
				},
				next: {
					translateX: '100%',
					imgSrc: ''
				},
				enableTransition: true, // 是否暂时关闭动画
				timer: null, // 定时器
				hover: false, // 鼠标移动到容器元素，是否显示点击按钮
				animating: false// 标志是否处于动画中,主要用来限制点击的次数
			}
		},
		computed: {
			/* 设置轮播图片的大小 */
			itemsSize() {
				return {
					height: this.height,
					width: this.width
				}
			},
			imageNum() {
				return this.imageUrls.length
			}
		},
		mounted() {
			// 初始化轮播图片地址
			this.showImg(this.imageNum - 1, this.activeInd, this.activeInd + 1)
			this.timer = setInterval(() => { this.translate('left') }, this.timeInterval)
		},
		methods: {
			/* 赋值相应的图片url */
			showImg(preInd, midInd, nextInd) {
				this.pre.imgSrc = this.imageUrls[preInd]
				this.mid.imgSrc = this.imageUrls[midInd]
				this.next.imgSrc = this.imageUrls[nextInd]
			},
			/* 计算轮播图片的位置 */
			calculPosition() {
				if (this.activeInd === this.imageNum - 1) {
					this.showImg(this.activeInd - 1, this.activeInd, 0)
				} else if (this.activeInd === 0) {
					this.showImg(this.imageNum - 1, this.activeInd, this.activeInd + 1)
				} else {
					this.showImg(this.activeInd - 1, this.activeInd, this.activeInd + 1)
				}
				this.animating = false
			},
			/* 处理鼠标移入事件 */
			handleMouseEnter() {
				this.hover = true
				this.pauseTimer()
			},
				/* 处理鼠标移出事件 */
			handleMouseLeave() {
				this.hover = false
				this.startTimer()
			},
			startTimer() {
				this.timer = setInterval(() => { this.translate('left') }, 3000)
			},
			pauseTimer() {
				clearTimeout(this.timer)
				this.timer = null
			},
			preClick() {
				if (!this.animating) {
					this.translate('left')
				}
			},
			nextClick() {
				if (!this.animating) {
					this.translate('right')
				}
			},
			translate(dir, activeInd) {
				// 启动动画
				this.enableTransition = true
				this.animating = true
				if (dir === 'left') {
					this.pre.translateX = parseInt(this.pre.translateX) - 100 + '%'
					this.mid.translateX = parseInt(this.mid.translateX) - 100 + '%'
					this.next.translateX = parseInt(this.next.translateX) - 100 + '%'
					setTimeout(() => {
							// 暂时关闭动画移动
							this.enableTransition = false
							// 让代码pre,mid,next元素复原
							this.pre.translateX = this.mid.translateX
							this.mid.translateX = this.next.translateX
							this.next.translateX = '100%'
							this.activeInd = activeInd || activeInd === 0 ? activeInd : (this.activeInd + 1) % this.imageNum
							this.calculPosition()
						}, 500)
				} else if (dir === 'right') {
					this.pre.translateX = parseInt(this.pre.translateX) + 100 + '%'
					this.mid.translateX = parseInt(this.mid.translateX) + 100 + '%'
					this.next.translateX = parseInt(this.next.translateX) + 100 + '%'
					setTimeout(() => {
						this.enableTransition = false
						this.next.translateX = this.mid.translateX
						this.mid.translateX = this.pre.translateX
						this.pre.translateX = '-100%'
						this.activeInd = activeInd || activeInd === 0 ? activeInd : (this.activeInd + this.imageNum - 1) % this.imageNum
						this.calculPosition()
					}, 500)
				}
			},
			/* 指示器点击事件处理 */
			btnClick(index) {
				if (index !== this.activeInd && !this.animating) {
					// 判断指示的位置与当前active图片的index
					if (index > this.activeInd) {
	                   this.next.imgSrc = this.imageUrls[index]
	                   this.translate('left', index)
					} else {
						this.pre.imgSrc = this.imageUrls[index]
						this.translate('right', index)
					}
				}
			}
		}
	}
</script>
<style>
	.dx-carousel{
		background:#aaa;
		position:relative;
	    overflow:hidden;
	}
	.dx-carousel-content{
		position:absolute;
	}

	.dx-carousel-animate{
		transition:0.5s;
	}

	.dx-carousel-btn{
		width:5%;
		height:15%;
		position:absolute;
	    top:50%;
		transform: translateY(-50%);
		border: none;
	    outline: none;
	    padding: 0;
	    margin: 0;
	    cursor: pointer;
	    transition: .1s;
	    border-radius: 50%;
	    background-color: rgba(31,45,61,.3);
	    color: #fff;
	    z-index: 0;
	    text-align: center;
	    font-size: 1.2rem;
	}
	.dx-carousel-left-btn{
		left:10%;
	}
	.dx-carousel-right-btn{
	    right:10%;
	}
	.dx-carousel-labels{
		position:absolute;
		bottom:10%;
		left:50%;
		transform: translateX(-50%);
		background:#aaa;
		opacity: .48;
		border-radius:0.8rem;
	}
	.dx-carousel-item{
		float:left;
		margin:0 1rem;
	}
	.dx-carousel-item-btn{
		width:1.5rem;
		height:1.5rem;
		display: block;
	    border-radius:50%;
	    background-color: #fff;
	    border: none;
	    outline: none;
	    padding: 0;
	    margin: 0;
	    cursor: pointer;
	    transition: .1s;
	}
	.dx-carousel-item-btn.is-active{
		background:red;
	}
</style>






    
