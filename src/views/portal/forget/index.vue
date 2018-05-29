<template>
  <div class="main">
    <div class="left-silder">
      <el-menu
        class="el-menu"
        :default-active="$route.name"
        unique-opened
        router
        collapse-transition>
        <el-menu-item
          v-for="(cRoute, cIndex) in menuList"
          :key="cIndex"
          :index="cRoute.name"
          :route="cRoute">
          <template slot="title">
            <i :class="cRoute.meta.icon"></i>
            <span slot="title">{{cRoute.meta.name}}</span>
          </template>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="conent">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  import myheader from '@/components/layout/header1.vue';
  import myfooter from '@/components/layout/footer.vue';

  import forgetPath from '@/router/portal/forget.js';

  export default {
    data(){
      return{
        menuList:forgetPath[0].children,//侧边栏路由数组
      }
    },
    computed: {
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
  .main{
    position: relative;
    width: 800px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    display: -webkit-flex;
    .left-silder{
      width: 200px;
      height: 100%;
      padding: 10px 10px;
      .ivu-menu{
        height: 100%;
      }
    }
  }
</style>
