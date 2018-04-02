<template>
  <transition name="slide">
    <v-musiclist :rank="rank" :title="title" :bj-image="bgImage" :songs="songs"></v-musiclist>
  </transition>
</template>
<script>
import Musiclist from 'components/music-list/music-list'
import { getMusicList } from 'api/rank'
import { ERR_OK } from 'api/config'
export default {
  computed: {
    title () {
      // return this.topList.topTitle
      return ''
    },
    bgImage () {
      if (this.songs.length) {
        return this.songs.length
      }
      return ''
    }
  },
  data () {
    return {
      songs: [],
      rank: true
    }
  },
  created () {
    this._getMusicList()
  },
  methods: {
    _getMusicList () {
      // if (!this.topList.id) {
      //   this.$router.push('/rank')
      //   return ''
      // }
      getMusicList(this.topList.id).then(res => {
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.songlist)
        }
      })
    }
  },
  components: {
    'v-musiclist': Musiclist
  }

}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
