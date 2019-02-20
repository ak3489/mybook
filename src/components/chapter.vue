<template>
  <div class="chapter">
    <div class="til">{{ chapter }}</div> 
    <div id="chapter" v-html="datas">     
      <div>{{ datas }}</div>
    </div>
    <div class="aside">
      <router-link :to="{ name: 'chapter',params: { title: this.next } }" @click.native="flushCom">下一章</router-link>
      <router-link :to="{ name: 'HelloWorld' }">返回首页</router-link>
      <router-link :to="{ name: 'books' }">返回书目</router-link>
      <router-link :to="{ name: 'chapterlist',params: { book: book } }">章节列表</router-link>
      <router-link :to="{ name: 'chapter',params: { title: this.pre } }" @click.native="flushCom">上一章</router-link>
     
    </div>   
    <!-- <aside><aside> -->
  </div>
</template>

<script>
const axios = require('axios')
export default {
  created: function(){
    let chapter = this.$route.params.title;
    const book = this.$route.params.book;
    this.chapter = chapter;
    this.book = book;
    axios.get('../../static/html/'+book+'/'+chapter+'.html')
    .then(response => {
      this.datas = response.data
      // console.log(response);
    })
    axios.get('../../static/html/'+book+'/'+book+'.json')
    .then(response => {
      // console.log(  chapter );
      this.title = response.data.data
      
      for(var key in response.data.data)
        {
          // console.log("key:" + key);
          // console.log("对应的值是:" + response.data.data[key].title);
          if(response.data.data[key].title == chapter){
            this.id = key;
          }
        } 
        // console.log(this.id,response.data.data.length);
        if(this.id == 0){
          var preTxt = response.data.data[0].title;
          var nextTxt = response.data.data[1].title;
        }else if(this.id == response.data.data.length-1){
          var preTxt = response.data.data[this.id-1].title;
          var nextTxt = response.data.data[0].title;
        }else{
          var preTxt = response.data.data[this.id-1].title;
          var nextTxt = response.data.data[parseInt (this.id)+1].title;
        }    
        this.pre = preTxt;
        this.next = nextTxt;
        // console.log(this.pre,this.next);
    })
  },
  name: 'chapter',
  methods: {
    flushCom:function(){
      this.$router.go(0);
    }        
  },
  data () {
    return {
      id: '',
      chapter: '',
      datas: '',
      book: '',
      pre: '',
      next: '',      
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
