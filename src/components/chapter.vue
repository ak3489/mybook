<template>
  <div class="chapter">
    <div class="til">{{ chapter }}{{ id }}</div> 
    <div id="chapter" v-html="datas">     
      <div>{{ datas }}</div>
    </div>
    <div class="aside">
      <router-link :to="{ name: 'HelloWorld' }">返回首页</router-link>
      <router-link :to="{ name: 'books' }">返回书目</router-link>
      <router-link :to="{ name: 'chapter',params: { chapter: chapter+1} }">上一章</router-link>
      <router-link :to="{ name: 'chapter',params: { chapter: chapter+1} }">下一章</router-link>
    </div>   
    <!-- <aside><aside> -->
  </div>
</template>

<script>
const axios = require('axios')
export default {
  created: function(){
    const chapter = this.$route.params.title;
    const book = this.$route.params.book;
    this.chapter = chapter;
    this.book = book;
    const id = this.$route.params.id;
    // this.id = this.$route.params.id;
    console.log(id);
    axios.get('../../static/html/'+book+'/'+chapter+'.html')
    .then(response => {
      this.datas = response.data
    })
  },
  name: 'chapter',
  data () {
    return {
      id: '',
      chapter: '',
      datas: '',
      book: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #chapter{
    line-height: 1.8;
    font-size: 18px;
  }
  .til{
    text-align: center;
    margin-bottom: 20px;
  } 
</style>
