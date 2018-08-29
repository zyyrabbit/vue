<template>
    <ul class="dx-nav">
        <li 
            v-for="(nav,index) in navs" 
            :key="index"
            :class="{'is-open':listStatus[index]}"
            class="dx-nav-list" 
        >
            <div 
                :class="{'is-active': listStatus[index]}"
                class="dx-title-wrap"
            >
                <!--判断一级路由是否具有二级子路由，若有二级子路由，则用span元素。通过nav对象是否具体path属性来判断-->
                <!-- router-link组件使用click事件，必须加native修饰符，否则无效 -->
                <router-link 
                    v-if="nav.path" 
                    tag="div" 
                    active-class="dx-router-active" 
                    :to="nav.path">
                    <a class="dx-title-link">{{nav.title}}</a>
                </router-link>
                <span 
                    v-else
                    :class="{
                        'dx-title-narrow-default': nav.subNavs,
                        'is-active':listStatus[index],
                        'dx-title-narrow-active': nav.subNavs && listStatus[index]
                    }"
                    class = "dx-title-link"
                    @click="changeListStatus(index)">
                    {{nav.title}}
                </span>
            </div>
            <!-- 频繁切换使用v-show -->
            <div class="dx-sub-nav">
                <dx-collapse-transition>
                    <ul v-show="listStatus[index] && !nav.path">
                         <!--   v-for循环组件一般需要加key属性唯一标识，避免组件就地复用策略 -->
                        <router-link 
                           v-for="(subNav,index) in nav.subNavs" 
                           tag="li" 
                           active-class="dx-router-active" 
                           :to="subNav.path" 
                           :key="index">
                           <a class="dx-title-link">{{subNav.title}}</a>
                        </router-link>
                    </ul>
                </dx-collapse-transition>
            </div>
        </li>
    </ul>
</template>
<script>
export default {
    name: 'DxNav',
    props: {
        navs: {
            type: Array,
            default: function() {
                return []
            }
        }
    },
    data() {
        return {
            listStatus: [],
            preIndex: 0
        }
    },
    watch: {
        navs: function(val, oldVal) {
            let len = val.length
            for (let i = 0; i < len; i++) {
                this.listStatus.push(false)
            }
        }
    },
    methods: {
        /* 主要的思路:用一个preIndex标记前一个打开的一级子路由，当点击打开另外一个路由时候，
        			 可以关闭前一个一级路由的，同时打开新的一级路由
        */
        changeListStatus(index) {
            // 如果切换的是同一个一级路由，且自己toggle切换
            if (this.preIndex === index) {
                this.listStatus[index] = !this.listStatus[index]
            } else {
                 // 数据更新检测，使用Vue方法才可以，改变数组值刷新组件
                this.listStatus[this.preIndex] = false
                this.listStatus[index] = true
                this.preIndex = index
            }
            this.$forceUpdate()
        }
    }
}
</script>
<style>
/* 导航栏默认整体样式 */
.dx-nav {
    background-color: #2d3e4d;
}
.dx-nav-list{
    padding: 0 1.5rem;
}
.dx-nav-list.is-open {
    background-color: #1d2933;
} 
/* 链接样式 */
.dx-title-link {
    font-size: 1.4rem;
    color: #ccc;
    cursor: pointer;
    display: block;
    padding: 1rem;
}
.dx-nav-list:hover {
    background-color: #1d2933;
}
.dx-nav-list:hover .dx-title-link{
    color: #8AEBEA;
}
.dx-title-wrap.is-active .dx-title-link{
    color: #8AEBEA;
}

/*点击标题时候的文字颜色*/

.dx-title-link.is-active {
    color: #8AEBEA;
}
/*一级标题打开，关闭接口指示器*/

.dx-title-narrow-default {
    background: url('../images/narrow-left.png') no-repeat right center;
}

.dx-title-narrow-active {
    background: url('../images/narrow-down.png') no-repeat right center;
}

/*自定义router-linker路由活动时样式颜色*/
/*链接文字的样式*/

.dx-router-active .dx-title-link{
    color: #8AEBEA;
}

.dx-sub-nav .dx-title-link{
    padding-left: 2rem;
    color: #fff !important;
}
.dx-sub-nav .dx-title-link:hover{
    color: #8AEBEA !important; 
}
/* nav动画效果 */
.dx-collapse-transition {
  transition: height .3s  ease-in-out;
}
</style>