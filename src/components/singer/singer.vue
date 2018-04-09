<template>
  <div class="singer" ref="singer">
    <v-listview @select="selectSinger" :data="singers" ref="list"></v-listview>
    <router-view></router-view>
    <div @touchstart.stop.prevent="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove" @touchend.stop></div>
  </div>
</template>
<script>
import listView from 'base/listview/listview'
import { getSingerList } from 'api/singer'
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
      getSingerList().then(res => {
        console.log(res)
        if (res.code === ERR_OK) {
          this.singers = this._normalizeSinger(res.data.list)
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
        console.log(item)
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
        const key = item.Findex
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
      console.log(map)
    }
  },
  components: {
    'v-listview': listView
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
