import Vue from 'vue';
import Router from 'vue-router';
import notFond from '@/views/error/404.vue';

import Login from '@/views/login.vue';
import register from '@/views/register/index.vue';
import qualification from '@/views/register/qualification.vue';

import Portal from '@/views/portal/index.vue';

import home from '@/views/home.vue';
import sliderPath from './silderPath.js';//导入silder路由
import portalPath from './portal/index.js';//导入silder路由

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
      path:'/register',
      name:'register',
      meta:{
        icon:'',
        name:'账号注册',
      },
      component: register,
      children:[
        {
          path:'qualification',
          name:'qualification',
          meta:{
            name:'资质信息'
          },
          component:qualification
        },
      ]
    },
    {
      path:'/portal',
      name:'portal',
      meta:{
        name:'更多服务',
      },
      component:Portal,
      children:portalPath
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
