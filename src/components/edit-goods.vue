<template>
  <div class="plublish-goods">
    <el-form :model="formValidate" :rules="ruleValidate" ref="formValidate" label-width="100px" class="demo-ruleForm">
      <el-form-item label="商品主图" prop="mainImage">
        <div class="list-img-box">
          <div
            v-if="formValidate.mainImage!=''"
            class="upload-list"
            style='width:150px;height:120px'>
            <img :src="formValidate.mainImage" title="商品主图">
            <div class="upload-list-cover">
              <i class="el-icon-view" @click="handleView(formValidate.mainImage)"></i>
              <i class="el-icon-delete" @click="formValidate.mainImage=''"></i>
            </div>
          </div>
          <div v-else class="upload-btn" style="width: 150px;height: 120px;" @click="uploadPicture('proimg',1)">
            <i class="el-icon-plus" style="font-size: 30px;"></i>
            <i calss="text">商品主图</i>
          </div>
        </div>
        <input type="hidden" v-model="formValidate.mainImage" placeholder="请添加商品主图">
      </el-form-item>
      <el-form-item label="商品附图" prop="subImages">
        <div class="list-img-box">
          <div
            v-for="item in subImagesArray"
            class="upload-list"
            style='width:150px;height:120px'>
            <img :src="item.url" :title="item.name">
            <div class="upload-list-cover">
              <i class="el-icon-view" @click="handleView(item.url)"></i>
              <i class="el-icon-delete" @click="handleRemove(item)"></i>
            </div>
          </div>
          <div v-show="subImagesArray.length<=4" class="upload-btn" style="width: 150px;height: 120px;" @click="uploadPicture('subimg',1)">
            <i class="el-icon-plus" style="font-size: 30px;"></i>
            <i calss="text">商品附图</i>
          </div>
        </div>
        <input type="hidden" v-model="formValidate.subImages" placeholder="请添加商品附图">
      </el-form-item>

      <el-form-item label="上传视频">
        <el-switch v-model="switchVideo"></el-switch>
      </el-form-item>
      <div v-if="switchVideo">
        <el-form-item label="视频封面" prop="videocove">
          <div class="list-img-box">
            <div
              v-if="formValidate.videocove!=''"
              class="upload-list"
              style='width:150px;height:120px'>
              <img :src="formValidate.videocove" title="视频封面图">
              <div class="upload-list-cover">
                <i class="el-icon-view" @click="handleView(formValidate.videocove)"></i>
                <i class="el-icon-delete" @click="formValidate.videocove=''"></i>
              </div>
            </div>
            <div v-else class="upload-btn" style="width: 150px;height: 120px;" @click="uploadPicture('videocove',1)">
              <i class="el-icon-plus" style="font-size: 30px;"></i>
              <i calss="text">视频封面图</i>
            </div>
          </div>
          <input type="hidden" v-model="formValidate.videocove" placeholder="请添加视频封面">
        </el-form-item>
        <el-form-item label="视频文件" prop="video">
          <div class="video-box">
            <video-player
              v-if="formValidate.video!=''"
              ref="VideoPlayer"
              :playOptions="playoptions"
            >
            </video-player>
            <upload-file
              v-else
              :options="uploadImgOptions"
              name="video"
              @on-success="uploadFileSuccess"
            >
            </upload-file>
            <el-button class="del-btn" v-show="formValidate.video!=''" type="primary" icon="trash-a" @click.native="formValidate.video = ''">删除</el-button>
          </div>
          <input type="hidden" v-model="formValidate.video" placeholder="请添加视频文件">
        </el-form-item>
      </div>


      <el-form-item label="商品名称" prop="name">
        <div class="item-container">
          <el-input v-model="formValidate.name" placeholder="请输入商品名称"></el-input>
        </div>
      </el-form-item>
      <el-form-item label="商品描述" prop="subtitle">
        <div class="item-container">
          <el-input type="textarea" v-model="formValidate.subtitle" placeholder="请输入商品描述"></el-input>
        </div>
      </el-form-item>
      <el-form-item label="商品类目" prop="categoryId">
        <div class="item-container">
          <el-select v-model="formValidate.categoryId" placeholder="请选择商品类目">
            <el-option
              v-for="item in categoryModel"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </el-form-item>
      <el-form-item label="产地" prop="districtId">
        <div class="item-container">
          <city @on-citySuccess="citySuccess" :modelCity="cityModel" v-model="formValidate.districtId"></city>
        </div>
      </el-form-item>
      <el-form-item label="商品价格" prop="price">
        <div class="item-container">
          <el-input style="width: 195px" v-model="formValidate.price" placeholder="请输入商品价格"></el-input>元
        </div>
      </el-form-item>
      <el-form-item label="规格" prop="spec">
        <div class="item-container">
          <div class="item-content">
            <el-input style="width: 210px" v-model="formValidate.spec" placeholder="请输入数量"></el-input>
            <el-select v-model="specVal" placeholder="KG">
              <el-option
                v-for="item in specModel"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="unitVal" placeholder="袋">
              <el-option
                v-for="item in unitModel"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>

      </el-form-item>
      <el-form-item label="库存数量" prop="stock">
        <div class="item-container">
          <el-input v-model="formValidate.stock" placeholder="请输入库存数量"></el-input>
        </div>
      </el-form-item>

      <el-form-item label="邮费" :prop="!single ? 'postage' : ''">
        <div class="item-container">
          <div class="item-content">
            <el-input style="width: 200px" :disabled="single" v-model="formValidate.postage" placeholder="请输入邮费"></el-input>元
            <div class="check-box">
              <el-checkbox v-model="single">包邮</el-checkbox>
            </div>
          </div>
        </div>
      </el-form-item>
      <div v-if="single">
        <el-form-item label="包邮条件">
          <el-switch v-model="switchPostage"></el-switch>
        </el-form-item>
        <div v-if="switchPostage">
          <el-form-item label="包邮条件" prop="conditionalMail">
            <el-radio-group v-model="formValidate.conditionalMail">
              <el-radio  label="1">根据件数</el-radio>
              <el-radio  label="2">根据钱数</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="formValidate.conditionalMail==='1'" label="满" prop="enoughNum">
            <div class="item-container">
              <div class="item-content">
                <el-input v-model="formValidate.enoughNum" placeholder="请输入数量"></el-input>
                <span style="width: 100px">&nbsp;&nbsp;&nbsp;件包邮</span>
              </div>
            </div>
          </el-form-item>
          <el-form-item v-if="formValidate.conditionalMail==='2'" label="满" prop="enoughMoney">
            <div class="item-container">
              <div class="item-content">
                <el-input v-model="formValidate.enoughMoney" placeholder="请输入钱数"></el-input>
                <span style="width: 100px">&nbsp;&nbsp;&nbsp;元包邮</span>
              </div>
            </div>
          </el-form-item>
        </div>
      </div>

      <el-form-item label="商品类型" prop="reserve">
        <el-radio-group v-model="formValidate.reserve">
          <el-radio  label="0">普通商品</el-radio>
          <el-radio  label="1">预售商品</el-radio>
        </el-radio-group>
      </el-form-item>
      <!--预售商品条件-->
      <div v-if="formValidate.reserve==='1'">
        <el-form-item label="预售数量" prop="reserveNum">
          <div class="item-container">
            <el-input style="width: 200px" v-model="formValidate.reserveNum" placeholder="预售商品数量"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="预售时间" prop="reserveDays">
          <el-date-picker
            v-model="formValidate.reserveDays"
            type="datetime"
            placeholder="选择日期"
            :default-value="timeDefaultShow"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
      </div>


      <!--富文本-->
      <el-form-item label="商品详情">
        <div class="editor-container" style="line-height: 20px">
          <!-- <UE :defaultMsg=defaultMsg :config=config ref="ue"></UE> -->
        </div>
      </el-form-item>

      <el-form-item>
        <el-button style="width: 200px;margin: 40px 30px 40px 100px;" type="primary" @click="submitForm('formValidate')">发布商品</el-button>
      </el-form-item>
    </el-form>



    <el-dialog
      title="裁切图片"
      :visible.sync="cropperModel"
      width="800px"
      center
      @open="show()">
      <vue-cropper :Options="cropperOption" :Name="cropperName" @uploadImgSuccess="handleUploadSuccess" ref="child"></vue-cropper>
    </el-dialog>
    <el-dialog
      title="查看大图"
      :visible.sync="visible"
      center>
      <img :src="imgName" v-if="visible" style="width: 100%">
    </el-dialog>
  </div>
</template>
<script>
  import { category,spec,unit } from '@/assets/js/publish-goods-base.js';
  import city from '@/components/city.vue';

  import vueCropper from '@/components/vue-cropper.vue';
  import videoPlayer from '@/components/video-player.vue';
  import uploadFile from '@/components/upload-file.vue';
  // import UE from '@/components/Ueditor.vue';

  export default {
    props:['formdata'],
    data() {
      return {
        switchVideo: false,//是否上传视频
        categoryModel: category,//商品分类
        specVal: spec[0].label,
        specModel: spec,//规格
        unitVal: unit[0].label,
        unitModel: unit,//单位
        single: false,//是否包邮
        switchPostage: false,//是否开启包邮条件
        pickerOptions: {
          disabledDate(time) {
            let timeSpace = time.getTime() < Date.now();
            return timeSpace;
          }
        },
        cityModel:[],//省市区三级联动
        model12: [],


        subImagesArray:[],//商品附图数组

        //富文本编辑器
        defaultMsg: '请输入内容',
        config: {
//          //可以在此处定义工具栏的内容
          toolbars: [
            [
              'undo', //撤销
              'bold', //加粗
              'indent', //首行缩进
              'italic', //斜体
              'underline', //下划线
              'pasteplain', //纯文本粘贴模式
              'selectall', //全选
              'cleardoc', //清空文档
              'insertparagraphbeforetable', //"表格前插入行"
              'fontfamily', //字体
              'fontsize', //字号
              'paragraph', //段落格式
              'simpleupload', //单图上传
              'insertimage', //多图上传
              'link', //超链接
              'emotion', //表情
              'spechars', //特殊字符
              'map', //Baidu地图
              'justifyleft', //居左对齐
              'justifyright', //居右对齐
              'justifycenter', //居中对齐
              'justifyjustify', //两端对齐
              'forecolor', //字体颜色
              'attachment', //附件
              'imagecenter', //居中
              'lineheight', //行间距
              'edittip ', //编辑提示
              'autotypeset', //自动排版
              'touppercase', //字母大写
              'tolowercase', //字母小写
              'background', //背景
              'inserttable', //插入表格
            ]
          ],
          autoHeightEnabled: false,
          autoFloatEnabled: true,　　//是否工具栏可浮动
//          initialContent:'请输入内容',   //初始化编辑器的内容,也可以通过textarea/script给值，看官网例子
          autoClearinitialContent:true, //是否自动清除编辑器初始内容，注意：如果focus属性设置为true,这个也为真，那么编辑器一上来就会触发导致初始化的内容看不到了
          initialFrameWidth: null,
          initialFrameHeight: 450,
          BaseUrl: '',
          UEDITOR_HOME_URL: 'static/ueditor/'
        },

        //裁切图片参数
        cropperModel:false,
        cropperName:'',//裁切图片上传名字
        cropperOption: {
          img: '',
          size: 1,
          full: true,//新增输出原图比例截图 props名full
          outputType: 'png',
          canMove: true,
          original: false,
          canMoveBox: false,
          autoCrop: true,
          autoCropWidth: 200,
          autoCropHeight: 200,
          fixedBox: true
        },
        //查看图片
        imgName: '',
        visible: false,

        //上传视频
        uploadImgOptions:{
          format:['mp4','webm','ogg'],//上传文件类型
          size:20480,//上传文件大小
        },
        //播放视频
        playoptions:{
          src: this.formdata.video,
          poster: this.formdata.videocove//你的封面地址
        },
//        playoptions:{
//          src: this.formdata.video,
//          poster: this.formdata.videocove//你的封面地址
//        },

        formValidate: {
          token: '',//
          adminId: '',//商户Id
          categoryId: '',//分组Id
          name: '',//商品名称
          subtitle: '',//副标题
          mainImage: '',//主图
          subImages: '',//附图
          videocove: '',//视频封面图
          video: '',//视频文件
          price: '',//价格
          stock: '',//库存
          status: 4,//商品状态
          postage: '',//运费
          spec: '',//规格
          districtId: '',//省
          city: '',//市
          county: '',//县/区
          conditionalMail: 0,//条件包邮
          enoughNum: '',//满多少件包邮
          enoughMoney: '',//满多少钱包邮
          nocityMail: '',//不包邮地区
          reserve: '0',//普通/预定
          reserveDays: '',//预定天数
          reserveNum: '',//预定数量
        },
        ruleValidate: {
          mainImage: [
            {required: true, message: '请上传商品主图', trigger: 'blur'}
          ],
          subImages: [
            {required: true, message: '请上传商品附图', trigger: 'blur'}
          ],
          videocove: [
            {required: true, message: '请上传视频封面图', trigger: 'blur'}
          ],
          video: [
            {required: true, message: '请上传视频文件', trigger: 'blur'}
          ],
          name: [
            {required: true, message: '请输入商品名称', trigger: 'blur'}
          ],
          subtitle: [
            {required: true, message: '请输入副标题', trigger: 'blur'}
          ],
          categoryId: [
            {required: true, message: '请选择商品类目', trigger: 'change'}
          ],
          price: [
            {required: true, message: '请输入价格', trigger: 'blur'}
          ],
          stock: [
            {required: true, message: '请输入库存', trigger: 'blur'}
          ],
          postage: [
            {required: true, message: '请输入运费', trigger: 'blur'}
          ],
          spec: [
            {required: true, message: '请输入规格', trigger: 'blur'}
          ],
          districtId: [
            {required: true, message: '请选择省市区县', trigger: 'change'}
          ],
          conditionalMail: [
            {required: true, message: '请选择包邮条件', trigger: 'blur'}
          ],
          enoughNum: [
            {required: true, message: '请输入满多少件包邮', trigger: 'blur'}
          ],
          enoughMoney: [
            {required: true, message: '请输入满多少钱包邮', trigger: 'blur'}
          ],
          nocityMail: [
            {required: true, message: '请选择不包邮地区', trigger: 'blur'}
          ],
          reserveNum: [
            {required: true, message: '请输入预定数量', trigger: 'blur'}
          ],
          reserveDays: [
            {required: true, message: '请选择预定天数', trigger: 'blur'}
          ],
        }
      };
    },
    created(){
      this.formValidate=this.formdata;
      //加载格式化附图成数组
      let str = this.formValidate.subImages;
      if(str!=''){
        str.split(',').map(n => {
          this.subImagesArray.push({
            name:'subimg',
            url:n
          })
        })
      };
      //检查是否上传视频
      this.formValidate.videocove != '' ? this.switchVideo = true : this.switchVideo = false;
      //检查是否条件包邮条件
      this.formValidate.conditionalMail == 0 ? this.switchPostage = false : this.switchPostage = true;
      console.log('switchPostage:'+this.switchPostage)
    },
    watch:{
      //包邮复选框
      single(val,oldval){
        console.log('switchPostage:'+this.switchPostage)
        val == true ? this.formValidate.postage = 1 : this.formValidate.postage = ''
      },
      //包邮条件滑块
      switchPostage(val,oldval){
        val == false ? this.formValidate.conditionalMail = 0 : this.formValidate.conditionalMail = '1'
      },
      //附图数组
      subImagesArray(val,oldval){
        this.formValidate.subImages = '';
        this.subImagesArray.map(n => {
          this.formValidate.subImages += n.url+',';
        });
        console.log(this.formValidate.subImages)
      }
    },
    computed:{
      timeDefaultShow:function(val){
        var date = new Date(),
          Y = date.getFullYear(),
          m = date.getMonth() + 1,
          d = date.getDate();
        if (m < 10) {
          m = '0' + m;
        }
        if (d < 10) {
          d = '0' + d;
        }
        var t = Y+'-'+m+'-'+d+' '+'23:59:59'
        return t;
      }
    },
    methods: {
      show(){
        this.$nextTick(function () {
          console.log('00:'+this.$refs)
          switch(this.cropperName){
            case 'proimg':
              this.$refs.child.changeCropBox(200,200);//裁切大小
              break;
            case 'subimg':
              this.$refs.child.changeCropBox(200,160);//裁切大小
              break;
            case 'videocove':
              this.$refs.child.changeCropBox(200,160);//裁切大小
              break;
          }
        })
      },
      citySuccess(val){
        this.cityModel = val;
        this.formValidate.districtId = val[0];
        this.formValidate.city = val[1];
        this.formValidate.county = val[2];
      },
      uploadPicture(name,num){
        this.cropperName = name;

        this.cropperModel = true;
      },
      //图片上传成功
      handleUploadSuccess(data){
        console.log(data)
        switch(data.name){
          case 'proimg':
            this.formValidate.mainImage = data.url;
            break;
          case 'subimg':
            this.subImagesArray.push({
              name:data.name,
              url:data.url
            })
            break;
          case 'videocove':
            this.formValidate.videocove = data.url;
            break;
        }
        this.cropperModel = false;
      },
      //查看大图
      handleView (src) {
        this.imgName = src;
        this.visible = true;
      },
      //删除图片
      handleRemove(file) {
        this.subImagesArray.splice(this.subImagesArray.indexOf(file), 1);
        console.log(this.subImagesArray)
      },
      //上传文件成功
      uploadFileSuccess(data){
        console.log(data)
        this.formValidate.video = data.url;
        this.playoptions.src = data.url;
      },

      submitForm(name) {
        console.log(this.formValidate.postage)
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('Success!');
          } else {
            this.$Message.error('Fail!');
          }
        })
      },
      //获得富文本
      getUEContent() {
        let content = this.$refs.ue.getUEContent();
//        this.$notify({
//          title: '获取成功，可在控制台查看！',
//          message: content,
//          type: 'success'
//        });
        console.log(content)
      },
    },
    components:{
      vueCropper,
      videoPlayer,
      uploadFile,
      city,
    }
  }
</script>
<style scoped lang="scss">
  .plublish-goods{
    padding: 10px;
    .item-container{
      display: flex;
      max-width: 600px;
      .item-content{
        display: flex;
        >div{
          margin-left:20px;
        }
        >div:first-child{
          margin: 0;
        }
        .ivu-input-wrapper{
          width: auto;
        }
        .check-box{
          width: 80px;
          display: inline-block;
        }
      }
    }
  }
  .list-img{
    display: flex;
    .item{
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
  .list-img-box{
    display: flex;
    flex-wrap:wrap;
    .upload-list{
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #cccccc;
      margin-right: 10px;
      margin-bottom: 10px;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0px 0px 2px #cccccc;
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
      border: 1px solid #cccccc;
      border-radius: 5px;
      overflow: hidden;
      box-shadow: 0px 0px 1px #cccccc;
    }
    .upload-btn:hover {
      border: 1px solid #69b7ed;
    }
    .upload-btn i{
      margin: 5px;
    }
  }
  .video-box{
    position: relative;
    max-width: 360px;
    .container{
      width: auto;
    }
    .del-btn{
      position: absolute;
      right: -85px;
      bottom:0;
    }
  }

</style>
