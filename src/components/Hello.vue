<template>
  <div class="hello">
    <div>
      {{msg}}
    </div>
    <input @click="button" v-model="isIn" type="checkbox"/>
  </div>
</template>

<script>
    export default {
	name: 'hello',
	sockets:{
	    connect(){console.log("bienvenue")},
	    first(a){
		this.msg = a;
	    }
	},
    	methods: {
	    button() {
		this.$socket.emit("button", this.isIn);    
	    }
	},
	data () {
	    return {
		isIn: false,
		msg: 'salut les loulous'
	    }
	}
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
