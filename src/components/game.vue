<template>
  <div class="game">
    <p>WITH THIS NUMBERS</p>
    <div v-for="n in numbers">
      {{n}}
    </div>
    <p>YOU MUST FIND</p>
    <p>{{to_find}}</p>
    <div v-for="n in possible_ops">
      <input @click="$socket.emit('op',{op:n, nbs:numbers})" :value="n" type="button">
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
		possible_ops: ['+', '-', '*'],
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
    	methods: {
	    button() {
		this.$socket.emit("button", this.isIn);
	    }
	},
    }
  </script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
      font-weight: normal;
  }

  ul {
      list-style-type: none;
      padding: 0;
  }

  li {
      display: inline-block;
      margin: 0 10px;
  }

  a {
      color: #42b983;
  }
  </style>
