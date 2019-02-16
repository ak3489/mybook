<template>
  <div class="hello f-tc">
    <div>{{ msg }} </div>
    <router-link :to="{ name: 'books' }">小说列表</router-link>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '欢迎使用我的小说工具'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a{
  color: #e96900;
}
.hello{
  line-height: 1.5;
}
</style>
