<template>
  <div class="chapter">
    <setbg></setbg>
    <setfont></setfont>     
    <div class="til">{{ chapter }}</div>     
    <div id="chapter" v-html="datas">     
      <div>{{ datas }}</div>
    </div>
    <asideTool :ischapter="ischapter" :pre="pre" :next="next" :book="book"></asideTool>
  </div>
</template>

<script>
const axios = require('axios')
import asideTool from './common/asideTool'
import setfont from './common/setfont.vue'
import setbg from './common/setbg.vue'
export default {
  components: {
    setfont,setbg,asideTool
  },
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
    },
    backTop:function(){
      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
            window.requestAnimationFrame(this.backTop);
            window.scrollTo (0,currentScroll - (currentScroll/5));
        }
    },
  },
  data () {
    return {
      id: '',
      chapter: '',
      datas: '',
      book: '',
      pre: '',
      next: '',
      ischapter: true,
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #chapter{
    line-height: 1.8;
    font-size: 18px;
    background: rgba(248,248,248,0.85);
    padding: 1rem;
    border-radius: 1rem;
  }
  .til{
    text-align: center;
    margin-bottom: 20px;
  } 
</style>
