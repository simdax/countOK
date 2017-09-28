<template>
  <div class="game">
    <h1>WITH THESE NUMBERS</h1>
    <p v-for="n in numbers">
      {{n}}
    </p>
    <h2>YOU MUST FIND</h2>
    <p>{{to_find}}</p>
    <div class="buttons">
      <div class="roundedOne" v-for="n in possible_ops">
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
	data () {
	    return {
		numbers: [],
		ops: [],
		possible_ops: ['+', '*', '-'],
		to_find: 0,
		size: 3,
		to: 9
	    }
	},
	sockets:
	{
	    goTo (args) {
		args.ok = (args.res == this.to_find)
		this.ops = []
		this.$router.push({name:'stats', params: args})
	    }
	},
	mounted(){
	    for(var i = 0; i < this.size; i++)
	    {
		this.numbers.push(Math.ceil(Math.random() * this.to))
		if(i == 0)
		{this.to_find = this.numbers[i]}
		else
		{
		    let op = Math.floor(Math.random() * this.possible_ops.length)
		    this.ops.push(this.possible_ops[op])
		    this.equation = `${this.to_find} ${this.ops[i - 1]} ${this.numbers[i]}`
		    this.to_find = eval(this.equation)
		}
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
