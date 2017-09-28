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
	computed:{
	    msg(){
		return this.$route.params.win ? "WIN" : "LOSE"
	    }
	},
	mounted () {
	    setTimeout(()=>{
		this.$socket.emit("game", $route.params.id)
	    }, 1300)
	}
    }
</script>

<style>
</style>
