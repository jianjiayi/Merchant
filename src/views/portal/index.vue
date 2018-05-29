<template>
  <div class="bg-body">
    <myheader></myheader>
    <div class="container content">
      <h1 class="title">{{$route.meta.name}}</h1>
      <div v-if="$route.path=='/portal'" class="btn-group">
        <el-button v-for="(item, index) in path" :key="index" type="ghost" @click="selectChange(item.name)">
          {{item.meta.name}}
        </el-button>
      </div>
      <div v-else id="main">
        <router-view></router-view>
      </div>
    </div>
    <myfooter></myfooter>
  </div>
</template>
<script>
  import myheader from '@/components/layout/header1.vue';
  import myfooter from '@/components/layout/footer.vue';

  import portalPath from '@/router/portal/index.js';

  export default {
    data(){
      return{
        path:portalPath
      }
    },
    created(){
      console.log(portalPath)
    },
    methods:{
      selectChange(name){
        this.$router.push({name: name});
      },
    },
    components:{
      myheader,
      myfooter
    }
  }
</script>
<style scoped lang="scss">
  .bg-body{
    background: #f2f2f240;
    padding-top: 100px;
    .content{
      min-height: 700px;
      padding-top: 10px;
      background: #ffffff;
      .title{
        text-align: center;
      }
      #main{
        padding: 30px 50px;
      }
    }
  }
</style>
