import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import game from '@/components/game'
import gameEnd from '@/components/game_end'

Vue.use(Router)

export default new Router({
  routes: [
      {
	  path: '/',
	  name: 'Hello',
	  component: Hello
      },
      {
	  path: '/end',
	  name: 'stats',
	  component: gameEnd
      },
      {
	  path: '/game',
	  name: 'game',
	  component: game
      }

  ]
})
