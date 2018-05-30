<template>
  <section>
    <div id="logistics" class="mui-content">
      <div class="top-info">
        <div class="pic">
          <img :src="logisticsInfo.orderInfo.img" alt="">
          <p>共 {{logisticsInfo.orderInfo.num}} 件商品</p>
        </div>
        <div v-if="logisticsInfo.body.flag" class="">
          <p>
            物流状态：{{logisticsInfo.body.status | typeStatus}}
          </p>
          <p>承运来源：{{logisticsInfo.body.expTextName}}</p>
          <p>运单编号：{{logisticsInfo.body.mailNo}}</p>
        </div>
        <p v-else>：( 该单号暂无物流进展，请稍后再试，或检查公司和单号是否有误。</p>
      </div>
      <div class="content">
        <div class="wl">
          <ul id="list" class="list">
            <li class="item" v-for="(item,index) in logisticsInfo.body.data" :key="index">
                <span></span>
                <a>
                    <p>{{item.time}} {{item.context}}</p>
                </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
  export default {
    props:['logisticsInfo'],
    data(){
      return{
      }
    },
    filters:{
      typeStatus(val){
        var statusTxt = '';
        switch(val)
        {
          case -1:
            statusTxt = '待查询';
            break;
          case 0:
            statusTxt = '查询异常';
            break;
          case 1:
            statusTxt = '暂无记录';
            break;
          case 2:
            statusTxt = '在途中';
            break;
          case 3:
            statusTxt = '派送中';
            break;
          case 4:
            statusTxt = '已签收';
            break;
          case 5:
            statusTxt = '用户拒签';
            break;
          case 6:
            statusTxt = '疑难件';
            break;
          case 7:
            statusTxt = '无效单';
            break;
          case 8:
            statusTxt = '超时单';
            break;
          case 9:
            statusTxt = '签收失败';
            break;
          default:
            statusTxt = '退回';
        }
        return statusTxt;
      }
    },
  }
</script>
<style scoped lang="scss">
  #logistics{
    margin-bottom: 0;
    .top-info{
      display: flex;
      display: -webkit-flex;
      align-items: center;
      -webkit-align-items: center;
      background: #fff;
      padding-bottom: 20px;
      border-bottom: 1px dashed #ccc;
      .pic{
        position: relative;
        width: 100px;
        height: 70px;
        background: #cccccc;
        margin-right: 30px;
        margin-left: 20px;
        box-shadow: 0 4px 5px #aaa;
        img{
          width: 100%;
          height: 100%;
        }
        p{
          position: absolute;
          bottom: 0;
          left:0;
          width: 100%;
          margin:0;
          text-align: center;
          font-size: 10px;
          line-height: 20px;
          color: #e4e7ed;
          background: rgba(0,0,0,0.5);
        }
      }
      p{
        font-size: 14px;
        color: #959595;
        margin: 3px;
        em{
          color: #1b1b1b;
        }
        .states{
          color: #81d8d0;
        }
      }
    }
    .content{
      background: #fff;
      .wl{
        padding: 0;
        .list{
          padding: 0px;
          li{
            position: relative;
            display: flex;
            display: -webkit-flex;
            span{
              width: 50px;
              display: flex;
              display: -webkit-flex;
              align-items:center;
              justify-content: center;
              -webkit-justify-content: center;
              position: relative;
            }
            span:before{
              position: absolute;
              content: '';
              width: 1px;
              height: 100%;
              left: 50%;
              margin-left: -0.5px;
              background: #ccc;
              z-index: 8;
            }
            span:after{
              content: '';
              width: 12px;
              height:12px;
              background: #fff;
              border: 1px solid #ccc;
              border-radius: 50%;
              z-index: 9;
            }
            a{
              position: relative;
              flex:1;
              padding: 0.4rem 0;
              p{
                font-size: 12px;
                color: #959595;
                margin: 0;
                margin-bottom: 5px;
              }
            }
            a:after{
              position: absolute;
              content: '';
              width: 100%;
              height: 1px;
              background: #ccc;
              left: 0;
              bottom: 1px;
            }
          }
          li:first-child{
            span:before{
              position: absolute;
              content: '';
              width: 1px;
              height: 50%;
              top: 50%;
              left: 50%;
              margin-left: -0.5px;
              background: #ccc;
              z-index: 8;
            }
            span:after{
              content: '';
              width: 14px;
              height: 14px;
              background: #81d8d0;
              border: none;
              border-radius: 50%;
              z-index: 9;
              box-shadow: 0 0 10px #81d8d0;
            }
            a{
              p{
                color: #81d8d0;
              }
            }
          }
          li:last-child{
            a:after{
              height: 0
            }
          }
        }
      }
    }
  }
</style>
