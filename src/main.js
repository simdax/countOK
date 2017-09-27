// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// import io from 'socket.io-client'
// const socket = io('http://localhost:8080')
// socket.on('connect', onConnect)
// function onConnect(s)
// {
//     console.log('client connection', s)
// }

import m from 'vue-socket.io'
Vue.use(m, 'http://localhost:8080')

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
