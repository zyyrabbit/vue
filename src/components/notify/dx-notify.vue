<template>
	<div class="dx-notify">
		<transition-group 
			name="msg-list" 
			tag="ul" 
			mode="out-in"
		>
		    <li 
		    	v-for="(msg, index) in msgQueue" 
		    	v-bind:key="msg.key" 
		    	class="dx-notify__msg-list"
		    >
		     	<p class="dx-notify__msg-list--title" >
		     		<span>{{msg.title}}</span>
		     		<span
		     			class="dx-notify__msg-list--close" 
		     			@click="close(msg)" 
		     		> 
		     			x
		     		</span>
		     	</p>
				<p class="dx-notify__msg-list--message" >
					<slot :name="msg.key">
						{{msg.content}}
					</slot>
				</p>
		    </li>
  		</transition-group>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				// 消息队列
				msgQueue: []
			}
		},
		methods: {
			close(message) {
				if (message.timer) {
					clearTimeout(message.timer)
					message.timer = null
				}
				for (let i = message.index + 1; i < this.msgQueue.length; i++) {
					this.msgQueue[i].index--
				}
				this.msgQueue.splice(message.index, 1)
			}
		}
	}
</script>
<style lang="scss">
	@include B(notify) {
		position: fixed;
		bottom: 1rem;
		right: 0;
		z-index: $--dx-notify-z-index;
		font-size: $--dx-notify-font-size;
		color: $--dx-notify-color;
		/* 消息列表样式 */
		@include E(msg-list) {
			width: $--dx-notify-msg-list-width;
			height: $--dx-notify-msg-list-height;
			border-radius: 0.6rem;
			box-shadow: 1px 1px 1rem #ccc;
		  	margin-right: 1rem;
		  	margin-top: 2rem;
		  	padding: 1rem 2rem;
		  	background: #fff;
		  	transition: all 1s;
		  	@include M(title) {
		  		font-weight: bold;
				color: #000;
				padding-bottom: 0.5rem;
		  	}
		  	@include M(close) {
		  		font-weight: normal;
				float: right;
				color: $--dx-notify-msg-list-title-color;
				font-size: $--dx-notify-msg-list-title-font-size;
				cursor: pointer;
		  	}
		}
	}
	/* 动画 */
	.msg-list-enter {
		transform: translateY(8rem);
	}
	.msg-list-leave-to {
		opacity: 0;
		z-index: -1;
	}
	.msg-list-leave-active {
		position: absolute;
		right: 0;
	}
</style>