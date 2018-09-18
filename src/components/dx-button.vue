<template>
	<button  
	    :class="[
		        type ? 'dx-button-' + type : '',
		        size ? 'dx-button-' + size : '',
                customClass,
		        {
		        	'is-disabled': disabled
		        }
	    ]"
        :style=""
	    class="dx-button" 
	    :disabled="disabled"  
	    :type="nativeType"
	 	@click="handleClick" 
	 >
		 <i 
		 	v-if="icon" 
		 	:class="'dx-' + icon"
            class="icon iconfont"
		 	aria-hidden="true" 
		 >
		 </i>
		<span v-if="$slots.default"><slot></slot></span>
	</button>
</template>
<script>
export default {
    name: 'DxButton',
    props: {
        nativeType: {
            type: String, // 设置按钮的原生类型  button submit reset
            default: 'button'
        },
        icon: {
            type: String,
            default: ''
        },
        size: String, // 设置button的size
        type: String, // 设置按钮的样式类型
        disabled: {
            type: Boolean,
            default: false
        },
        customClass: String
    },
    methods: {
        handleClick: function(evt) {
            this.$emit('dx-button-click', evt)
        }
    }
}
</script>
<style lang="scss">
/*按钮基本样式*/

.dx-button {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    border: 0.1rem solid #bfcbd9;
    border-color: $--dx-button-default-border-color;
    color: $--dx-button-default-color;
    -webkit-appearance: none;
    text-align: center;
    outline: none;
    margin: 0;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    padding: 0.8rem 1rem;
    font-size: $--dx-button-default-font-size;
    background-color: transparent;
    border-radius: 0.4rem;
    span, i {
        line-height: 1;
        vertical-align: middle;       
    }
}

.dx-button:focus,
.dx-button:hover {
    color: $--dx-button-default-color-hover;
    border-color: $--dx-button-default-border-color-hover;
}

/*按钮默认样式*/

.dx-button-text {
    color: $--dx-button-text-color;
    border: none;
}

.dx-button-text:focus,
.dx-button-text:hover {
     border: none;
     color: $--dx-button-text-color-hover;
}

/*按钮默认样式*/

.dx-button-primary {
    color: $--dx-button-primary-color;
    background-color: $--dx-button-primary-background-color;
    border-color: $--dx-button-primary-border-color;
}

.dx-button-primary:focus,
.dx-button-primary:hover {
    border-color: $--dx-button-primary-border-color-hover;
    color: $--dx-button-primary-color-hover;
}


/*红色警告样式*/

.dx-button-warning {
    background-color: $--dx-button-warning-background-color;
    border-color: $--dx-button-warning-border-color;
    color: $--dx-button-warning-color;
}

.dx-button-warning:focus,
.dx-button-warning:hover {
    color: $--dx-button-warning-color-hover;
    border-color: $--dx-button-warning-border-color-hover;
}
/*灰色样式*/

.dx-button-gray {
    background-color: $--dx-button-gray-background-color;
    border-color: $--dx-button-gray-border-color;
    color: $--dx-button-gray-color;
}
.dx-button-gray:focus,
.dx-button-gray:hover {
    color: $--dx-button-gray-color-hover;
    opacity: 0.8;
    border-color: $--dx-button-gray-border-color-hover;
}
/*粉色样式*/

.dx-button-pinking {
    background-color: $--dx-button-pinking-background-color;
    border-color: $--dx-button-pinking-border-color;
    color: $--dx-button-pinking-color;
}
.dx-button-pinking:focus,
.dx-button-pinking:hover {
    color: $--dx-button-pinking-color-hover;
    opacity: 0.8;
    border-color: $--dx-button-pinking-border-color-hover;
}

/*设置按钮大小*/

.dx-button-large {
    font-size: $--dx-button-large-font-size;
    padding: 1.2rem 3rem;
    line-height: 1;
}

.dx-button-small {
    padding: 0.5rem 1.2rem;
    font-size: $--dx-button-small-font-size;
    line-height: 1;
}

.dx-button-full {
    height: 100%;
    width: 100%;
    border-radius: 5rem;
    font-size: $--dx-button-full-font-size;
    line-height: 1;
}

/*按钮禁用时的样式*/

.dx-button.is-disabled,
.dx-button.is-disabled:focus,
.dx-button.is-disabled:hover {
    color: $--dx-button-disable-color !important;
    cursor: not-allowed;
    background-image: none;
    background-color: $--dx-button-disable-background-color;
    border-color: $--dx-button-disable-border-color;
}

</style>