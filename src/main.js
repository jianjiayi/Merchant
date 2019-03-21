// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import VideoPlayer from 'vue-video-player';
require('video.js/dist/video-js.css');
require('vue-video-player/src/custom-theme.css');
Vue.use(VideoPlayer);


import axios from './api/axios.js';
Vue.prototype.$ajax = axios;

Vue.config.productionTip = false;

//路由拦截器
router.beforeEach(({meta, path}, from, next) => {
  let { auth = true } = meta;//该路由是否需要登录

  let $user = JSON.parse(sessionStorage.getItem('$user')) || {};
  let isLogin = Boolean($user.auth);//true用户已登录， false用户未登录

  if (!auth && !isLogin && path != '/login') {
    return next({ path: '/login' })
  }else{
    next()
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
