<template>
  <div>
    <h1>
      {{msg}}
    </h1>
    <p v-if="$route.params.wins">
      You won {{$route.params.wins}} times
    </p>
    <ul>
      <li>scores : </li>
      <li v-for="k, v in score"> {{k}} : {{v}} </li>
    </ul>
  </div>
</template>

<script>
    export default {
	data() {
	    return {
		score: [],
		res: 0,
	    }
	},
	sockets:{
	    score(args) {
		console.log(args)
		for(i in args){this.score.push(args[i])}
	    },
	    game(args){
	    	this.$router.push({name: 'game', params:args})
	    }
	},
	computed:{
	    msg(){
		return this.$route.params.win ? "WIN" : "LOSE"
	    }
	},
	mounted () {
	    setTimeout(()=>{
		this.$socket.emit("go", {id: this.$route.params.id, regen:true})
	    }, 3300)
	}
    }
</script>

<style>
</style>
