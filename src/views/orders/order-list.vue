<template>
  <section v-loading="listLoading">
    <el-row class="topLine">
      <el-col :span="24">
        <!--多条件搜索-->
        <search-form :searchForm="searchform" @searchBtn="searchList"></search-form>
      </el-col>
    </el-row>

    <!--标签页-->
    <tab-pane :tabs="tabsOptions" :activeLabel="tabActiveIndex" @changeTabs="changeTableData"></tab-pane>

    <!--列表-->
    <orders-list :listTableData="listData" @updateRow="updateStatus" @lookLogistics="Logistics"></orders-list>

    <!--分页-->
    <pagination :numbers="pageNums" :currentPage="currentPages" @currentChange="changePaging"></pagination>

    <!--物流-->
    <el-dialog
      title="物流信息"
      :visible.sync="logisticsDialogVisible"
      width="600px"
      center>
      <logistics-details :logisticsInfo="logisticsData"></logistics-details>
    </el-dialog>

  </section>
</template>
<script>

  import searchForm from '@/components/searchForm'

  import tabPane from '@/components/tabpane'

  import ordersList from '@/components/lists/orderslist'

  import pagination from '@/components/paging'

  import logisticsDetails from '@/components/details/logisticsDetails'

  export default {
    data() {
      return {
        listLoading:false,
        isloading: false,

        tabsOptions:[
          {
            value:1,
            label:'所有'
          },
          {
            value:10,
            label:'待付款'
          },
          {
            value:20,
            label:'待发货'
          },
          {
            value:40,
            label:'待收货'
          },
          {
            value:50,
            label:'已完成'
          },
          {
            value:70,
            label:'退款中'
          },
          {
            value:80,
            label:'退款完成'
          }
        ],
        tabActiveIndex:'所有',

        tabsStatus:1,
        listData: [{
          "orderNo": "1711291450992427",
          "userId": 75,
          "shippingId": 237,
          "payment": 88,
          "paymentType": 1,
          "postage": 0,
          "status": 50,
          "paymentTime": "2018-05-01 14:48:18",
          "sendTime": "2018-02-01 14:48:48",
          "endTime": "2018-05-05 14:49:08",
          "closeTime": "",
          "createTime": "2018-05-01 14:48:18",
          "updateTime": "2018-05-05 14:49:08",
          "expressname": null,
          "expressno": null,
          "adminId": 104,
          "nickname": "凤凰山",
          "admphone": "13308703309",
          "admnum": "1709232303819798",
          "username": "789",
          "userphone": "15639319193",
          "receivername": "欣悦",
          "phoneNum": "",
          "address": "天津市天津市和平区北京",
          "orderManageVo": [{
            "orderNo": "1711291450992427",
            "productName": "昭通红富士苹果",
            "adminId": 104,
            "productId": 100000122,
            "productImage": "http://59.110.136.67:8080/dwshop/upload/admproductimg/64eb419d-0221-4c15-8048-b6ff664ebc49.jpg",
            "currentUnitPrice": 88,
            "quantity": 1,
            "totalPrice": 88,
            "spec": "24个中果/盒",
            "createTime": 1525330240000,
            "updateTime": 1525928827000,
            "setStatus": 1
          }, {
            "orderNo": "1711291450992427",
            "productName": "昭通红富士苹果",
            "adminId": 104,
            "productId": 100000122,
            "productImage": "http://59.110.136.67:8080/dwshop/upload/admproductimg/64eb419d-0221-4c15-8048-b6ff664ebc49.jpg",
            "currentUnitPrice": 88,
            "quantity": 1,
            "totalPrice": 88,
            "spec": "24个中果/盒",
            "createTime": 1525330240000,
            "updateTime": 1525928827000,
            "setStatus": 1
          }]
        }, {
          "orderNo": "1711291450566288",
          "userId": 75,
          "shippingId": 237,
          "payment": 16,
          "paymentType": 1,
          "postage": 0,
          "status": 50,
          "paymentTime": "2018-05-01 14:48:18",
          "sendTime": "2018-02-01 14:48:48",
          "endTime": "2018-05-05 14:49:08",
          "closeTime": "",
          "createTime": "2018-05-01 14:48:18",
          "updateTime": "2018-05-05 14:49:08",
          "expressname": null,
          "expressno": null,
          "adminId": 104,
          "nickname": "凤凰山",
          "admphone": "13308703309",
          "admnum": "1709232303819798",
          "username": "789",
          "userphone": "15639319193",
          "receivername": "欣悦",
          "phoneNum": "",
          "address": "天津市天津市和平区北京",
          "orderManageVo": [{
            "orderNo": "1711291450566288",
            "productName": "昭通脆皮核桃",
            "adminId": 104,
            "productId": 100000124,
            "productImage": "http://59.110.136.67:8080/dwshop/upload/admproductimg/d193297f-69cf-43df-88d7-4182d0123a1d.jpg",
            "currentUnitPrice": 16,
            "quantity": 1,
            "totalPrice": 16,
            "spec": "500g/袋",
            "createTime": 1525243811000,
            "updateTime": 1525928827000,
            "setStatus": 1
          }]
        }, {
          "orderNo": "1710181447494547",
          "userId": 75,
          "shippingId": 237,
          "payment": 0.02,
          "paymentType": 1,
          "postage": 0,
          "status": 50,
          "paymentTime": "2018-05-01 14:48:18",
          "sendTime": "2018-02-01 14:48:48",
          "endTime": "2018-05-05 14:49:08",
          "closeTime": "",
          "createTime": "2018-05-01 14:48:18",
          "updateTime": "2018-05-05 14:49:08",
          "expressname": "pingyou",
          "expressno": "13131",
          "adminId": 99,
          "nickname": "北京市-老农",
          "admphone": "15239200618",
          "admnum": "1709152350982868",
          "username": "789",
          "userphone": "15639319193",
          "receivername": "欣悦",
          "phoneNum": "",
          "address": "天津市天津市和平区北京",
          "orderManageVo": [{
            "orderNo": "1710181447494547",
            "productName": "玫瑰香",
            "adminId": 99,
            "productId": 100000116,
            "productImage": "http://59.110.136.67:8080/dwshop/upload/admproductimg/795956a1-406c-4a5a-a7c4-921cb1abc1b8.jpg",
            "currentUnitPrice": 0.02,
            "quantity": 1,
            "totalPrice": 0.02,
            "spec": "1kg/盒",
            "createTime": 1525330070000,
            "updateTime": 1525928740000,
            "setStatus": 1
          }]
        }],
        pageNums:20,//总页数
        nowPages:1,//当前页
        currentPages : 1,

        logisticsDialogVisible:false,
        logisticsData:{
          orderInfo:{},
          body:{}
        },

        searchform:[
          {
            value:'',
            name:'orderNo',
            label:'订单编号',
          },
          {
            value:'',
            name:'productName',
            label:'商品名称',
          },
          {
            value:'',
            name:'userName',
            label:'买家昵称',
          },
        ],
        searchActive:false,
      }
    },

    components:{
      ordersList,
      searchForm,
      tabPane,
      pagination,
      logisticsDetails
    }
  }
</script>
<style scoped lang="scss">

</style>


