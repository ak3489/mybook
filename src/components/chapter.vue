<template>
  <div class="chapter">
    <div class="links">
      <router-link :to="{ name: 'HelloWorld' }">返回首页</router-link>
      <router-link :to="{ name: 'books' }">返回书目</router-link>
    </div>
    <div id="chapter" v-html="datas">      
      <div>{{ datas }}</div>
    </div>
  </div>
</template>

<script>
const axios = require('axios')
var chapter = '第三十六章百年一梦.html';
var book = '神鬼湘西';
export default {
  created: function(){
    axios.get('../../static/html/'+book+'/'+chapter+'')
  .then(response => {
    this.datas = response.data
  })
  },
  name: 'chapter',
  data () {
    return {
      msg: 'chapter',
      datas: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #chapter{
    line-height: 1.8;
  }
  .links{
    margin-bottom: 20px;
  }
</style>
