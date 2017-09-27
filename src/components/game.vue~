<template>
  <div class="hello">
    <div>
      {{msg}}
    </div>
    <input @click="button" v-model="isIn" type="checkbox"/>
    <input @keydown.13="$socket.emit('chat', chat); chat=''" v-model="chat" type="textarea"/>
    <ul v-for="bla in blabla">
      <li v-text="bla"></li>
    </ul>
  </div>
</template>

<script>
    export default {
	name: 'hello',
	data () {
	    return {
		isIn: false,
		msg: 'Bienvenue',
		blabla: [],
		chat: ''
	    }
	},	
	sockets:{
	    connect(){},
	    blabla(a){
		this.blabla.push(a);
		if(this.blabla.length > 10)
		    {this.blabla.splice(0, 1)}
	    },
	    first(a){
		this.msg = a;
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
