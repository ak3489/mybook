<template>
  <div id="app">
     <router-link :to="{ name: 'books' }"><img src="../src/assets/logo.jpg" class="top-img"></router-link>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style>
@import "../static/css/normalize.css";
@import "../static/css/style.css";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  max-width: 1080px;
  margin: 0 auto 40px;
}
</style>
