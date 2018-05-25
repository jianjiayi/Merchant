<template>
  <el-container>
    <div class="left-silder">
      <my-slider></my-slider>
    </div>
    <div class="right-main">
      <my-header></my-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </div>
  </el-container>
</template>
<script>
  import myHeader from '@/components/layout/header.vue';
  import mySlider from '@/components/layout/slider.vue';
  export default {
    data() {
      return {}
    },
    components:{
      myHeader,mySlider
    }
  };
</script>
<style scoped lang="scss">
  .el-container{
    position: absolute;
    left:0;
    top:0;
    bottom: 0;
    right: 0;
    overflow: hidden;
    display: flex;
    .left-silder{
      width: auto;
    }
    .right-main{
      flex: 1;
      position: relative;
      .el-main{
        height: 100%;
        overflow-y: auto;
      }
    }
  }
</style>
