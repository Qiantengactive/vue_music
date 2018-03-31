<template>
  <div class="recommend" ref="recommend">
    <div v-if="recommends.length" class="slider-wrapper">
      <slider>
        <div v-for="(item,index) in recommends" :key="index">
          <a :href="item.linkUrl">
            <img :src="item.picUrl">
          </a>
        </div>
      </slider>
    </div>
    <div class="recommend-list">
      <h1 class="list-title">热门歌单推荐</h1>
      <ul>
        <li @click="selectItem(item)" v-for="(item,index) in discList" :key="index" class="item">
          <div class="icon">
            <img width="60" height="60" alt="" :src="item.imgurl">
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Slider from 'base/slider/slider'
import { getRecommend, getDiscList } from 'api/recommend'
import { ERR_OK } from 'api/config'
export default {
  data () {
    return {
      recommends: [],
      discList: []
    }
  },
  created () {
    this._getRecommend()
    this._getDiscList()
  },
  methods: {
    handlePlaylist (playList) {

    },
    loadImage () {

    },
    selectItem (item) {

    },
    _getRecommend () {
      getRecommend().then((res) => {
        // console.log('getRecommend' + res)
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider
          // console.log('getRecommend')
          // console.log(this.recommends)
          // console.log(this.recommends.length)
          // console.log('getRecommend')
        }
      })
    },
    _getDiscList () {
      getDiscList().then((res) => {
        if (res.code === ERR_OK) {
          alert(1)
          console.log(res)
          this.discList = res.data.list
        }
      })
    }
  },
  components: {
    Slider
  }

}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;

  .recommend-content {
    height: 100%;
    overflow: hidden;

    .slider-wrapper {
      position: relative;
      width: 100%;
      overflow: hidden;
    }

    .recommend-list {
      .list-title {
        height: 65px;
        line-height: 65px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-theme;
      }

      .item {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        padding: 0 20px 20px 20px;

        .icon {
          flex: 0 0 60px;
          width: 60px;
          padding-right: 20px;
        }

        .text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          line-height: 20px;
          overflow: hidden;
          font-size: $font-size-medium;

          .name {
            margin-bottom: 10px;
            color: $color-text;
          }

          .desc {
            color: $color-text-d;
          }
        }
      }
    }

    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
