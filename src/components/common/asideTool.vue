<template>
  <div class="aside">
    <router-link v-if="ischapter" :to="{ name: 'chapter',params: { title: this.next } }" @click.native="flushCom">下一章</router-link>
    <router-link :to="{ name: 'HelloWorld' }">返回首页</router-link>
    <router-link v-if="isntbook" :to="{ name: 'books' }">返回书目</router-link>
    <router-link v-if="ischapter" :to="{ name: 'chapterlist',params: { book: book } }">章节列表</router-link>
    <router-link v-if="ischapter" :to="{ name: 'chapter',params: { title: this.pre } }" @click.native="flushCom">上一章</router-link>
    <a v-on:click="backTop" class="backTop">返回顶部</a>
  </div>
</template>
<script>
export default {
  props: {
    ischapter: {
      type: Boolean,
      default: false
    },
    isntbook: {
      type: Boolean,
      default: true
    },
    pre: {
      type: String
    },
    next: {
      type: String
    },
    book: {
      type: String
    },
  },
  data () {
    return {
    }
  },
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
   name: 'asideTool'
}
</script>
<style scoped>
.aside{position: fixed;top: 350px;left: 50%;margin-left: 570px;text-align: center;} 
.aside a{display: block;padding: 10px 0;border-bottom: 1px dashed;}
.aside a:hover{color: #154298;}
.aside a:last-child{border-bottom: 0;}
@media screen and (max-width: 1080px) {
  .books li{width: calc((100% - 20px) / 2);}
  .books li:nth-child(3n) {margin-right: 20px;}
  .books li:nth-child(2n) {margin-right: 0;}
  .aside{position: static;margin-left: 0;margin-top: 10px;}
  .aside a{background: #6b6c70;color: #fff;margin-bottom: 10px;border-bottom: 0;}
  .aside a:hover{color: #fff;}
} 
</style>
