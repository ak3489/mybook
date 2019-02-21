<template>
  <div class="books" v-if="ishtml">
    <div class="til">{{ book }}</div>
      <ul class="book-list" >
        <li v-for="item in title" v-bind:key="item.id"><router-link :to="{ name: 'chapter',params: { title: item.title } }">{{ item.title }}</router-link></li>
      </ul>
      <div class="aside">
        <router-link :to="{ name: 'HelloWorld' }">返回首页</router-link>
        <router-link :to="{ name: 'books' }">返回书目</router-link>
      </div> 
  </div>
  <div class="txt-chapter" v-else>
    <div class="til">{{ book }}</div>
      <div id="chapter" v-html="datas">{{ datas }}</div>
      <div class="aside">
        <router-link :to="{ name: 'HelloWorld' }">返回首页</router-link>
        <router-link :to="{ name: 'books' }">返回书目</router-link>
      </div> 
  </div>
</template>
<script>
const axios = require('axios')
export default {
  created: function(){
    var book = this.$route.params.book;
    this.book = book;
   axios.get('../../static/html/'+book+'/'+book+'.json')
   .then(response => {
        this.title = response.data.data
        // console.log( this.title);
    })
  .catch( (error) =>{
    if (error.response) {
      // 请求已发出，但服务器响应的状态码不在 2xx 范围内
      // console.log(error.response.data);
      // console.log(error.response.status);
      // console.log(error.response.headers);
      if(error.response.status == "404"){
        this.ishtml = false;
        axios.get('../../static/html/'+book+'/'+book+'.html')
        .then(response => {
          // this.title = response.data.data
          this.datas = response.data
          // console.log( this.title);
        })
      }
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    // console.log(error.config);
  })
  },
  name: 'books',
  data () {
    return {
      msg: '小说列表页',
      book: '',
      ishtml: true,
      datas: [

      ],
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
