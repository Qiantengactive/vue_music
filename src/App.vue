<template>
  <div id="app">
    <v-mheader></v-mheader>
    <v-tab></v-tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <v-player></v-player>
  </div>
</template>

<script>
import MHeader from 'components/m-header/m-header'
import tab from 'components/tab/tab'
import Player from 'components/player/player'
export default {
  components: {
    'v-mheader': MHeader,
    'v-tab': tab,
    'v-player': Player
  }
}
</script>

<style lang="stylus">
</style>
