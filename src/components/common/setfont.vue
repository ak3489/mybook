<template>
  <div class="setfont">
    <input type="button" value="+" name="" v-on:click="fontp" />
    <input type="button" value="-" name="" v-on:click="fontr" />
    <input type="button" value="黑" name="" v-on:click="fontb" />
    <input type="button" value="白" name="" v-on:click="fontw" />
  </div>
</template>
<script>
var num = 18;
export default {
  methods: {
    fontp: function(){
      num++;
      document.querySelector("#chapter").style.fontSize=num+'px'
    },
    fontr: function(){
      num--;
      document.querySelector("#chapter").style.fontSize=num+'px'
    },
    fontb: function(){
      num--;
      document.querySelector("#chapter").style.color="#000"
    },
    fontw: function(){
      num--;
      document.querySelector("#chapter").style.color="#fff"
    },
  },
   name: 'setfont'
}
</script>
<style scoped>
.setfont{text-align: center;margin-bottom: 15px;}
.setfont input{width: 30px;height: 30px;}
</style>
