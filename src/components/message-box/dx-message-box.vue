<template>
	<transition name="msgbox-fade">
		<div 
			v-show="visible" 
			class="dx-msgbox-wrapper" 
		>
			<div  :class="[customBoxClasses]">
				<div  
					v-if="showHeader"
					class="clearfix"
					:class="[titleClasses]" 
				>
					<span v-if="title" class="dx-msgbox__header--title">{{ title }}</span>
					<span 
						v-if="showClose" 
						class="dx-msgbox__header--close"  
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
					:class="[buttonClasses, {'is-center': center}]" 
				>			
					<dx-button 
						v-if="showConfirm" 
						:class="[confirmButtonClasses]" 
						type="primary"
						size="small"
						@dx-button-click="handleAction('confirm')" 
					>
						{{ confirmBtnText }}
					</dx-button>
					<dx-button 
						v-if="showCancel"
						size="small"
						:class="[cancelButtonClasses]"
						@dx-button-click="handleAction('cancel')" 
					>
						{{ cancelBtnText }}
					</dx-button>
				</div>
			</div>
			<div 
				v-if="modal" 
				class="dx-msgbox-wrapper--mask"  
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
				showClose: true,
				// 自定义样式
				customBoxClass: '',
				buttonClass: '',
				cancelButtonClass: '',
				confirmButtonClass: '',
				titleClass: '',
				contentClass: '',
				center: false
			}
		},
		computed: {
			// 得到计算样式
			customBoxClasses() {
				return `dx-msgbox ${this.customBoxClass}`
			},
			titleClasses() {
				return `dx-msgbox__header ${this.titleClass}`
			},
			contentClasses() {
				return `dx-msgbox__content ${this.contentClass}`
			},
			buttonClasses() {
				return `dx-msgbox__buttons ${this.buttonClass}`
			},
			cancelButtonClasses() {
				return `${this.cancelButtonClass}`
			},
			confirmButtonClasses() {
				return `${this.confirmButtonClass}`
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
<style lang="scss">
	/* 最外层包裹函数 */
	@include B(msgbox-wrapper) {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		font-size: $--dx-msgbox-font-size;
		min-width: 100%;
		z-index: 99999;
		@include M(mask) {		
			width: 100%;
			height: 120%;
		    background-color: $--dx-msgbox-mask-background-color;
			position: fixed;
			top: 0;
			left: 0;
			z-index: $--dx-msgbox-mask-z-index;
			opacity: 0.4;
		}
	}
	@include B(msgbox) {
		position: absolute;
		/* width:25%; */
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
		border: 1px solid rgba(0,0,0,.1);
		border-radius: 0.5rem;
		background-color: $--dx-msgbox-background-color;
		z-index: 1;
		min-width: 20%;
		max-width: 80%;
		padding: 1.5rem;
		// 头部
		@include E(header) {
			vertival-align: middle;
			@include M(title) {
				font-size: 1.6rem;
			}
			@include M(close) {
				float: right;
				cursor: pointer;
			}
		}
		// 内容
		@include E(content) {
			margin-top: 1rem;
		}
		// 底部按钮
		@include E(buttons) {
			text-align: right;
			margin-top: 2rem;
			@include when(center) {
				text-align: center;
			}
		}
	}
	/* 动画样式 1*/

	.msgbox-fade-enter-active {
	  animation: msgbox-fade-in .3s;
	}

	.msgbox-fade-leave-active {
	  animation: msgbox-fade-out .3s;
	}
</style>
