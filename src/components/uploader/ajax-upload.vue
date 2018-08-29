<template>
	<div class="dx-upload">
		<div 
			tabindex="0"
			class="dx-upload-btn"
			@click="handleClick"
		>
			<dx-button type="primary">
				上传文件
			</dx-button>
			<!-- 采用ajax+new formData方式 -->
			<input 
				:name="name"
				:multiple="multiple"
				:accept="accept"
				class="dx-upload-input" 
				type="file" 
				ref="input" 
				@change="handleChange"
			/>
		</div>
		<div 
			v-if="tip" 
			class="dx-upload-tip"
		>
			{{tip}}
		</div>
		<transition name="fade">
			<div v-show="percentage > 0 && percentage < 100">
				<dx-progress :percentage="percentage"></dx-progress>
			</div>
		</transition>
		<ul v-if="showFileList">
			<li v-for="file in fileLists">
				<a class="dx-upload-file-name">
					{{file.name}}
					<span class="dx-upload-file-name-close"> x </span>
				</a>
			</li>
		</ul>
	</div>
</template>
<script>
	import DxProgress from '../dx-progress.vue'
	import ajax from './ajax.js'
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
				default: ajax
			},
			tip: String,
			autoUpload: {
				type: Boolean,
				default: true
			},
			beforeUpload: Function,
			withCredentials: Boolean,
			showFileList: Boolean
		},
		components: {
			DxProgress
		},
		data() {
			return {
				fileLists: [],
				tempIndex: 1,
				percentage: 0
			}
		},
		methods: {
			onProgress(ev) {
				this.percentage = ev.percentage
			},
			handleChange(ev) {
				// 得到所有文件
				let files = ev.target.files
				if (files) {
					this.uploadFiles(files)
				}
			},
			handleClick() {
				if (!this.disabled) {
					this.$refs.input.value = null
					this.$refs.input.click()
				}
			},
			uploadFiles(files) {
				let postFiles = Array.prototype.slice.call(files)
				if (!this.multiple) { postFiles = postFiles.slice(0, 1) }
				// 如果设置自动发送
				if (postFiles.length === 0) { return }
				postFiles.forEach(rawFile => {
					rawFile.uid = Date.now() + this.tempIndex++
					this.fileLists.push({
						status: 'ready',
						uid: rawFile.uid,
						raw: rawFile,
						name: rawFile.name,
						size: rawFile.size,
						percentage: 0
					})
					if (this.autoUpload) {
						this.upload(rawFile)
					}
				})
			},
			upload(rawFile) {
				if (this.beforeUpload && !this.beforeUpload(rawFile)) {
					return
				}
				this.post(rawFile)
			},
			post(rawfile) {
				this.$refs.input.value = null
				let options = {
					withCredentials: this.withCredentials,
					action: this.action,
					filename: this.name,
					file: rawfile,
					onSuccess: (msg) => { console.log(msg) },
					error: (msg) => { console.log(msg) },
					onProgress: this.onProgress
				}
				this.httpRequest(options)
			}
		}
	}
</script>
<style>
.dx-upload-btn {
	display: inline-block;
}
.dx-upload-input {
	display: none;
}
.dx-upload-tip {
	font-size: 1.2rem;
	color: #666;
	padding-top: 1rem;
}
.dx-upload-file-name {
	display: block;
	color: #666;
	font-size: 1.3rem;
	padding: 0.5rem;
	cursor: pointer;
}
.dx-upload-file-name:hover {
	background-color: #eee;
	color: #879;
	border-radius: 0.4rem;
}
.dx-upload-file-name-close {
	float: right;
	font-size: 1.4rem;
}
/* 动画效果 */
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>