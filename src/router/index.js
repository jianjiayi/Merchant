import Vue from 'vue';
import Router from 'vue-router';
import home from '@/views/home.vue';
import sliderPath from './silderPath.js';//导入silder路由

Vue.use(Router)

export default new Router({
  routes:[
    {
      path: '/',
      name: 'home',
      meta: {
        name: '首页',
        auth: false,
      },
      component: home,
      children:sliderPath
    }
  ]
})
