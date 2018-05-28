<template>
  <div class="">
    <edit-goods :formdata="formValidate"></edit-goods>
  </div>
</template>
<script>
  import editGoods from '@/components/edit-goods.vue'
  export default {
    data(){
      return{
        formValidate: {
          token:'',//
          adminId:'',//商户Id
          categoryId:'',//分组Id
          name:'',//商品名称
          subtitle:'',//副标题
          mainImage:'http://192.168.8.189:8082/NewDwShop/upload/admproductimg/c52e23da-af3f-4f40-b634-9338f6d10038.jpg',//主图
          subImages:'http://192.168.8.189:8082/NewDwShop/upload/admproductimg/764cefaf-e3ac-4c8e-9eb0-b47a993fd0df.jpg, http://192.168.8.189:8082/NewDwShop/upload/admproductimg/70ceaeed-055f-442b-a98c-5d39c6f456f8.jpg, http://192.168.8.189:8082/NewDwShop/upload/admproductimg/829735f0-989d-49a8-abf3-394bfc5986eb.jpg',//附图
          videocove:'http://img4.imgtn.bdimg.com/it/u=4075891162,1049402170&fm=15&gp=0.jpg',//视频封面图
          video:'',//视频文件
          price:'',//价格
          stock:'',//库存
          status:4,//商品状态
          postage:'',//运费
          spec	:'',//规格
          districtId:'',//省
          city:'',//市
          county:'',//县/区
          conditionalMail:0,//条件包邮
          enoughNum:'',//满多少件包邮
          enoughMoney:'',//满多少钱包邮
          nocityMail:'',//不包邮地区
          reserve:'0',//普通/预定
          reserveDays:'',//预定天数
          reserveNum:'',//预定数量
        },
      }
    },
    components:{
      editGoods
    }
  }
</script>
<style scoped lang="scss">

</style>
