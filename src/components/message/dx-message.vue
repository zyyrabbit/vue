<template>
	<transition name="message-slide-down">
		<div 
			v-if="visible"
			:class="['dx-message--' + type]"
			class="dx-message">
			<div class="dx-message__content">
				<i 
					:class="['dx-' + type]"
					class="icon iconfont dx-message__content--icon"
				></i>
				<slot>
					<span>{{ content }}</span>
				</slot>
			</div>
		</div>
	</transition>
</template>
<script>
	export default {
		data() {
			return {
				// 消息队列
				content: '',
				durationTime: 3000,
				visible: false,
				type: 'info'
			}
		},
		mounted() {
			setTimeout(() => {
				this.visible = false
			}, this.durationTime)
		}
	}
</script>
<style lang="scss">
	/* 整体样式,长宽比例一定 */
	@include B(message) {
		position: fixed;
		top: 3rem;
		left: 50%;
		width: 18%;
		height: 0;
		padding-bottom: 3%;
		border-radius: 5px;
		margin-left: -9%;
		text-align: left;
		font-size: $--dx-message-font-size;
		@include E(content) {
			display: flex;
			align-items: center;
			position: absolute;
			left: 5%;
			top: 50%;
			transform: translateY(-50%);
			@include M(icon) {
				font-size: $--dx-message-icon-font-size;
				margin-right: 0.5rem;
			}
		}
	}
	// 不同类型的提示信息
	$types: info error warning success;
	$bgcmap: (
				info: $--dx-message-info-background-color, 
				error: $--dx-message-error-background-color,
				warning: $--dx-message-warning-background-color,
				success: $--dx-message-success-background-color
			);
	$bdcmap: (
				info: $--dx-message-info-border-color, 
				error: $--dx-message-error-border-color,
				warning: $--dx-message-warning-border-color,
				success: $--dx-message-success-border-color
			);
	$colormap: (
				info: $--dx-message-info-color, 
				error: $--dx-message-error-color,
				warning: $--dx-message-warning-color,
				success: $--dx-message-success-color
			);
	@each $type in $types {
		.dx-message--#{$type} {
			background-color: map-get($bgcmap, $type);
		    border-color: map-get($bdcmap, $type);
		    color: map-get($colormap, $type);
		}
	}
	/* 动画 */
	/* 动画样式 1*/
	.message-slide-down-enter-active {
	  animation: message-slide-down-in .8s;
	}

	.message-slide-down-leave-active {
	  animation: message-slide-down-out .5s;
	}

</style>