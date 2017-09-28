<template>
  <div>
    {{ $route.params }},
    {{msg}}
  </div>
</template>

<script>
    export default {
	data() {
	    return {
		res: 0,
	    }
	},
	sockets:{
	    game(args){
		console.log(4564)
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
	    }, 1300)
	}
    }
</script>

<style>
</style>
