<template>
  <div class="hello f-tc">
    <div>{{ msg }} </div>
    <router-link :to="{ name: 'books' }">小说列表</router-link>
    <div class="getbook">
      <input type="text" value="" placeholder="这里输入列表地址" class="form-control inline-block">
      <button class="btn btn-primary" v-on:click="getbook">获取小说</button>
    </div>
  </div>
</template>

<script>
const axios = require('axios')
var shell = require('shelljs');
var url="http://www.ebtang.com/book/2401/directory";
export default {
  name: 'HelloWorld',
  methods: {
    getbook: function(url){
    // shell.echo(shell.exec('ls'));
    // shell.cd('../src');
    // shell.cd('../../mybook');
    // shell.exec('node getbook.js');
      // console.log(url);
    }
  },
  data () {
    return {
      msg: '仅限学习交流用，内容不定期删除'
    }
  }
}
// console.log(this.a.methods);
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.getbook{
  margin: 20px auto;  
}
.getbook .btn{
  margin-left: 10px;
}
a{
  color: #e96900;
}
.hello{
  line-height: 1.5;
}
</style>
