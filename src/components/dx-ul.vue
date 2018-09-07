<template>
	 <ul class="dx-ul">
	   <slot></slot>
	 </ul>
</template>
<script>
	export default {
		name: 'DxUl',
		componentName: 'DxUl'
	}
</script>
<style>
	.dx-ul {
		display: webkit-flex;
        display: flex;
        flex-wrap: wrap;
        
        justify-content: space-between;
        align-items: center;
	}
</style>
