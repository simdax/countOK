<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
    export default {
	name: 'app'
    }
  </script>

<style>

  input[type=button]{
      outline: none
  }
  img{
      height: 20vh
  }
  html, body{
      margin: 0;
      height: 95vh
  }
  #app {
      display: flex;
      align-items: center;
      justify-content: space-around;
      flex-direction: column;
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #2c3e50;
  }
</style>
