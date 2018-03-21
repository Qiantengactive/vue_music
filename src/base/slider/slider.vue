<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(item,index) in dots" :class="{active:currentPageIndex === index }" :key="index"></span>
    </div>
  </div>
</template>

<script>
import { addClass } from 'common/js/dom'
import BScroll from 'better-scroll'
export default {
  name: 'slider',
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    }
  },
  data () {
    return {
      dots: [],
      currentPageIndex: 0
    }
  },
  methods: {
    /* 计算设置宽度 */
    _setSliderWidth (isResize) {
      let width = 0
      let sliderWidth = 0
      this.children = this.$refs.sliderGroup.children // dom对象
      // console.log(this.$refs.sliderGroup.children)
      // console.log(this.$refs.sliderGroup.children.length)
      sliderWidth = this.$refs.slider.clientWidth
      for (let i = 0; i < this.children.length; i++) {
        // console.log(this.children[i])
        let child = this.children[i]
        // console.log(child.className)
        addClass(child, 'slider-item')
        // console.log(child.className)
        child.style.width = sliderWidth + 'px'
        width += sliderWidth
      }
      /* 加两倍宽度 */
      if (this.loop && !isResize) {
        width += 2 * sliderWidth
      }
      this.$refs.sliderGroup.style.width = width + 'px'
    },
    // momentum
    // 当快速在屏幕上滑动一段距离的时候，会根据滑动的距离和时间计算出动量，
    // 并生成滚动动画。设置为 true 则开启动画。
    // snapLoop
    // 是否可以无缝循环轮播
    // snapSpeed
    // 轮播切换时间
    _initSlider () {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: true,
        snapLoop: this.loop,
        snapSpeed: 400,
        snapThreshold: 0.3
      })
      this.slider.on('scrollEnd', () => {
        /* 获取当前页面第几个子元素 */
        let pageIndex = this.slider.getCurrentPage().pageX
        console.log('pageIndex:' + pageIndex)
        /* 循环下减1 */
        if (this.loop) {
          pageIndex -= 1
        }
        this.currentPageIndex = pageIndex
        console.log('减去后currentPageIndex' + this.currentPageIndex)
        if (this.autoPlay) {
          // clearTimeout(this.timer)
          this._play()
        }
      })
      this.slider.on('beforeScrollStart', () => {
        console.log('beforeScrollStart')
        if (this.autoPlay) {
          clearTimeout(this.timer)
        }
      })
    },
    _initDots () {
      this.dots = new Array(this.children.length)
    },
    _play () {
      let pageIndex = this.currentPageIndex + 1
      console.log('currentPageIndex+1:' + pageIndex)
      if (this.loop) {
        pageIndex += 1
        console.log('currentPageIndex+1:' + pageIndex)
      }
      this.timer = setTimeout(() => {
        this.slider.goToPage(pageIndex, 0, 400)
      }, this.interval)
    }
  },
  mounted () {
    setTimeout(() => {
      this._setSliderWidth()
      this._initDots()
      this._initSlider()
      if (this.autoPlay) {
        this._play()
      }
    }, 20)
  },
  activated () {
    // keep-alive组件激活时调用。
    // 该钩子在服务器端渲染期间不被调用。
    if (this.autoPlay) {
      this._play()
    }
  },
  deactivated () {
    // keep-alive组件停用时调用。
    // 该钩子在服务端渲染期间不被调用。
    clearTimeout(this.timer)
  },
  beforeDestroy () {
    // 实例销毁之间调用。在这一步，实例仍然完全可用。
    // 该钩子在服务端渲染期间不被调用。
    clearTimeout(this.timer)
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.slider {
  min-height: 1px;

  .slider-group {
    position: relative;
    overflow: hidden;
    white-space: nowrap;

    .slider-item {
      float: left;
      box-sizing: border-box;
      overflow: hidden;
      text-align: center;

      a {
        display: block;
        width: 100%;
        overflow: hidden;
        text-decoration: none;
      }

      img {
        display: block;
        width: 100%;
      }
    }
  }

  .dots {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 12px;
    text-align: center;
    font-size: 0;

    .dot {
      display: inline-block;
      margin: 0 4px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: $color-text-l;

      &.active {
        width: 20px;
        border-radius: 5px;
        background: $color-text-ll;
      }
    }
  }
}
</style>
