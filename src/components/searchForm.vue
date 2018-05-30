<template>
    <el-form :inline="true" class="form-inline">
      <el-form-item v-for="(item,index) in searchForm" :key="index">
        <el-input size="mini" :name="item.name" v-model.trim="item.value" :placeholder="item.label"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="mini" type="success" plain icon="fa fa-search" @click="search(searchForm)">查询</el-button>
      </el-form-item>
    </el-form>
</template>
<script>
  export default {
    props:['searchForm'],
    data(){
      return{}
    },
    filters: {
      trim: function(value) {
        return value.trim();
      }
    },
    methods:{
      search(form){
        this.$emit('searchBtn',form)
      }
    }
  }
</script>
<style scoped lang="scss">
    .form-inline{
      display: inline;
    }
    .el-form-item{
      margin-bottom: 0;
    }
</style>
