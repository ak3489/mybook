<template>
  <div class="books" v-if="ishtml">
    <div class="til">{{ book }}<button class="btn btn-primary" v-on:click="updatebook">更新小说</button></div>
      <ul class="book-list" >
        <li v-for="item in pagedata" v-bind:key="item.id"><router-link :to="{ name: 'chapter',params: { title: item.title } }">{{ item.title }}</router-link></li>
      </ul>
      <asideTool></asideTool>
      <pagination
      @change="onPageChange"
      :page-size="size"
      :total="total"
      :totalData="title"
      layout="jumper,total"
      :currentPage="curPage"
    />
  </div>
  <div class="txt-chapter" v-else>
    <setbg></setbg>
    <setfont></setfont>  
    <div class="til">{{ book }}</div>
      <div id="chapter" v-html="datas">{{ datas }}</div>
      <asideTool></asideTool> 
  </div>
</template>
<script>
const axios = require('axios')
import pagination from './common/pagination'
import asideTool from './common/asideTool'
import setfont from './common/setfont.vue'
import setbg from './common/setbg.vue'
export default {
  components: {
    setfont,setbg,pagination,asideTool
  },
  created: function(){
    var book = this.$route.params.book;
    this.book = book;
   axios.get('../../static/html/'+book+'/'+book+'.json')
   .then(response => {
        this.title = response.data.data
        this.total = response.data.total;
        this.pagedata =  this.title.slice(0,this.size);
        // console.log( this.title);
        return this.total;
    })
  .catch( (error) =>{
    if (error.response) {
      // 请求已发出，但服务器响应的状态码不在 2xx 范围内
      // console.log(error.response.data);
      // console.log(error.response.status);
      // console.log(error.response.headers);
      if(error.response.status == "404"){
        // router.push({ path: 'chapter' })
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
  // console.log( this.total);
  },
  name: 'books',
  methods: {
    updatebook: function(){
      alert("还没写好");
    },
    objOfPropertyToArr: function(object){
      var arr = [];
      var i = 0;
      for (var item in object) {
          arr[i] = object[item];
          i++;
      }
      return arr;
    },
    onPageChange:function(page){      
      this.curPage = page.curPage;      
      this.pagedata = this.objOfPropertyToArr(page.page)
      // console.log(this.pagedata);
    }
  },
  data () {
    return {
      msg: '小说列表页',
      book: '',
      ishtml: true,
      datas: [],
      title: [],
      pagedata:[],
      total: 40,
      size: 42,
      curPage: 1,
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
.til .btn{margin-left: 20px;}
</style>