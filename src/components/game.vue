<template>
  <div class="game">
    <h1>WITH THESE NUMBERS</h1>
    <p v-for="n in $route.params.numbers">
      {{n}}
    </p>
    <h2>YOU MUST FIND</h2>
    <p>{{to_find}}</p>
    <div class="buttons">
      <div class="roundedOne" v-for="n in $route.params.possible_ops">
	<input @click="$socket.emit('op',{op:n, nbs:numbers, to_find})" type="button" :value='n'>
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
	    	possible_ops: [],
		numbers: [],
		to_find: 0
	    }
	},
	mounted(){
	    this.possible_ops = ['+', '*', '-']
	    this.numbers = this.$route.params.numbers
	    this.to_find = this.$route.params.to_find
	},
	sockets:
	{
	    goTo (args) {
		args.ok = (args.res == this.to_find)
		args.id = $route.params.id
		this.ops = []
		this.$router.push({name:'stats', params: args})
	    }
	},
    }
  </script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>

.game{
      display: flex column;
      justify-content: space-between
  }

.buttons
{
    height: 10vh;
    width: 50vw;
    display: flex;
    justify-content: space-evenly;
  }
  p{
      font-size: 2em
  }
  input{
      padding: 10px;
      font-size: 2em;
      border-radius: 30%;
      margin: 10px;
      &:nth-of-type(2){
	  self-align: center
      }
  }
  

</style>
