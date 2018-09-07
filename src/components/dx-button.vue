<template>
	<button  
	    :class="[
		        type ? 'dx-button-' + type : '',
		        size ? 'dx-button-' + size : '',
		        {
		        	'is-disabled': disabled
		        }
	    ]"
	    class="dx-button" 
	    :disabled="disabled"  
	    :type="nativeType"
	 	@click="handleClick" 
	 >
		 <i 
		 	v-if="icon" 
		 	:class="'fa-' + icon" 
		 	class="fa"  
		 	aria-hidden="true" 
		 >
		 </i>
		<span v-if="$slots.default">
            <slot></slot>
        </span>
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
        }
    },
    methods: {
        handleClick: function(evt) {
            this.$emit('dx-button-click', evt)
        }
    }
}
</script>
<style>
/*按钮基本样式*/

.dx-button {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    border: 0.1rem solid #bfcbd9;
    border-color: #c4c4c4;
    color: #1f2d3d;
    -webkit-appearance: none;
    text-align: center;
    outline: none;
    margin: 0;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    padding: 1rem 1.5rem;
    font-size: 1.4rem;
    background-color: transparent;
    border-radius: 0.4rem;
}

.dx-button:focus,
.dx-button:hover {
    background-color: #eee;
    color: #20a0ff;
    border-color: #20a0ff;
}
/*文字按钮*/

.dx-button-text {
    border: 0;
    color: #ccc;
}

.dx-button-text:focus,
.dx-button-text:hover {
    color: #aaa; 
    background-color: #fff;
}

/*按钮默认样式*/

.dx-button-primary {
    color: #fff;
    background-color: #20a0ff;
    border-color: #20a0ff;
}

.dx-button-primary:focus,
.dx-button-primary:hover { 
    color: #fff;
    background: #4db3ff;
    border-color: #4db3ff;
}


/*红色警告样式*/

.dx-button-warning {
    background: #ff4949;
    border-color: #ff4949;
    color: #fff;
}

.dx-button-warning:focus,
.dx-button-warning:hover {
    color: #fff;
    background: #f56c6c;
    border-color: #f56c6c;
}

/*设置按钮大小*/

.dx-button-large {
    font-size: 1.6rem;
    padding: 1.1rem 1.9rem;
}

.dx-button-small {
    padding: 0.7rem 0.9rem;
    font-size: 1.2rem;
}

/* 与父元素同宽 */

.dx-button-max {
    padding: 1rem 0.9rem;
    font-size: 1.5rem;
    width: 100%;
}


/*按钮禁用时的样式*/

.dx-button.is-disabled,
.dx-button.is-disabled:focus,
.dx-button.is-disabled:hover {
    color: #bfcbd9;
    cursor: not-allowed;
    background-image: none;
    background-color: #eef1f6;
    border-color: #d1dbe5;
}
</style>