import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import books from '@/components/books'
import chapterlist from '@/components/chapterlist'
import chapter from '@/components/chapter'

Vue.use(Router)

// const page1 = { template: '<div>This is page1</div>' }

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/chapterlist/:book',
      name: 'chapterlist',
      component: chapterlist
    },
    {
      path: '/chapter/:book/:title',
      name: 'chapter',
      component: chapter
    },
    {
      path: '/books',
      name: 'books',
      component: books
    }
  ]
})
