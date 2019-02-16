<template>
  <div id="app">
    <img src="../src/assets/logo.jpg" class="top-img">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
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
