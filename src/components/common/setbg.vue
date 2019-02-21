<template>
  <div class="setbg">
    <input type="text" v-model="bgurl" placeholder="这里输入图片地址" class="form-control inline-block">
    <button class="btn btn-primary" v-on:click="setbg">设置背景</button>
  </div>
</template>
<script>
var num = 18;
export default {
  data () {
    return {
      bgurl: '',
    }
  },
  methods: {
    setbg: function(){
      document.querySelector("body").style.backgroundImage="url("+this.bgurl+")"
    }
  },
   name: 'setbg'
}
</script>
<style scoped>
.setbg{text-align: center;margin-bottom: 15px;}
.setbg .btn{margin-left: 10px;}
</style>
