<template>
	<div class="dx-upload">
		<div 
			tabindex="0"
			class="dx-upload--btn"
			@click="handleClick"
		>
			<dx-button type="primary">
				上传文件
			</dx-button>
			<!-- 采用form方式 -->
			<div style="display:none">
				<iframe
					ref="iframe"
					:name="frameName"
					@load="onload"
				>
				</iframe>
				<form
					ref="form"
					:action="action"
					:target="frameName"
					enctype="multipart/form-data" 
					method="POST"
				>
					<input 
						:name="name"
						:multiple="multiple"
						:accept="accept"
						class="dx-upload--input" 
						type="file" 
						ref="input" 
						@change="handleChange"
					/>
					<input  
						type="hidden" 
						name="documentDomain" 
						:value="this.$isServer ? '' : domain"/>
					<span ref="data"></span>
				</form>
			</div>
		</div>
		<div 
			v-if="tip" 
			class="dx-upload--tip"
		>
			{{tip}}
		</div>
		<ul>
			<li v-for="file in fileLists">
				<a class="dx-upload__file-list--name">
					{{file.name}}
					<span class="dx-upload__file-list--close"> x </span>
				</a>
			</li>
		</ul>
	</div>
</template>
<script>
	import {
	  uploadHelper
	} from './upload-helper'
	export default {
		props: {
			name: {
				type: String,
				default: 'file'
			},
			action: String,
			multiple: Boolean,
			accept: String,
			httpRequest: {
				type: Function,
				default: uploadHelper
			},
			tip: String,
			autoUpload: {
				type: Boolean,
				default: true
			},
			beforeUpload: Function,
			data: {}
		},
		data() {
			return {
				fileLists: [],
				domain: document.domain
			}
		},
		methods: {
			handleChange(ev) {
				// 单个文件
				let file = ev.target.files[0]
				if (file) {
					this.uploadFiles(file)
				}
			},
			handleClick() {
				if (!this.disabled) {
					this.$refs.input.value = null
					this.$refs.input.click()
				}
			},
			uploadFiles(file) {
				if (this.submitting) return
				this.submitting = true
				this.file = file
				this.fileLists.push({
					status: 'ready',
					uid: file.uid,
					raw: file,
					name: file.name,
					size: file.size,
					percentage: 0
				})
				let data = this.data
				if (typeof data === 'function') {
					data = data(file)
				}
				let inputs = []
				for (let key in data) {
					if (data.hasOwnProperty(key)) {
						inputs.push(`<input name="${key}" value="${data[key]}"/>`)
					}
				}
				let fromDataNode = this.getFormDataNode()
				let formNode = this.getFormNode()
				fromDataNode.innerHTML = inputs.join('')
				formNode.submit()
				fromDataNode.innerHTML = ''
				this.submitting = false
			},
			getFormNode() {
				return this.$refs.form
			},
			getFormDataNode() {
				return this.$refs.data
			},
			onload(ev) {
				// var targetOrigin = new URL(self.action).origin
				this.$refs.iframe.contentWindow.postMessage('hello', '*')
			}
		},
		created() {
			this.frameName = 'frame-' + Date.now()
		},
		mounted() {
			const self = this
			!this.$isServer && window.addEventListener('message', (event) => {
				if (!self.file) return
				var targetOrigin = new URL(self.action).origin
				if (event.origin !== targetOrigin) return
				var response = event.data
				if (response.result === 'success') {
					self.onSuccess(response, self.file)
				} else if (response.result === 'failed') {
					self.onError(response, self.file)
				}
				self.submitting = false
				self.file = null
			}, false)
		}
	}
</script>
<style lang="scss">
	@include B(dx-upload) {
		@include M(btn) {
			display: inline-block;
		}
		@include M(input) {
			display: none;
		}
		@include M(tip) {
			font-size: 1.2rem;
			color: #666;
			padding-top: 1rem;
		}

		@include E(file-list) {
			@include M(name) {
				display: block;
				color: #666;
				font-size: 1.3rem;
				padding: 0.5rem;
				cursor: pointer;
				&:hover {
					background-color: #eee;
					color: #879;
					border-radius: 0.4rem;
				}
			}

			@include M(name) {
				float: right;
				font-size: 1.4rem;
			}	
		}
	}
</style>