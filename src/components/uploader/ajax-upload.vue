<template>
	<div class="dx-upload-ajax">
		<div 
			tabindex="0"
			class="dx-upload-ajax--btn"
			@click.stop="handleClick"
		>
			<dx-button type="primary">
				点击上传
			</dx-button>
			<!-- 采用ajax+new formData方式 -->
			<input 
				:name="name"
				:multiple="multiple"
				class="dx-upload-ajax--input" 
				type="file" 
				ref="input" 
				@change.self.stop="handleChange"
			/>
		</div>
		<div 
			v-if="tip" 
			class="dx-upload-ajax--tip"
		>
			{{tip}}
		</div>
		<ul class="dx-upload-ajax__file-list" v-if="showFileList">
			<li v-for="file in fileList">
				<dx-progress
					v-show="file.state !== 1"
					:percentage="file.percentage"
				></dx-progress>
				<div class="dx-upload-ajax__file-list-desc">
					<span class="dx-upload-ajax__file-list-desc--detail">
						<span>{{file.name}}</span>
						<span>{{file.size | fileSizeToUnit}}</span>
					</span>
					<span 
						@click="removeFile(file.fileId)"
						class="dx-upload-ajax__file-list-desc--close"> 
						删除 
					</span>
				</div>
			</li>
		</ul>
	</div>
</template>
<script>
	import {
	  uploadHelper,
	  imageFileExtension,
	  docFileExtension,
	  IGuid,
	  getFileType,
	  fileSizeToUnit,
	  isExceedSizeLimit,
	  SIZE_UNIT,
	  fileExtensionIconClass
	} from './upload-helper'
	import DxProgress from '../dx-progress.vue'
	export default {
		props: {
			name: {
				type: String,
				default: 'file'
			},
			action: {
				type: String,
				required: true
			},
			multiple: {
				type: Boolean,
				default: true
			},
			accept: Array,
			limit: {
				type: Number,
				default: 8
			},
			httpRequest: {
				type: Function,
				default: uploadHelper
			},
			unit: {
				validator: function(value) {
					return SIZE_UNIT.includes(value)
				},
				default: 'MB'
			},
			tip: String,
			autoUpload: {
				type: Boolean,
				default: true
			},
			onRemove: Function,
			onBefore: Function,
			onProgress: Function,
			onSuccess: Function,
			onError: Function,
			withCredentials: Boolean,
			showFileList: {
				type: Boolean,
				default: true
			}
		},
		components: {
			DxProgress
		},
		data() {
			return {
				fileList: []
			}
		},
		computed: {
			allowFileExtension() {
				return this.accept ? this.accept : [...docFileExtension, ...imageFileExtension]
			},
			fileNum() {
				return this.fileList.length
			}
		},
		filters: {
			fileSizeToUnit(value) {
				value = parseFloat(value)
				if (isNaN(value)) return 0
				return fileSizeToUnit(value)
			}
		},
		methods: {
			handleClick() {
				if (!this.disabled) {
					this.$refs.input.value = null
					this.$refs.input.click()
				}
			},
			handleChange(ev) {
				// 得到所有文件
				let files = Array.from(ev.target.files)
				if (files) {
					this.uploadFiles(files)
				}
			},
			uploadFiles(postFiles) {
				// 如果设置自动发送
				if (postFiles.length === 0) { return }
				postFiles.forEach(rawFile => {
					let fileId = IGuid()
					let file = {
						status: 0,
						fileId,
						raw: rawFile,
						name: rawFile.name,
						size: rawFile.size,
						percentage: 0
					}
					// 验证文件格式以及大小等
					if (!this.validateFileValue(file)) {
						return
					}
					if (this.onBefore && !this.onBefore(file)) {
						return
					}
					this.fileList.push(file)
					// 设置为自动上传
					if (this.autoUpload) {
						this.doPostFile(file, fileId)
					}
				})
			},
			doPostFile(file, fileId) {
				let options = {
					withCredentials: this.withCredentials,
					action: this.action,
					filename: this.name,
					file: file.raw,
					onSuccess: (data) => {
						this.onUploadSucess(data)
					},
					onProgress: (data) => {
						this.onUploadProgress(data, file)
					},
					error: (data) => {
						console.error(data)
						this.onUploadError(data, fileId)
					}
				}
				file.xhr = this.httpRequest(options)
			},
			onUploadProgress(data, file) {
				file.percentage = data.percentage
				this.onProgress && this.onProgress(data)
			},
			onUploadSucess(data) {
				let file = this.fileList.find(element => element.fileId === data.fileId)
				file.state = 1 // 设置为完成状态
				file.attachmentId = data.attachmentId// 上传真正文件名
				file.thumbnailUrl = data.thumbnailUrl // 上传图片缩略图，目前图片暂未压缩
				this.onSuccess && this.onSuccess(file)
			},
			onUploadError(data, fileId) {
				this.removeFileFromFileList(fileId)
				this.onError && this.onError(data)
				this.$message.error(`上传文件失败，请重新上传: ${data}`)
			},
			// 移除文件
			async removeFile(fileId) {
				let findIndex = this.fileList.findIndex(element => element.fileId === fileId)
				if (findIndex < 0) {
					return
				}
				let file = this.fileList[findIndex]
				if (file) {
					if (file.xhr) {
						file.xhr.abort()
					}
					// 删除添加的文件
					try {
						this.onRemove && await this.onRemove(file)
					} catch (e) {
						console.error(e)
						return
					}
				}
				this.fileList.splice(findIndex, 1)
			},
			removeFileFromFileList(fileId) {
				let findIndex = this.fileList.findIndex(element => element.fileId === fileId)
				if (findIndex < 0) {
					return
				}
				this.fileList.splice(findIndex, 1)
			},
			// 验证上传文件，合格则添加进uploadList数组
			validateFileValue({ fileId, name, size }) {
				let fileType = getFileType(name)
				// 检查文件格式
				if (!this.allowFileExtension.includes(fileType)) {
					this.$message.warning('不支持的文件上传格式！')
					return false
				}
				// 检查文件大小，目前默认限制为10MB
				if (size === 0) {
					this.$message.warning('文件大小不能为0！')
					return false
				}
				if (isExceedSizeLimit(size, this.limit, this.unit)) {
					this.$message.warning(`文件大小超过限制, 限制大小为${this.limit + this.unit}`)
					return false
				}
				return true
			}
		}
	}
</script>
<style lang="scss">
	@include B(upload-ajax) {
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
			margin-top: 1rem;
		}

		@include E(file-list-desc) {
			display: flex;
			align-items: center;
			color: #666;
			font-size: 1.3rem;
			padding: 0.5rem 0;
			cursor: pointer;
			@include M(detail) {
				>span {
					margin-right: 0.5rem;
					font-size: 1.2rem;
				}
			}

			@include M(close) {
				flex-grow: 1;
				text-align: right;
				&:hover {
					color: #8DD0EC;
				}
			}	
		}
	}
	/* 动画效果 */
	.fade-enter-active, .fade-leave-active {
	  transition: opacity .5s;
	}
	.fade-enter, .fade-leave-to {
	  opacity: 0;
	}
</style>