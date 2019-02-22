<template>
  <div class="books">
    <!-- <router-view>
    </router-view> -->
    <div class="til">{{ msg }}</div>
      <ul class="book-list">
        <!-- <li v-for="item in books" :key="item.index"><a :href ="'/shtml/'+item.book+'.html'" target="_blank">{{ item.book }}</a></li> -->
        <li v-for="item in books" v-bind:key="item.id"><router-link :to="{ name: 'chapterlist',params: { book: item.book } }">{{ item.book }}</router-link></li>
      </ul>
    <!-- <div class="backhome"><router-link :to="{ name: 'HelloWorld' }">返回首页</router-link></div> -->
     <asideTool :isntbook="isntbook"></asideTool>
  </div>
</template>
<script>
const axios = require('axios')
import asideTool from './common/asideTool'
export default {
  components: {
    asideTool
  },
  created: function(){
    axios.get('../../static/books.json')
    .then(response => {
      this.books = response.data.data
      // console.log(this.books);
    })
  },
  name: 'books',
  data () {
    return {
      msg: '小说列表页',
      books: [
        
      ],
      isntbook: false,
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
