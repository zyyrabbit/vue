<template>
  <ul class="dx--tab">
    <div class="tabs__active-bar" :style="barStyle"></div>
    <li 
      :class="{'tab__active': select === index}" 
      class="dx--tab-item" 
      v-for="(item, index) in tabs" 
      :key="index" 
      :value="item.value" 
      @click="onTabClick(item, index)"
      ref="tab">{{item.label}}</li>
  </ul>
</template>
<script>
  export default {
		componentName: 'DxTabs',
		name: 'DxTabs',
    props: {
      value: {},
      tabs: Array
    },
    data() {
      return {
        // select: this.active
      }
    },
    methods: {
      onTabClick(tab, index) {
        this.select = index
        this.$emit('input', tab.value)
      }
    },
    computed: {
      select: {
        get() {
          let active = 0
          this.tabs.forEach((i, index) => {
            if (i.value === this.value) {
              active = index
            }
          })
          return active || 0
        },
        set(val) {
        }
      },
      barStyle: {
        cache: false,
        get() {
          if (!this.$refs.tab) return
          let style = {}
          let offset = 0
          let tabSize = 0
          this.tabs.every((tab, index) => {
            let $el = this.$refs.tab[index]
            if (index !== this.select) {
              offset += $el[`clientWidth`]
              return true
            } else {
              tabSize = $el[`clientWidth`]
              // 减去padding
              if (this.tabs.length > 1) {
                // tabSize -= (index === 0 || index === this.tabs.length - 1) ? 28 : 28
                // FIMXE 这里是写了一半的像素值
                tabSize -= 32
              }
              return false
            }
          })
          // 移动位置可以使用像素值 因为已经是根据元素的实际值计算的
          const transform = `translateX(${offset}px)`
          // FIMXE 这里是写了像素值
          style.width = tabSize + 'px'
          style.transform = transform
          style.msTransform = transform
          style.webkitTransform = transform
          return style
        }
      }
    },
    mounted() {
      this.$forceUpdate()
    }
  }
</script>
<style scoped lang="scss">
.dx--tab::-webkit-scrollbar { display: none }
.dx{
    &--tab {
    position: relative;
    padding-bottom: 1.4rem;
    width: 100%;
    overflow-x: scroll;
    // 父元素会根据字体撑开 需要设为0
    font-size: 0;
    white-space:nowrap;
    .tabs__active-bar { 
      position: absolute;
      bottom: 0;
      left: 0;
      height: 0.7rem;
      background-color: #666;
      border-radius: 0.4rem;
      z-index: 1;
      transition: transform .3s cubic-bezier(.645,.045,.355,1);
      list-style: none;
    }
    .tab__active{
      color: #666;
    }
  }
  &--tab-item {
    color: #aaa;
    font-size: 2.8rem;
    display: inline-block;
    padding-right: 6.5rem;
  }
}
</style>