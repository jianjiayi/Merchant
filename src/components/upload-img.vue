<template>
  <div class="upload">
    <div
      v-for="item in uploadList"
      class="upload-list"
      :style='"width:"+options.width+";height:"+options.height'>
      <img :src="item.url" :title="item.name">
      <div class="upload-list-cover">
        <i class="el-icon-view" @click="handleView(item.url)"></i>
        <i class="el-icon-delete" @click="handleRemove(item)"></i>
      </div>
    </div>
    <el-upload
      v-show="uploadList.length==0"
      :name="name"
      :before-upload="beforeUpload"
      :on-success="handleSuccess"
      :action="action">
      <div
        class="upload-btn"
        :style='"width:"+options.width+";height:"+options.height'>
        <i class="el-icon-plus" style="font-size: 30px;"></i>
        <i calss="text">{{title}}</i>
      </div>
    </el-upload>
    <el-dialog
      title="查看大图"
      :visible.sync="visible"
      center>
      <img :src="imgName" v-if="visible" style="width: 100%">
    </el-dialog>
  </div>
</template>
<script>
  export default {
    props:['options','name','src','title'],
    data () {
      return {
        action:'http://192.168.8.189:8082/NewDwShop/verfile/verupload.do',//上传地址

        imgName: '',//查看图片
        visible: false,
        uploadList: []//存放上传图片
      }
    },
    created(){
      this.getImgArray(this.src);//获取传递 图片 string
    },
    methods: {
      getImgArray(string){//格式化成数组
        let array = (string||"").split(',');
        if(array[0]=='') return;
        array.map(n => {
          this.uploadList.push({
            name :this.name,
            url : n
          })
        })
      },
      //查看大图
      handleView (src) {
        this.imgName = src;
        this.visible = true;
      },
      //删除图片
      handleRemove(file) {
        this.uploadList.splice(this.uploadList.indexOf(file), 1);
        console.log(this.uploadList)
        this.$emit('on-remove',file)
      },
      beforeUpload(file){
        let testmsg=file.name.substring(file.name.lastIndexOf('.')+1);
        let  extension = false;
        this.options.format.map(n => {
          if(testmsg == n){
            extension = true;
          }
        });
        const isLt2M = file.size / 1024 / 1024 < 20
        if(!extension) {
          this.$message({
            message: '上传文件只能是 '+this.options.format+'格式!',
            type: 'warning'
          });
        }
        if(!isLt2M) {
          this.$message({
            message: '上传文件大小不能超过 20MB!',
            type: 'warning'
          });
        }
        return extension && isLt2M
      },
      //上传成功
      handleSuccess (res, file) {
        console.log('res:'+res,file);
        this.uploadList.push({
          name :this.name,
          url : res.replace('[','').replace(']','').split(',')[1]
        });
        this.$emit('on-success',this.uploadList)
      },
      //清理组件数据
      clearData () {
        this.uploadList = [];
        console.log('调用成功');
      }
    },
  }
</script>
<style scoped lang="scss">
  .upload{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    .upload-list{
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #cccccc;
      height: 100%;
      overflow: hidden;
      img{
        width: 100%;
        height: 100%;
      }
      .upload-list-cover{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 0 40px;
        align-items: center;
        background: rgba(0,0,0,.6);
        opacity: 0;
        transition: opacity 1s;
        i{
          color: #fff;
          font-size: 20px;
          cursor: pointer;
          display: none;
          transition: display 1s;
        }
      }
    }
    .upload-list:hover{
      .upload-list-cover{
        opacity: 1;
        i{
          display: block;
        }
      }
    }
    .el-upload{
      position: absolute;
      top:0;
      left:0;
      display: flex;
      width: 100%;
      height: 100%;
      padding:0;
    }
    .upload-btn{
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      /* background-color: #cccccc; */
      border-radius: 5px;
      overflow: hidden;
    }
    .upload-btn:hover {
    }
    .upload-btn i{
      margin: 5px;
    }
  }
</style>




