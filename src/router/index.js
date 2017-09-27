import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import game from '@/components/game'

Vue.use(Router)

export default new Router({
  routes: [
      {
	  path: '/',
	  name: 'Hello',
	  component: Hello
      },
      {
	  path: '/game',
	  component: require('@/components/game'),
	  component: game
      }

  ]
})
