<template>
  <el-header>
    <i :class="isCollapse ? 'iconfont icon-zhankai' : 'iconfont icon-shouqi'" @click="toggleCollapse()"></i>
    <div class="right-bar">
      <span class="top-icon">
        <!--<i class="iconfont icon-shouye1" @click="$router.push({path:'/'})"></i>-->
        <i class="iconfont icon-tixing" @click="$router.push({path:'/'})"></i>
      </span>
      <el-dropdown>
        <span class="el-dropdown-link">
          王小虎<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="$router.push({name:'user'})">
            <i class="iconfont icon-gerenzhongxin"></i>
            个人中心
          </el-dropdown-item>
          <el-dropdown-item @click.native="logout()">
            <i class="iconfont icon-tuichu-"></i>
            安全退出
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-header>
</template>
<script>
  import { mapMutations } from 'vuex';
  export default {
    data(){
      return{
        isCollapse:false,
      }
    },
    watch:{
      isCollapse(val,oldval){
        this.$emit('collapseFun',this.isCollapse);
      }
    },
    methods:{
      ...mapMutations(['clearUser']),
      toggleCollapse(){
        console.log(1111)
        this.isCollapse = !this.isCollapse;
      },
      logout(){
        this.clearUser();
        this.$router.push({path: '/login'});
      }
    }
  }
</script>
<style scoped lang="scss">
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    .iconfont{
      font-size: 30px;
      color: #FFFFFF;
    }
    .right-bar{
      display: flex;
      justify-content: flex-end;
      .top-icon{
        display: flex;
        margin-right: 30px;
        i{
          margin-right: 40px;
          font-size: 20px;
          color: #F8F8FF;
          cursor: default;
        }
        i:hover{
          color: cyan;
        }
      }
    }
  }
</style>
