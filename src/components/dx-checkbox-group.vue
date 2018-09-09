<template>
	<div class="dx-checkbox-group">
		<slot></slot>
	</div>
</template>
<script>
// 用于与组件dx-form-item通信
import Bus from '../utils/bus.js'
export default {
    name: 'DxCheckboxGroup',
    componentName: 'DxCheckboxGroup',
    props: {
        value: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    data() {
        return {
            checkboxs: []
        }
    },
    computed: {
        model: {
            get() {
                return this.value
            },
            set(val) {
                this.$emit('input', val)
            }
        }
    },
    created() {
        Bus.$on('dx-checkbox-add', (checkbox) => {
            if (checkbox) {
                this.checkboxs.push(checkbox)
            }
        }, this)
        Bus.$on('dx-checkbox-remove', (checkbox) => {
            if (checkbox) {
                this.checkboxs.splice(this.checkboxs.indexOf(checkbox), 1)
            }
        }, this)
    },
    mounted() {
        if (this.checkboxs.length === 0 || this.model.length === 0) {
            return
        }
        this.checkboxs.forEach(checkbox => {
            if (this.model.indexOf(checkbox.label) !== -1) {
                checkbox.checked = true
            }
        })
    }
}
</script>