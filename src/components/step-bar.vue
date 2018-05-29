<template>
  <div class="steps-bar">
    <el-steps :active="stepOptions.active">
      <el-step v-for="(item,index) in stepOptions.options" :key="index" :title="item.title" :icon="item.icon"></el-step>
    </el-steps>
  </div>
</template>
<script>
  export default {
    props:['stepOptions'],
    data(){
      return{

      }
    }
  }
</script>
<style scoped lang="scss">
  .steps-bar{
    padding: 30px 0;
    .el-steps{
      width: 600px;
      margin: 0px auto;
    }
  }
</style>
