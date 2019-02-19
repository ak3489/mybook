<template>
  <div class="aside">
    <router-link :to="{ name: 'chapter',params: { chapter: chapter+1} }">上一章</router-link>
    <router-link :to="{ name: 'chapter',params: { chapter: chapter+1} }">下一章</router-link>
  </div>  
</template>
<script>
export default {
   name: 'aside'
}
</script>
<style scoped>
</style>
