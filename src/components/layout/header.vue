<template>
  <el-header>
    <el-radio-group v-model="isCollapse">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group>
    <div class="">
      <el-dropdown>
        <span class="el-dropdown-link">
          王小虎<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="$router.push({name:'user'})">个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="logout()">安全退出</el-dropdown-item>
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
  }
</style>
