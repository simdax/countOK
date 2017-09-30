<template>
  <div>
    <h1>{{msg}}</h1>
    <p v-if="$route.params.wins">
      You won {{$route.params.wins}} times
    </p>
    <ul>
      <li>scores : </li>
      <li v-for="s in sorted_score"> {{s.name}} : {{s.score}} </li>
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
		args.forEach(score => this.score.push(score))
		console.log(this.score)
	    },
	    game(args){
	    	this.$router.push({name: 'game', params:args})
	    }
	},
	computed:{
	    sorted_score(){
		return this.score.sort((a,b)=> a.score < b.score)
	    },
	    msg(){
		return this.$route.params.win ? "WIN" : "LOSE"
	    }
	},
	mounted () {
	    setTimeout(()=>{
		this.$socket.emit("go", {id: this.$route.params.id, regen:true})
	    }, 1600)
	}
    }
</script>

<style>
</style>
