<template>
  <el-upload
    drag
    type="drag"
    :name="name"
    :before-upload="beforeUpload"
    :on-success="handleSuccess"
    :action="action">
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
  </el-upload>
</template>
<script>
  export default {
    props:['options','name'],
    data () {
      return {
        action:'http://192.168.8.189:8082/NewDwShop/profile/proupload.do',//上传地址
      }
    },
    methods: {
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
        let uploadList = {
          name :this.name,
          url : res.replace('[','').replace(']','').split(',')[1]
        }
        this.$emit('on-success',uploadList)
      },
    },
  }
</script>
<style scoped lang="scss">
  .el-upload{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: auto;
    .upload-list{
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #cccccc;
      img{
        width: 100%;
        height: 100%;
      }
      .upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
        i{
          color: #fff;
          font-size: 20px;
          cursor: pointer;
          margin: 0 10px;
        }
      }
    }
    .upload-list:hover{
      .upload-list-cover{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
      }
    }
    .upload-btn{
      position: absolute;
      top:0;
      left:0;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      /*background-color: #cccccc;*/
      border:1px solid #cccccc;
      border-radius: 5px;
      overflow: hidden;
      i{
        margin: 5px;
      }
    }
    .upload-btn:hover{
      border: 1px solid #69b7ed;
    }
  }
</style>




