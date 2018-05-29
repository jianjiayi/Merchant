<template>
  <el-header>
    <div class="container">
      <el-row type="flex" justify="start" align="middle">
        <el-col :span="6">
          <router-link to="/">
            <el-row type="flex" justify="start" align="middle">
              <div class="logo">
                <img src="@/assets/logo.png" alt="">
              </div>
              <i class="line">|</i>
              <span class="name">商户后台管理</span>
            </el-row>
          </router-link>
        </el-col>
        <el-col :span="6">
          <h2 :class="active == true ? 'title on' : 'title'">{{$route.meta.name}}</h2>
        </el-col>
        <el-col :span="6"></el-col>
      </el-row>
    </div>
  </el-header>
</template>
<script>
  export default {
    data(){
      return{
        active:false,
      }
    },
    methods:{

    }
  }
</script>
<style scoped lang="scss">
  a{
    text-decoration: none;
  }
  .el-header{
    position: fixed;
    top:0;
    left:0;
    width: 100%;
    z-index: 999;
    background: #c0c4cc;
    .logo{
      max-height: 64px;
      display: flex;
      align-items: center;
      img{
        width: 100%;
        max-width:100px;
        height: 100%;
        max-height: 50px;
      }
    }
    i.line{
      font-size: 20px;
      padding: 0 10px;
      color: #ffffff;
    }
    .name{
      font-size: 16px;
      color: #ffffff;
    }
    .title{
      text-align: center;
      color: #fff5e6;
      opacity: 0;
      transition: opacity 0.5s;
      -moz-transition: opacity 0.5s; /* Firefox 4 */
      -webkit-transition: opacity 0.5s; /* Safari 和 Chrome */
      -o-transition: opacity 0.5s; /* Opera */
    }
    .title.on{
      opacity: 1;
    }
  }
  @media screen and (max-width: 992px){
  }
</style>
