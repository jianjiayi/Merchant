import Vue from 'vue';
import Router from 'vue-router';
import notFond from '@/views/error/404.vue';

import Login from '@/views/login.vue';

import home from '@/views/home.vue';
import sliderPath from './silderPath.js';//导入silder路由

Vue.use(Router)

export default new Router({
  routes:[
    {
      path: '/login',
      name: 'login',
      meta: {
        name: '登录',
      },
      component: Login,
    },
    {
      path: '/',
      name: 'home',
      meta: {
        name: '首页',
        auth: false,
      },
      component: home,
      children:sliderPath
    },
    {
      path: '/404',
      name: '404',
      meta: {
        name: '404',
      },
      component: notFond,
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
