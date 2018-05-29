import forgetPath from './forget.js';//忘记密码路由


import Agreement from '@/views/portal/agreement.vue'


const allowedRouterArray = [//添加路由模块
  forgetPath,
];
let originPath = [
  {
    path:'agreement',
    name:'agreement',
    meta:{
      name:'商户协议',
    },
    component:Agreement,
  }
];

allowedRouterArray.map(router => {
  originPath = originPath.concat(router)
});

export default originPath;

