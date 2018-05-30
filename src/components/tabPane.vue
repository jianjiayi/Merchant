<template>
  <section>
    <el-tabs :value="activeItem" @tab-click="handleClick">
      <el-tab-pane v-for="(item,index) in tabs" :key="index" :name="item.label" :label="item.label"></el-tab-pane>
    </el-tabs>
  </section>
</template>
<script>
  export default {
    props:['activeLabel','tabs'],
    data(){
      return{
        active:this.activeLabel
      }
    },
    computed:{
      activeItem(){
          return this.activeLabel
      }
    },
    methods:{
      handleClick(tab){
        console.log(tab);
        this.$emit('changeTabs',tab.label);
      }
    }
  }
</script>
<style scoped lang="scss">
  .el-tabs__active-bar{
    background-color:red
  }
  .el-tabs__item:hover,
  .el-tabs__item.is-active {
    color: red;
  }
  .el-tabs__nav-wrap::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0px;
    background-color: #e4e7ed;
    z-index: 1;
  }
</style>
