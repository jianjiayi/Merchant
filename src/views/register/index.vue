<template>
  <div class="bg-body">
    <my-header></my-header>
    <div class="content container">
      <step-bar :stepOptions="stepOption"></step-bar>
      <div v-if="$route.name =='register'" class="register">
        <div class="form">
          <el-form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-width="80px">
            <el-form-item label="用户名" prop="name">
              <el-input v-model="formValidate.name" placeholder="输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="formValidate.password" placeholder="输入密码"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="password2">
              <el-input v-model="formValidate.password2" placeholder="确认密码"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="formValidate.phone" placeholder="绑定手机号"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="code">
              <div class="item-content">
                <el-input v-model="formValidate.code" placeholder="输入验证码"></el-input>
                <span style="margin-left:10px">
                  <el-button type="ghost" :disabled="isDisabled"  @click="handleSendCode()">{{codeText}}</el-button>
                </span>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button class="submit-btn" type="primary" @click="handleSubmit('formValidate')">注册</el-button>
            </el-form-item>
            <el-form-item style="text-align: center">
              <router-link to="/login">已有账号？登录</router-link>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div v-else class="qualification">
        <router-view></router-view>
      </div>
    </div>
    <my-footer></my-footer>
  </div>
</template>
<script>
  import myHeader from '@/components/layout/header1.vue';
  import myFooter from '@/components/layout/footer.vue';

  import stepBar from '@/components/step-bar.vue';

  export default {
    data () {
      let validatePass2 = (rule, value, callback) => {
        if (value !== this.formValidate.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      let phoneValidate = (rule, value, callback) => {
        var reg=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
        if (!reg.test(value)) {
          callback(new Error('手机号格式不正确'));
        } else {
          this.isDisabled=false,
            callback();
        };
      };

      return {
        //步骤条参数
        stepOption:{
          active:1,//激活选项
          options:[
            {
              title:'注 册',
              icon:'iconfont icon-yijianfankui',
            },
            {
              title:'资 质',
              icon:'iconfont icon-shangchuan',
            },
            {
              title:'审 核',
              icon:'iconfont icon-daichulidingdan',
            },
            {
              title:'开 店',
              icon:'iconfont icon-dingdan1',
            },
          ]
        },

        passwordMadal:false,

        isDisabled:true,
        count:'',
        timer:null,
        codeText:'点击发送验证码',

        formValidate: {
          name:'',
          password:'',
          password2:'',
          phone: '',
          code: '',
        },
        ruleValidate: {
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { type: 'string', min: 6, message: '请设置至少6位密码', trigger: 'blur' }
          ],
          password2: [
            { required: true, message: '请再次输入密码', trigger: 'blur' },
            { validator: validatePass2, trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { validator: phoneValidate, trigger: 'change' }
          ],
          code: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
          ],
        }
      }
    },
    methods:{
      //获取验证码倒计时
      handleSendCode(){
        const TIME_COUNT = 30;
        if (!this.timer){
          this.count = TIME_COUNT;
          this.isDisabled = true;

          this.timer = setInterval(() =>{
            if(this.count > 0 && this.count <= TIME_COUNT){
              this.count--;
              this.codeText = this.count+"秒后重新发送";

              this.getMessageCode();//调用获取验证码

            }else{
              this.codeText = "点击发送验证码"
              this.isDisabled = false;
              clearInterval(this.timer);
              this.timer = null;
            }
          },1000)
        }
      },
      //获取短信验证码
      getMessageCode(){

      },
      //提交表单
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            console.log('Success!');
            this.stepOption.active = 2;
            this.$router.push({name:'qualification'});
          } else {
            console.log('Fail!');
          }
        })
      },
    },
    components:{
      myHeader,myFooter,stepBar
    }
  }
</script>
<style scoped lang="scss">
  .bg-body{
    background: #f2f2f240;
    padding-top: 100px;
    .content{
      min-height: 700px;
      padding-top: 10px;
      background: #ffffff;
    }
  }

  .register{
    position: relative;
    width: 350px;
    margin: 0 auto;
    .item-content{
      display: flex;
      justify-content: space-between;
    }
  }
  .submit-btn{
    width: 100%;
  }
  .qualification{
    padding: 20px 0 50px 0;
  }
</style>
