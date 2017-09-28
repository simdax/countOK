<template>
  <div class="game">
    <h1>WITH THESE NUMBERS</h1>
    <h1>IN THIS ORDER</h1>
    <p v-for="n in $route.params.numbers">
      {{n}}
    </p>
    <h2>YOU MUST FIND</h2>
    <p>{{to_find}}</p>
    <div class="buttons">
      <div class="roundedOne" v-for="n in $route.params.possible_ops">
	<input @click="click(n)" type="button" :value='n'>
	<label for="roundedOne"></label>
      </div>
    </div>
    <input @click="$router.push({name:'Hello'})" value="I quit !" type="button">
  </div>
</template>

<script>
    export default {
	name: 'game',
	data(){
	    return {
		clicks: [],
	    	possible_ops: [],
		numbers: [],
		to_find: 0
	    }
	},
	methods:{
	    click(op){
		this.clicks.push(op)
		if (this.clicks.length == 2)
		{
		    this.$socket.emit('op', {
			ops: this.clicks,
			numbers: this.numbers,
			to_find: this.to_find,
			id: this.id
		    })
		}
	    }
	},
	mounted(){
	    this.possible_ops = ['+', '*', '-']
	    this.numbers = this.$route.params.numbers
	    this.to_find = this.$route.params.to_find
	    this.id = this.$route.params.id
	},
	sockets:
	{
	    goTo (args) {
		args.ok = (args.res == this.to_find)
		args.id = this.id
		this.ops = []
		this.$router.push({name:'stats', params: args})
	    }
	},
    }
  </script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>

.game{

  }
  .buttons
  {
      display: flex;
      justify-content: space-evenly;
  }
  p{
      font-size: 1em
  }
  input{
      font-size: 2em;
      margin: 10px;
      padding: 15px 30px;
      border-radius: 44%;
  }
  

</style>
