<template>
  <section class="form">
    <el-form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-width="100px">
      <el-form-item label="邮箱" prop="mail">
        <el-input v-model="formValidate.mail" placeholder="输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="邮箱验证码" prop="code">
        <div class="item-content">
          <el-input v-model="formValidate.code" placeholder="输入验证码"></el-input>
          <span style="margin-left:10px">
            <el-button type="ghost" :disabled="isDisabled"  @click="handleSendCode()">{{codeText}}</el-button>
          </span>
        </div>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleSubmit('formValidate')">提交</el-button>
        <el-button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</el-button>
      </el-form-item>
    </el-form>

    <set-password :setModel="passwordMadal" @onOk="submitPassword" @onCancel="cancel"></set-password>
  </section>
</template>
<script>
  import  setPassword from '@/components/set-password.vue'
  export default {
    data () {
      return {
        passwordMadal:false,

        isDisabled:false,
        count:'',
        timer:null,
        codeText:'点击发送验证码',

        formValidate: {
          mail: '',
          code: '',
        },
        ruleValidate: {
          mail: [
            { required: true, message: '请输入邮箱', trigger: 'change' },
            { type: 'email', message: '邮箱格式不正确', trigger: 'change' }
          ],
          code: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
          ],
        }
      }
    },
    methods: {
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
      //获取验证码
      getMessageCode(){

      },
      //提交表单
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('Success!');
            this.passwordMadal = true
          } else {
            this.$Message.error('Fail!');
          }
        })
      },
      //重置表单
      handleReset (name) {
        this.$refs[name].resetFields();
      },
      //设置密码
      submitPassword(form){
        console.log(form)
      },
      cancel(){
        this.passwordMadal = false
      }
    },
    components:{
      setPassword
    }
  }
</script>
<style scoped lang="scss">
  .form{
    width: 400px;
    .item-content{
      display: flex;
      justify-content: space-between;
    }
  }

</style>

