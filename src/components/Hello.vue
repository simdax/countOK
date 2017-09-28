<template>
  <div class="hello">
    <img src="../assets/pi.jpg">
    <h1> Bienvenue </h1>
    <p>{{msg}}</p>
    <p>{{msg2}}</p>
    <div class="roundedOne">
      <input @click="button" v-model="isIn" type="checkbox">
      <label for="roundedOne"></label>
    </div>
    <p>{{msg3}}</p>
    <input @keydown.13="$socket.emit('chat', chat); chat=''" v-model="chat" type="textarea"/>
    <div class="chat">
      <ul v-for="bla in blablaRev">
	<li v-text="bla"></li>
      </ul>
    </div>
  </div>
</template>

<script>
    export default {
	name: 'hello',
	data () {
	    return {
		isIn: false,
		msg: 'Bienvenue',
		msg2: 'A game will start when we\'ve find 3 people',
		msg3:'Chat',
		blabla: [],
		chat: ''
	    }
	},	
	sockets:{
	    blabla(a){
		this.blabla.push(a);
		if(this.blabla.length > 10)
		{this.blabla.splice(0, 1)}
	    },
	    game(args){
		this.$router.push({name: 'game', params:args})
	    },
	    first(a){
		this.msg = a;
	    }
	},
    	methods: {
	    button() {
		this.$socket.emit("button", {isIn: this.isIn});    
	    }
	},
	computed: {
	    blablaRev(){
		return this.blabla.reverse()
	    }
	},
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style src="./rounded.css" />
<style lang='scss' scoped>
.roundedOne{
	height: 10vh;
	input{
	    outline: none;
	    transform: scale(2);
	}
    }
    .chat{
	height: 40vh;
    }
    p{
	font-size: 1.4em;
	font: "Roboto"
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
