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
    <goods-list :listTableData="listData" @updateRow="updateStatus"></goods-list>

    <!--分页-->
    <pagination :numbers="pageNums" :currentPage="currentPages" @currentChange="changePaging"></pagination>
  </section>
</template>
<script>

  import searchForm from '@/components/searchForm'

  import tabPane from '@/components/tabpane'

  import goodsList from '@/components/lists/goodslist'

  import pagination from '@/components/paging'
  export default {
    data() {
      return {
        listLoading:false,
        keywords:'',

        tabsOptions:[
          {
            value:8,
            label:'所有'
          },
          {
            value:1,
            label:'在售'
          },
          {
            value:2,
            label:'下架'
          },
          {
            value:3,
            label:'删除'
          },
          {
            value:4,
            label:'未审核'
          },
          {
            value:6,
            label:'不合格'
          },
          {
            value:0,
            label:'强制下架'
          },
        ],
        tabActiveIndex:'所有',


        tabsStatus:8,
        listData: [{
          "id": 100000194,
          "categoryId": 11000,
          "adminId": 123,
          "name": "bbb",
          "subtitle": "bbb",
          "mainImage": "bbb",
          "status": 4,
          "createTime": "2018-05-16 13:25:01",
          "updateTime": "2018-05-16 14:01:17",
          "subimages": "bbb",
          "reserve": 1,
          "catename": "主粮",
          "nickname": "桃李小镇"
        }, {
          "id": 100000158,
          "categoryId": 11000,
          "adminId": 123,
          "name": "123456",
          "subtitle": "000",
          "mainImage": "http://59.110.136.67:8082/APPMerchant/upload/admproductimg/91efe177-558b-48b2-9e01-712fd0de0360.jpg",
          "status": 3,
          "createTime": "2018-01-08 17:05:15",
          "updateTime": "2018-05-16 10:26:22",
          "subimages": "http://59.110.136.67:8082/APPMerchant/upload/admproductimg/fed90c2e-bedc-4f3a-9fa6-ec4f6c910848.jpg",
          "reserve": 0,
          "catename": "主粮",
          "nickname": "桃李小镇"
        }, {
          "id": 100000156,
          "categoryId": 25000,
          "adminId": 122,
          "name": "正宗四川腊肉",
          "subtitle": "纯农家猪腿子肉，五花肉",
          "mainImage": "http://59.110.136.67:8080/dwshop/upload/admproductimg/d7761609-f664-444a-ac63-6b17b2247e15.jpg",
          "status": 0,
          "createTime": "2018-03-15 14:01:21",
          "updateTime": "2018-04-09 11:12:59",
          "subimages": "http://59.110.136.67:8080/dwshop/upload/admproductimg/1fd34dfb-2297-4e1d-abf0-ec8c08b66740.jpg,http://59.110.136.67:8080/dwshop/upload/admproductimg/5256bd19-8e4e-4784-99f6-df68b893d676.jpg,http://59.110.136.67:8080/dwshop/upload/admproductimg/7ee2de4b-af17-42d0-a2ce-d08349d3f733.jpg,http://59.110.136.67:8080/dwshop/upload/admproductimg/95afda57-894a-4611-8051-2fda1dbd03b6.jpg,http://59.110.136.67:8080/dwshop/upload/admproductimg/0ddd7a9b-24f7-4771-8fa5-9cc33b3ca522.jpg",
          "reserve": null,
          "catename": "美食",
          "nickname": "宜宾特产"
        }, {
          "id": 100000157,
          "categoryId": 11000,
          "adminId": 86,
          "name": "0000",
          "subtitle": "0000",
          "mainImage": "http://59.110.136.67:8082/APPMerchant/upload/admproductimg/b7ca8c06-8913-481e-9921-75da0debe7b1.jpg",
          "status": 0,
          "createTime": "2017-12-29 13:11:57",
          "updateTime": "2018-04-09 11:12:46",
          "subimages": "http://59.110.136.67:8082/APPMerchant/upload/admproductimg/3ed32771-42e5-4b9f-b69b-44d9c518b5b9.jpg",
          "reserve": 0,
          "catename": "主粮",
          "nickname": "山西省-老农"
        }, {
          "id": 100000122,
          "categoryId": 14000,
          "adminId": 104,
          "name": "昭通红富士苹果",
          "subtitle": "自然生长，不套袋，不打蜡，当天摘当天发",
          "mainImage": "http://59.110.136.67:8080/dwshop/upload/admproductimg/64eb419d-0221-4c15-8048-b6ff664ebc49.jpg",
          "status": 1,
          "createTime": "2017-10-22 16:30:16",
          "updateTime": "2018-04-03 09:42:04",
          "subimages": "http://59.110.136.67:8080/dwshop/upload/admproductimg/46a6b6ad-70e0-426b-aa68-f490b1b35aff.jpg,http://59.110.136.67:8080/dwshop/upload/admproductimg/40223fc2-5f4d-4add-ba91-92a48cf4d104.jpg,http://59.110.136.67:8080/dwshop/upload/admproductimg/869d191a-a709-4054-b9e1-9992a8d2bbd8.jpg,http://59.110.136.67:8080/dwshop/upload/admproductimg/eac5dfb7-2510-4fd0-bf85-f5aecfc29151.jpg,http://59.110.136.67:8080/dwshop/upload/admproductimg/ddef4003-5b7d-474b-a7f3-35a67fed6097.jpg",
          "reserve": 0,
          "catename": "水果",
          "nickname": "凤凰山"
        }],
        pageNums:20,//总页数
        nowPages:1,//当前页
        currentPages : 1,

        searchform:[
          {
            value:'',
            name:'productid',
            label:'商品编号',
          },
          {
            value:'',
            name:'productname',
            label:'商品名称',
          }
        ],
        searchActive:false,
      }
    },
    components:{
      searchForm,
      goodsList,
      tabPane,
      pagination
    }
  }
</script>
<style scoped lang="scss">

</style>


