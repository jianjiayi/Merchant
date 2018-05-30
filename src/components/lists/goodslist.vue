<template>
  <section>
    <el-table
      :data="listTableData"
      style="width: 100%;min-height: 400px">
      <el-table-column
        label="商品ID"
        prop="id"
        align="center"
        width="100">
      </el-table-column>

      <el-table-column
        label="商品主图"
        align="center">
        <template slot-scope="scope">
          <span class="main-img">
            <img v-show="scope.row.mainImage" :src="scope.row.mainImage" alt="暂无">
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="主标题"
        prop="name"
        align="center">
      </el-table-column>
      <el-table-column
        label="附图"
        align="center"
        min-width="200">
        <template slot-scope="scope">
          <div class="banner">
            <el-carousel
              trigger="click"
              height="60px"
              :autoplay="false"
              type="card"
              indicator-position="none">
              <el-carousel-item v-for="(item,index) in getImgArrray(scope.row.subimages)" :key="index">
                <img :src="item" alt="暂无">
              </el-carousel-item>
            </el-carousel>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="分类"
        prop="catename"
        align="center">
      </el-table-column>
      <el-table-column
        label="类型"
        align="center"
        width="80">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.reserve == 2 ? '' : 'warning'"
            close-transition
            size="mini">
            {{scope.row.reserve | typeStatus}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="所属商家"
        align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" class="abtn">{{scope.row.nickname}}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="商家ID"
        prop="adminId"
        align="center">
      </el-table-column>
      <el-table-column
        label="更新时间"
        prop="updateTime"
        align="center">
      </el-table-column>

      <el-table-column
        prop="status"
        label="状态"
        header-align="center"
        align="center">
        <template slot-scope="scope">
          <el-tag
            :type="operatingStatusType(scope.row.status)"
            close-transition
            size="mini">
            {{scope.row.status | operatingStatus}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="80"
        align="center">
        <template slot-scope="scope">
          <router-link v-if="scope.row.status==4" :to="{path:'/reviewGoods',query: {id:scope.row.id}}" target="_blank">
            查看
          </router-link>
          <el-dropdown v-else>
            <el-button size="mini" icon="el-icon-edit"></el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :disabled="scope.row.status == 1 || scope.row.status == 6 ? true : false" @click.native="updateStatus(scope.$index,scope.row.id,1)">上架</el-dropdown-item>
              <el-dropdown-item :disabled="scope.row.status == 2 || scope.row.status == 3 || scope.row.status == 6? true : false" @click.native="updateStatus(scope.$index,scope.row.id,2)">下架</el-dropdown-item>
              <el-dropdown-item :disabled="scope.row.status == 3 || scope.row.status == 6 ? true : false" @click.native="updateStatus(scope.$index,scope.row.id,3)">删除</el-dropdown-item>
              <el-dropdown-item>
                <router-link  :to="{path:'/reviewGoods',query: {id:scope.row.id}}" target="_blank">
                  <i class="fa fa-eye" aria-hidden="true"></i> 查看
                </router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <router-link  :to="{path:'/',query: {id:scope.row.id}}" target="_blank">
                  <i class="fa fa-star-half-o" aria-hidden="true"></i> 评价
                </router-link>
              </el-dropdown-item>
              <el-dropdown-item :disabled="scope.row.status == 0 || scope.row.status == 6 ? true : false" @click.native="updateStatus(scope.$index,scope.row.id,0)">强制下架</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>
<script>
 export default {
   props:['listTableData'],
   data(){
     return{}
   },
   filters: {
     typeStatus(type){
       let typeStatus = {};
       type === 0 ? status = '普通' : status = '预售';
       return status;
     },
     operatingStatus: function (value) {
       let state = '';
       switch(value){
         case 1 :
           return state = '在售';
           break;
         case 2 :
           return state = '下架';
           break;
         case 3 :
           return state = '删除';
           break;
         case 4 :
           return state = '未审核';
           break;
         case 6 :
           return state = '不合格';
           break;
         case 0 :
           return state = '强制下架';
           break;
       }
       return state;
     }
   },
   computed:{

   },
   methods:{
     operatingStatusType(value){
       let state = '';
       switch(value){
         case 1 :
           return state = 'success';
           break;
         case 2 :
           return state = 'info';
           break;
         case 3 :
           return state = 'warning';
           break;
         case 4 :
           return state = '';
           break;
         case 6 :
           return state = 'danger';
           break;
         case 0 :
           return state = 'danger';
           break;
       }
       return state;
     },
     getImgArrray(string){
       return string.split(',')
     },
     updateStatus(pi,pid,pn){
       let form = {
         index:pi,
         id:pid,
         status:pn
       };
       console.log(form)
       this.$emit('updateRow',form);
     }
   }
 }
</script>
<style scoped lang="scss">
  a{
    font-size: 12px;
    line-height: 30px;
    color: #3a8ee6;
    text-decoration: underline;
  }
  a:hover{
    color: #2cca9a;
  }
  .main-img{
    width: 90px;
    height: 50px;
    background: #cccccc;
    display: block;
    overflow: hidden;
    margin: 3px auto;
    box-shadow: 0 0 3px #000;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .avatar-img{
    width: 50px;
    height: 50px;
    background: #cccccc;
    display: block;
    overflow: hidden;
    border-radius: 50%;
    margin: 3px auto;
    box-shadow: 0 0 3px #000;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 100px;
    margin: 0;
  }
  .banner{
    width: 200px;
    margin:0 auto;
    .el-carousel__item{
      img{
        width: 100%;
        height: 100%;
      }
    }

    button{
      width: 10px;
      height: 10px;
      background: red;
    }
  }
  .el-carousel__indicators {
    position: absolute;
    list-style: none;
    bottom: 0;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    margin: 0;
    padding: 0;
    z-index: 2;
    background: red;
    .el-carousel__indicator {
      display: inline-block;
      background-color: transparent;
      padding: 12px 4px;
      cursor: pointer;
      .el-carousel__button {
        display: block;
        opacity: .48;
        width: 5px;
        height: 5px;
        background-color: #fff;
        border: none;
        outline: 0;
        padding: 0;
        margin: 0;
        cursor: pointer;
        -webkit-transition: .3s;
        transition: .3s;
      }
    }
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
