<template>
  <div class="books">
    <div class="til">{{ msg }}</div>
      <ul class="book-list">
        <li v-for="item in title" v-bind:key="item.id"><router-link :to="{ name: 'chapter',params: { title: item.title, id: item.id } }">{{ item.title }}</router-link></li>
      </ul>
    <div class="">
       <router-link :to="{ name: 'books' }">返回小说列表</router-link>
      <router-link :to="{ name: 'HelloWorld' }">返回首页</router-link>
    </div>
  </div>
</template>
<script>

const axios = require('axios')
export default {
  created: function(){
    var book = this.$route.params.book;
    // console.log(this.$route.params.book);
    axios.get('../../static/html/'+book+'/'+book+'.json')
    .then(response => {
      this.title = response.data.data
      // console.log( response.data.data.id);
    })
  },

  name: 'books',
  data () {
    return {
      msg: '小说列表页',
      title: [
        
      ]
    }
  }
}
</script>
<style scoped>
@import "../../static/css/style.css";
.til{
  margin: 20px auto;
  font-size: 20px;
}
</style>
