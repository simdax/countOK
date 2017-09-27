<template>
  <div>   
    {{ $route.params }}
  </div>
</template>

<script>
    export default {
	data() {
	    return {
		res: 0,
	    }
	},
	mounted () {
	    setTimeout(()=>{
		this.$router.push({name:'game'})
	    }, 1300)
	}
    }
</script>

<style>
</style>
