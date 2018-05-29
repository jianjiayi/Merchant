import Forget from '@/views/portal/forget/index.vue';
import Message from '@/views/portal/forget/message.vue';
import Mailbox from '@/views/portal/forget/mailbox.vue';
import Other from '@/views/portal/forget/other.vue'

export default [
  {
    path:'forget',
    name:'forget',
    meta:{
      icon:'',
      name:'忘记密码'
    },
    component:Forget,
    children:[
      {
        path:'/',
        name:'forget',
        meta:{
          icon:'iconfont icon-liuyan',
          name:'短信验证'
        },
        component:Message,
      },
      {
        path:'mailbox',
        name:'mailbox',
        meta:{
          icon:'iconfont icon-youxiang',
          name:'邮箱验证'
        },
        component:Mailbox,
      },
      {
        path:'other',
        name:'other',
        meta:{
          icon:'iconfont icon-gengduo',
          name:'其他方式'
        },
        component:Other,
      },
    ]
  },
]
