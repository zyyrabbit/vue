<template>
	<transition name="msgbox-fade">
		<div 
			v-show="visible" 
			class="dx-msgbox-wrapper" 
		>
			<div  :class="[customBoxClasses]">
				<div  
					v-if="showHeader" 
					:class="[titleClasses]" 
				>
					<span class="dx-msgebox-title">{{title}}</span>
					<span 
						v-if="showClose" 
						class="dx-msgebox-close"  
						@click="handleAction('cancel')"
					>
						x
					</span>
				</div>
				<div 
					v-show="message !== ''"
					:class="[contentClasses]" 
				>
					<slot><p>{{ message }}</p></slot>
				</div>
				<div 
					v-if="showBtns" 
					:class="[buttonClasses]" 
				>			
					<dx-button 
						v-if="showConfirm" 
						:class="[confirmButtonClasses]" 
						type="warning" 
						@click="handleAction('confirm')" 
					>
						{{confirmBtnText}}
					</dx-button>
					<dx-button 
						v-if="showCancel" 
						:class="[cancelButtonClasses]"
						click="handleAction('cancel')" 
					>
						{{cancelBtnText}}
					</dx-button>
				</div>
			</div>
			<div 
				v-if="modal" 
				class="dx-msgebox-wrapper-mask"  
				@click="handleAction('cancel')"
			>
			</div>
		</div>
	</transition>
</template>
<script>
	export default{
		data() {
			return {
				// 内容设置
				visible: false,
				parentEleId: '',
				showHeader: true,
				title: '',
				callback: null,
				message: '',
				modal: true,
				// 按钮设置
				cancelBtnText: '',
				confirmBtnText: '',
				showBtns: true,
				showConfirm: true,
				showCancel: true,
				showClose: false,
				// 自定义样式
				customBoxClass: '',
				buttonClass: '',
				cancelButtonClass: '',
				confirmButtonClass: '',
				titleClass: '',
				contentClass: '',
				contentVnode: null // 自定义传入vnode
			}
		},
		computed: {
			// 得到计算样式
			customBoxClasses() {
				return `dx-msgebox ${this.customBoxClass}`
			},
			titleClasses() {
				return `dx-msgebox-header ${this.titleClass}`
			},
			contentClasses() {
				return `dx-msgebox-content ${this.contentClass}`
			},
			buttonClasses() {
				return `dx-msgebox-button ${this.buttonClass}`
			},
			cancelButtonClasses() {
				return `btn-primary cancel-primary ${this.cancelButtonClass}`
			},
			confirmButtonClasses() {
				return `btn-primary confirm-primary ${this.confirmButtonClass}`
			}
		},
		methods: {
			// 处理方法
			handleAction: function(action) {
				this.visible = false
				this.callback && this.callback(action, this)
			}
		}
	}
</script>
<style>
.dx-msgbox-wrapper{
	position:absolute;
	top:0;
	left:0;
	width:100%;
	height:100%;
	font-size:2rem;
	min-width:100%;
	z-index:99999;
}
.dx-msgebox{
	position:absolute;
	/* width:25%; */
	left:50%;
	top:50%;
	transform: translate(-50%,-50%);
	border:1px solid rgba(0,0,0,.1);
	border-radius:1px;
	text-align:center;
	background:#fff;
	z-index:1;
	padding-bottom:5rem;
}
.dx-msgebox-header{
	margin:1rem 1rem;
	text-align:left;
}
.dx-msgebox-content{
	margin-top:3rem;
}
.dx-msgebox-button{
	margin-top:5rem;
}
.dx-msgebox-close{
	float:right;
	cursor: pointer;
}
.dx-msgebox-wrapper-mask{
	width:100%;
	height:120%;
    background:#333;
	position:fixed;
	top:0;
	left:0;
	z-index:0;
	opacity:0.4;
}
/* 动画样式 1*/

.msgbox-fade-enter-active {
  animation: msgbox-fade-in .3s;
}

.msgbox-fade-leave-active {
  animation: msgbox-fade-out .3s;
}

@keyframes msgbox-fade-in {
  0% {
    transform: translate3d(0, -20px, 0);
    opacity: 0;
  }
  100% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

@keyframes msgbox-fade-out {
  0% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  100% {
    transform: translate3d(0, -20px, 0);
    opacity: 0;
  }
}
</style>
