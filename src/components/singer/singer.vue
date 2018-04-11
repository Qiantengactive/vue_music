<template>
  <div class="singer" ref="singer">
    <v-listview @select="selectSinger" :dataingers="singers" ref="list"></v-listview>
    <router-view></router-view>
    <!-- <div @touchstart.stop.prevent="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove" @touchend.stop></div> -->
  </div>
</template>
<script>
import listView from 'base/listview/listview'
import { getSingerList } from '@/api/singer'
import { ERR_OK } from '@/api/config'
import Singer from 'common/js/singer'

const HOT_SINGER_LEN = 10
const HOT_NAME = '热门'
export default {
  data () {
    return {
      singers: []
    }
  },
  created () {
    this._getSingerList()
  },
  methods: {
    handlePlaylist (playlist) {

    },
    selectSinger (singer) {

    },
    _getSingerList () {
      // console.log(1)
      getSingerList().then(res => {
        // console.log(res)
        if (res.code === ERR_OK) {
          this.singers = this._normalizeSinger(res.data.list)
          // console.log(this.singers)
        }
      })
    },
    _normalizeSinger (list) {
      /* 热门数据 */
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      list.forEach((item, index) => {
        // console.log(item)
        /* 长度默认 显示9条数据 */
        if (index < HOT_SINGER_LEN) {
          // map.hot.items.push({
          //   id: item.Fsinger.mid,
          //   name: item.Fsinger.name,
          //   avatar: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${id}.jpg?max_age=2592000`
          // })
          map.hot.items.push(new Singer({
            name: item.Fsinger_name,
            id: item.Fsinger_mid
          }))
        }
        // console.log('map')
        // console.log(map)
        // console.log('map')
        /* key A B C D */
        const key = item.Findex
        /* 如果不存在A B就给一个空 */
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new Singer({
          name: item.Fsinger_name,
          id: item.Fsinger_mid
        }))
      })
      /* 为了得到有序的列表，我们需要处理map */
      // console.log(map)
      /* 热门 */
      let hot = []
      let ret = []
      /* 遍历map */
      for (let key in map) {
        // console.log('key')
        // console.log(key)
        // console.log('key')
        let val = map[key]
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else if (val.title === HOT_NAME) {
          hot.push(val)
        }
      }
      /* 排序 */
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      // console.log('hot')
      // console.log(hot)
      // console.log('hot')
      // console.log('ret')
      // console.log(ret)
      // console.log('ret')
      let obj = hot.concat(ret)
      console.log(obj)
      return obj
    }
  },
  components: {
    'v-listview': listView
  },
  mounted () {
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.singer {
  position: fixed;
  top: 88px;
  bottom: 0;
  width: 100%;
}
</style>
