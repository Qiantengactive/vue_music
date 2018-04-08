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
        if (res.code === ERR_OK) {
          this.singers = res.data.list
        }
      })
    },
    _normalizeSinger (list) {
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
