<template>
	<transition name="message-slide-down">
		<div 
			v-if="visible"
			:class="['dx-message-' + type]"
			class="dx-message">
			<div class="dx-message-content">
				<i 
					:class="['dx-' + type]"
					class="icon iconfont dx-message-icon"
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
.dx-message {
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
}
.dx-message-content {
	position: absolute;
	left: 5%;
	top: 50%;
	transform: translateY(-50%);

	display: flex;
	align-items: center;
}

.dx-message-icon {
	font-size: $--dx-message-icon-font-size;
	margin-right: 0.5rem;
}

.dx-message-info {
	background-color: $--dx-message-info-background-color;
    border-color: $--dx-message-info-border-color;
    color: $--dx-message-info-color;
}
.dx-message-error {
	background-color: $--dx-message-error-background-color;
    border-color: $--dx-message-error-border-color;
    color: $--dx-message-error-color;
}
.dx-message-warning {
	background-color: $--dx-message-warning-background-color;
    border-color: $--dx-message-warning-border-color;
    color: $--dx-message-warning-color;
}
.dx-message-success {
	background-color: $--dx-message-success-background-color;
    border-color: $--dx-message-success-border-color;
    color: $--dx-message-success-color;
}
/* 动画 */
/* 动画样式 1*/
.message-slide-down-enter-active {
  animation: message-slide-down-in .8s;
}

.message-slide-down-leave-active {
  animation: message-slide-down-out .5s;
}

@keyframes message-slide-down-in {
  0% {
    transform: translate3d(0, -8rem, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}

@keyframes message-slide-down-out {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(0, -8rem, 0);
  }
}
</style>