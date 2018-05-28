import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import user from './user.js';

export default new Vuex.Store({
  modules: {
    user
  },
  strict: process.env.NODE_ENV !== 'production', //在非生产环境下，使用严格模式
})
