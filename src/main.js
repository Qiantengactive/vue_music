// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill' // es6 api做转义
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick' // 处理移动端300毫秒延迟
import 'common/stylus/index.styl'
// import VueLazyLoad from 'vue-lazyload'

fastclick.attach(document.body)
// Vue.use(VueLazyLoad, {
//   loading: require('common/')
// })

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
