<template>
    <div class="plane">
        <div class="show-demo">
            <slot></slot>
        </div>
        <div class="show-btn" @click="showCode=!showCode">{{statusText}}代码</div>
        <transition name="slide">
            <div class="show-code" v-show="showCode">
                <div v-if="formatHtml" v-html="formatHtml" class="code"></div>
                <div v-if="formatScript" v-html="formatScript" class="code"></div>
                <div v-if="formatStyle" v-html="formatStyle" class="code"></div>
            </div>
        </transition>
    </div>
</template>
<script>
import formatCode from '../utils/parseCode.js'
export default {
    name: 'DxShowCode',
    data() {
        return {
            showCode: false
        }
    },
    props: {
        htmlString: String,
        scriptString: String,
        styleString: String
    },
    computed: {
        formatHtml: function() {
            return this.htmlString && formatCode('formatHtmlCode', this.htmlString)
        },
        formatScript: function() {
            return this.scriptString && formatCode('formatSptAndStyCode', this.scriptString)
        },
        formatStyle: function() {
            return this.styleString && formatCode('formatSptAndStyCode', this.styleString)
        },
        statusText: function() {
            if (this.showCode) {
                return '隐藏'
            } else {
                return '显示'
            }
        }
    }
}
</script>
<style scoped>
/*动画*/


/*  .slide-enter-active, .slide-leave-active {
  		transition: height .5s ease
	}
	.slide-enter-to, .slide-leave {
  		height: auto;
	}
	.slide-enter, .slide-leave-to{
  		height: 0
	}
*/

.plane {
    margin-top: 1.4rem;
    border: 1px solid #;
    background: #fff;
    border-radius: 3px;
    box-shadow: 0 0 5px #aaa;
    width: 100%;
}

.plane .show-btn {
    text-align: center;
    font-size: 1.4rem;
    line-height: 4rem;
    cursor: pointer;
    border-top: 0.1px solid #ddd;
    user-select: none;
}

.plane .show-demo {
    padding: 2rem;
}

.plane .show-code {
    border-top: 0.1rem solid #ddd;
    background: #f9fafc;
    padding: 2rem;
}

.showCode .code {
    margin-bottom: 2rem;
}
</style>