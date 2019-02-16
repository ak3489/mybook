<template>
  <div class="books">
    <router-view>
    </router-view>
    <div class="til">{{ msg }}</div>
      <ul class="book-list">
        <li v-for="item in title" :key="item.index"><router-link :to="{ name: 'chapter' }">{{ item.title }}</router-link></li>
      </ul>
    <div class="backhome"><router-link :to="{ name: 'HelloWorld' }">返回首页</router-link></div>
  </div>
</template>
<template id="c">
    <div class="books">
        user:{{ $route.params.id }}
        <div class="til">{{ msg }}</div>
        <ul class="book-list">
          <li v-for="item in title" :key="item.index"><router-link :to="{ name: 'chapter' }">{{ item.title }}</router-link></li>
        </ul>
    </div>
</template>
<script>
console.log(this);
const axios = require('axios')
var book ='神鬼湘西';
export default {
  created: function(){
    axios.get('../../static/html/'+book+'/'+book+'.json')
  .then(response => {
    this.title = response.data.data
    // console.log(this.title);
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
