<template>
  <div class="cropper-content">
    <div class="cropper-box">
      <div class="cropper">
        <vueCropper
          ref="cropper"
          :img="option.img"
          :outputSize="option.size"
          :outputType="option.outputType"
          :info="true"
          :full="option.full"
          :canMove="option.canMove"
          :canMoveBox="option.canMoveBox"
          :original="option.original"
          :autoCrop="option.autoCrop"
          :autoCropWidth="option.autoCropWidth"
          :autoCropHeight="option.autoCropHeight"
          :fixedBox="option.fixedBox"
          @realTime="realTime"
          @imgLoad="imgLoad"
        ></vueCropper>
      </div>
      <div class="footer-btn">
        <div class="scope-btn">
          <label class="btn" for="uploads">更换图片</label>
          <input type="file" id="uploads" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg" @change="selectImg($event, 1)">

          <el-button size="mini" type="primary" plain icon="el-icon-plus" @click="changeScale(1)"></el-button>
          <el-button size="mini" type="primary" plain icon="el-icon-minus" @click="changeScale(-1)"></el-button>
          <el-button size="mini" type="primary" plain @click="rotateLeft">↺</el-button>
          <el-button size="mini" type="primary" plain @click="rotateRight">↻</el-button>
        </div>
        <div class="upload-btn">
          <el-button size="mini" type="error" @click="uploadImg('blob')">上传<i type="el-icon-upload"></i></el-button>
        </div>
      </div>
    </div>
    <div class="show-preview" :style="{'width': previews.w + 'px', 'height': previews.h + 'px',  'overflow': 'hidden', 'margin': '5px'}">
      <div :style="previews.div" class="preview">
        <img :src="previews.url" :style="previews.img">
      </div>
    </div>
  </div>
</template>
<script>
  import VueCropper from 'vue-cropper';
  export default {
    props:['Options','Name'],
    data() {
      return {
        name:this.Name,
        previews: {},
        option: this.Options,
        n:1
      };
    },
    watch:{
      Options(val,oldval){
        console.log(val,oldval)
      }
    },
    methods: {
      imgLoad (msg) {
        console.log(msg)
      },
      //调整裁切图片大小
      changeCropBox(w,h){
        this.$refs.cropper.changeCrop(w,h);
      },
      //图片缩放
      changeScale (num) {
        num = num || 1
        this.$refs.cropper.changeScale(num)
      },
      //向左旋转
      rotateLeft () {
        this.$refs.cropper.rotateLeft()
      },
      //向右旋转
      rotateRight () {
        this.$refs.cropper.rotateRight()
      },
      // 实时预览函数
      realTime (data) {
        this.previews = data
      },
      //选择图片
      selectImg (e, num) {
        //上传图片
        // this.option.img
        var file = e.target.files[0]
        if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
          alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
          return false
        }
        var reader = new FileReader()
        reader.onload = (e) => {
          let data
          if (typeof e.target.result === 'object') {
            // 把Array Buffer转化为blob 如果是base64不需要
            data = window.URL.createObjectURL(new Blob([e.target.result]))
          } else {
            data = e.target.result
          }
          this.option.img = data
        }
        // 转化为base64
         reader.readAsDataURL(file)
      },
      //上传图片
      uploadImg (type) {
        let _this = this;
        // 输出
        if (type === 'blob') {
          this.$refs.cropper.getCropBlob((data) => {
            console.log(data)
            var fd = new FormData();
            fd.append(_this.Name,data,"image.jpg");

            //调用axios上传
            this.$ajax.post('/profile/proupload.do',fd).then(res => {
              console.info('res:'+JSON.stringify(res));
              let data = res.data.replace('[','').replace(']','').split(',');
              let imgInfo = {
                name : _this.Name,
                url : data[1]
              };
              _this.$emit('uploadImgSuccess',imgInfo);
            }).catch(function (error) {
              console.log(error);
            });
          })
        } else {
          this.$refs.cropper.getCropData((data) => {
            //调用axios上传
            this.$ajax.post('/verfile/verupload.do',data).then(res => {
              console.info('res:'+JSON.stringify(res));
              let data = res.data.replace('[','').replace(']','').split(',');
              let imgInfo = {
                name : _this.name,
                url : data[1]
              }
              _this.$emit('uploadImgSuccess',imgInfo);
//              this.$refs.cropper.mounted()
            }).catch(function (error) {
              console.log(error);
            });
          })
        }
      },

    },
    components: {
      VueCropper
    },
  }

</script>
<style scoped lang="scss">
  .cropper-content{
    display: flex;
    display: -webkit-flex;
    justify-content: flex-end;
    .cropper-box{
      flex: 1;
      width: 100%;
      .cropper{
        width: auto;
        height: 300px;
      }
    }

    .show-preview{
      flex: 1;
      -webkit-flex: 1;
      display: flex;
      display: -webkit-flex;
      justify-content: center;
      .preview{
        overflow: hidden;
        border:1px solid #cccccc;
        background: #cccccc;
        margin-left: 40px;
      }
    }
  }
  .footer-btn{
    margin-top: 30px;
    display: flex;
    display: -webkit-flex;
    justify-content: flex-end;
    .scope-btn{
      width: 310px;
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;
      padding-right: 20px;
    }
    .upload-btn{
      flex: 1;
      -webkit-flex: 1;
      display: flex;
      display: -webkit-flex;
      justify-content: center;
    }
    .btn {
      outline: none;
      display: inline-block;
      line-height: 1;
      white-space: nowrap;
      cursor: pointer;
      -webkit-appearance: none;
      text-align: center;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      outline: 0;
      margin: 0;
      -webkit-transition: .1s;
      transition: .1s;
      font-weight: 500;
      padding: 8px 15px;
      font-size: 12px;
      border-radius: 3px;
      color: #fff;
      background-color: #67c23a;
      border-color: #67c23a;
    }
  }
</style>
