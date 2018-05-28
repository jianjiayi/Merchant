import abstract from '@/views/common/abstract.vue';

import User from '@/views/setting/user.vue';

import goodsList from '@/views/goods/goods-list.vue';
import goodsPublist from '@/views/goods/goods-publish.vue';

import orderList from '@/views/orders/order-list.vue';


export default [
  {
    path:'/setting',
    name:'setting',
    meta:{
      name:'基本设置',
      auth:false,//这个字段以后用来验证必须登录才可以查看
      icon:'el-icon-setting',//用来存放图标
    },
    component:abstract,
    children:[
      {
        path:'user',
        name:'user',
        meta:{
          name:'个人中心',
          auth:false,
          icon:'',
        },
        component:User,
      }
    ]
  },
  {
    path:'/goods',
    name:'goods',
    meta:{
      name:'商品管理',
      auth:false,
      icon:'el-icon-picture',
    },
    component:abstract,
    children:[
      {
        path:'list',
        name:'goodslist',
        meta:{
          name:'商品列表',
          auth:false,
          icon:'',
        },
        component:goodsList,
      },
      {
        path:'publish',
        name:'goodspublish',
        meta:{
          name:'发布商品',
          auth:false,
          icon:'',
        },
        component:goodsPublist,
      }
    ]
  },
  {
    path:'/orders',
    name:'oders',
    meta:{
      name:'订单管理',
      auth:false,
      icon:'el-icon-date',
    },
    component:abstract,
    children:[
      {
        path:'list',
        name:'orderslist',
        meta:{
          name:'订单列表',
          auth:false,
          icon:'',
        },
        component:orderList,
      }
    ]
  },
]
