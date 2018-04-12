<template>
  <v-scroll @scroll="scroll" :listen-scroll="listenScroll" :probe-type="probeType" class="listview" :data="dataSingers" ref="listview">
    <ul>
      <!-- 歌手信息 -->
      <li v-for="(group,index) in dataSingers" :key="index" class="list-group" ref="listGroup">
        <h2 v-if="dataSingers.length" class="list-group-title">{{group.title}}</h2>
        <ul>
          <li @click="selectItem(item)" v-for="(item,index) in group.items" :key="index" class="list-group-item">
            <img class="avatar" v-lazy="item.avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <!--
        touchstart //手指触碰屏幕
        touchmove //手指在屏幕上滑动
        touchend //手指离开屏幕
      -->
    <!-- 右侧字母简写提示 -->
    <div class="list-shortcut" @touchstart.stop.prevent="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove" @touchend.stop>
      <ul>
        <li v-for="(item,index) in shortcutList" :key="index" :data-index="index" :class="{'current':currentIndex===index}" class="item">{{item}}</li>
      </ul>
    </div>
    <!-- 歌手展示条 -->
    <div class="list-fixed" ref="fixed" v-show="fixedTitle">
      <div class="fixed-title">{{fixedTitle}}</div>
    </div>
    <div v-show="!dataSingers.length" class="loading-container">
      <v-loading></v-loading>
    </div>
  </v-scroll>
</template>
<script>
import scroll from '@/base/scroll/scroll'
import loading from '@/base/loading/loading'
import { getData } from 'common/js/dom'
// const TITLE_HEIGHT = 30
// const ANCHOR_HRIGHT = 18
export default {
  props: {
    dataSingers: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  created () {
    this.probeType = 3
    this.listenScroll = true
    this.touch = {}
    this.listHeight = []
  },
  data () {
    return {
      scrollY: -1,
      currentIndex: 0,
      diff: -1
    }
  },
  methods: {
    selectItem (item) {
      this.$emit('select', item)
    },
    onShortcutTouchStart (e) {
      let anchorIndex = getData(e.target, 'index')
      let firstTouch = e.touches[0]
      this.touch.y1 = firstTouch.pageY
      this.touch.anchorIndex = anchorIndex
      this._scrollTo(anchorIndex)
    },
    onShortcutTouchMove () { },
    _scrollTo (index) {
      if (!index && index !== 0) {
        return
      }
      if (index < 0) {
        index = 0
      } else if (index > this.listHeight.length - 2) {
        index = this.listHeight.length - 2
      }
    },
    /* 子传递给父 滑动屏幕触发listenScroll */
    scroll (pos) {
      this.scrollY = pos.y
    }
  },
  components: {
    'v-scroll': scroll,
    'v-loading': loading
  },
  computed: {
    /* 返回字母前缀 */
    shortcutList () {
      return this.dataSingers.map(group => {
        return group.title.substr(0, 1)
      })
    },
    fixedTitle () {
      if (this.scrollY > 0) {
        return ''
      }
      console.log(this.currentIndex)
      let obj = this.dataSingers[this.currentIndex] ? this.dataSingers[this.currentIndex].title : ''
      console.log(obj)
      return obj
    }
  },
  mounted () {
    console.log(11111111)
    console.log(this.dataSingers)
    console.log(1111111)
  },
  watch: {
    data () {

    },
    scrollY (newY) {
      const listHeight = this.listHeight
      // /* 当滚动到顶部 newY > 0 */
      if (newY > 0) {
        this.currentIndex = 0
        return
      };
    }
    // for (let i = 0; i<this.listHeight.length - 1; i++) {

    // }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.listview {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: $color-background;

  .list-group {
    padding-bottom: 30px;

    .list-group-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }

    .list-group-item {
      display: flex;
      align-items: center;
      padding: 20px 0 0 30px;

      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }

      .name {
        margin-left: 20px;
        color: $color-text-l;
        font-size: $font-size-medium;
      }
    }
  }

  .list-shortcut {
    position: absolute;
    z-index: 30;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    padding: 20px 0;
    border-radius: 10px;
    text-align: center;
    background: $color-background-d;
    font-family: Helvetica;

    .item {
      padding: 3px;
      line-height: 1;
      color: $color-text-l;
      font-size: $font-size-small;

      &.current {
        color: $color-theme;
      }
    }
  }

  .list-fixed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;

    .fixed-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: $color-highlight-background;
    }
  }

  .loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
