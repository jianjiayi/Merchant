<template>
  <section>
    <el-table
      :data="listTableData"
      stripe
      style="width: 100%;min-height: 400px">
      <el-table-column
        label="宝贝"
        prop="id"
        header-align="center"
        width="500px">
        <template slot-scope="scope">
          <!--订单top-->
          <div class="">
            <span>订单号 : {{scope.row.orderNo}}</span>
            <span> 创建时间 : {{scope.row.createTime}}</span>
          </div>
          <!--详情-->
          <div>
            <!---->
            <el-row type="flex" class="row-bg">
              <el-col :span="6">
                <span><i class="fa fa-user-circle-o" aria-hidden="true"></i></span>
                <router-link  :to="{path:'/review',query: {id:scope.row.adminId}}" target="_blank">
                  {{scope.row.nickname}}
                </router-link>
              </el-col>
              <el-col :span="8">
                <el-button type="text" size="small" class="tel">
                  <i class="el-icon-phone"></i>:{{scope.row.admphone}}
                </el-button>
              </el-col>
              <el-col :span="4">
                <el-button type="text" size="small"  class="btn-text" @click.native="chat(scope.row.adminId)">
                  <i class="fa fa-commenting-o" aria-hidden="true"></i>
                </el-button>
              </el-col>
              <el-col :span="4">
                <span class="mini-size">
                   单价
                </span>
              </el-col>
              <el-col :span="2">
                <span class="mini-size">
                   数量
                </span>
              </el-col>
            </el-row>
            <!---->
            <el-row type="flex" class="row-bg  product" v-for="(item,index) in scope.row.orderManageVo" :key="index">
              <el-col :span="6">
                <span class="main-img">
                  <img v-show="item.productImage" :src="item.productImage" alt="暂无">
                </span>
              </el-col>
              <el-col :span="12">
                <div>
                  <router-link  :to="{path:'/review',query: {id:item.productId}}" target="_blank">
                    {{item.productName}}
                  </router-link>
                </div>
              </el-col>
              <el-col :span="4">
                <span class="mini-size">
                  ￥{{item.currentUnitPrice}}
                </span>
              </el-col>
              <el-col :span="2">
                <span class="mini-size">
                  × {{item.quantity}}
                </span>
              </el-col>
            </el-row>
          </div>
        </template>
      </el-table-column>

      <el-table-column
        label="实收款"
        align="center">
        <template slot-scope="scope">
          ￥{{scope.row.payment}}
          <div v-if="scope.row.postage!=0" class="mini-size">(含运费￥{{scope.row.postage}})</div>
          <div v-else class="mini-size">包邮</div>
        </template>
      </el-table-column>
      <el-table-column
        label="结算方式"
        align="center">
        <template slot-scope="scope">
          <el-tag
            v-show="scope.row.status!=10"
            :type="scope.row.paymentType == 1 ? '' : 'warning'"
            close-transition
            size="mini">
            {{scope.row.paymentType | paymentTypeStatus}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="买家"
        align="center">
        <template slot-scope="scope">
          <el-popover
            ref="popover"
            placement="right"
            width="300"
            trigger="hover">
            <div class="">
              收&nbsp;件&nbsp; 人：{{scope.row.receivername}}
            </div>
            <div class="">
              联系电话：{{scope.row.userphone}}
            </div>
            <div class="">
              收货地址：{{scope.row.address}}
            </div>
          </el-popover>
          <el-button type="text" size="small" class="abtn" v-popover:popover >{{scope.row.username}}</el-button>
          <div class="">
            <el-button type="text" size="small"  class="btn-text"  @click.native="chat(scope.row.userId)">
              <i class="fa fa-commenting-o" aria-hidden="true"></i> 留言
            </el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="更新时间"
        prop="updateTime"
        align="center">
      </el-table-column>
      <el-table-column
        prop="status"
        label="交易状态"
        header-align="center"
        align="center">
        <template slot-scope="scope">
          <el-tag
            :type="operatingStatusType(scope.row.status)"
            close-transition
            size="mini">
            {{scope.row.status | operatingStatus}}
          </el-tag>
          <div v-show="scope.row.status===40||scope.row.status===50">
            <el-button type="text" size="small"  class="btn-text" @click.native="handelLogistics(scope.row)">
              查看物流
            </el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="80"
        align="center">
        <template slot-scope="scope">
          <el-dropdown>
            <el-button size="mini" icon="el-icon-edit"></el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <router-link :to="{path:'/orderDetails',query: {id:scope.row.orderNo}}" target="_blank">
                  查看
                </router-link>
              </el-dropdown-item>
              <el-dropdown-item :disabled="scope.row.status != 20 ? true : false" @click.native="closeOrder(scope.$index,scope.row.orderNo)">强制结束</el-dropdown-item>
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
      return{

      }
    },
    filters: {
      paymentTypeStatus(type){
        let status = {};
        type === 0 ? status = '货到付款' : status = '在线支付';
        return status;
      },
      typeStatus(type){
        let status = {};
        type === 0 ? status = '货到付款' : status = '在线支付';
        return status;
      },
      operatingStatus: function (value) {
        let state = '';
        switch(value){
          case 10 :
            return state = '待付款';
            break;
          case 20 :
            return state = '待发货';
            break;
          case 40 :
            return state = '待收货';
            break;
          case 50 :
            return state = '已完成';
            break;
          case 60 :
            return state = '交易关闭';
            break;
          case 70 :
            return state = '退款中';
            break;
          case 80 :
            return state = '退款完成';
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
          case 10 :
            return state = '';
            break;
          case 20 :
            return state = 'warning';
            break;
          case 40 :
            return state = 'info';
            break;
          case 50 :
            return state = 'success';
            break;
          case 60 :
            return state = 'danger';
            break;
          case 70 :
            return state = 'info';
            break;
          case 80 :
            return state = 'success';
            break;
        }
        return state;
      },
      handelLogistics(data){
        this.$emit('lookLogistics',data)
      },
      chat(id){
        this.$notify.info({
          title: '消息',
          message: '聊天功能暂未开发完成，敬请期待',
          duration:2000
        });
      },
      closeOrder(pi,pid,pn){
        let form = {
          index:pi,
          id:pid,
          status:pn
        };
        console.log(form)
        this.$emit('updateRow',form);
      }
    },
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
  .abtn{
    color: #2a393c;
    text-decoration: underline;
  }
  .abtn:hover{
    color: #3a8ee6;
  }
  .mini-size{
    font-size: 10px;
  }
  .tel{
    color: #dd6161;
  }
  .btn-text{
    color: #dd6161;
  }
  .btn-text:hover{
    color: #3a8ee6;
  }
  .product{
    border-bottom: 1px dashed #b4bccc;
  }
  .product:last-child{
    border:none;
  }
  .main-img{
    max-width: 80px;
    max-height: 50px;
    background: #cccccc;
    display: block;
    overflow: hidden;
    margin: 3px 0;
    box-shadow: 0 0 3px #000;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .el-form-item__label{
    font-size: 10px;
  }
  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin-bottom: 0px;
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
