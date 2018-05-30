<template>
  <div class="login">
    <div class="login-form">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm">
        <el-form-item prop="name">
          <el-input type="text" v-model="ruleForm.name" auto-complete="off" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item  prop="pass">
          <el-input type="password" v-model="ruleForm.pass" auto-complete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <p class="forget-password">
          <router-link to="/portal/forget">忘记密码</router-link>
        </p>
        <el-form-item>
          <el-button class="login-btn" type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </el-form-item>
        <el-form-item style="text-align: center">
          <el-button class="login-btn"  @click="$router.push({path:'/register'})">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  import { mapMutations } from 'vuex';
  export default {
    data() {
      let validateName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          name:'admin',
          pass: '111111',
        },
        rules: {
          name:[
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { validator: validateName, trigger: 'blur' }
          ],
          pass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 6, message: '请输入6位密码', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      ...mapMutations(['setUser']),
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let user = {
              name : 'jsp',
              pawd : '111111',
              auth : 'sfdjknabsjdbnflsjdfjk'
            };
            this.setUser(user);
            this.$router.push({path: '/'});
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    }
  }
</script>
<style scoped lang="scss">
  .login{
    position: absolute;
    left:0;
    right: 0;
    top:0;
    bottom: 0;
    background: url("https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=132600321,3123081067&fm=27&gp=0.jpg") no-repeat;
    background-size: cover;
    .login-form{
      position: absolute;
      right: 140px;
      top:150px;
      width: 250px;
      border-radius: 20px;
      padding: 60px 30px 20px 30px;
      background: rgba(225,225,225,0.5);
      .forget-password{
        text-align: right;
        margin: -10px 10px 10px 10px;
        font-size: 12px;
      }
      .login-btn{
        width: 100%;
      }
    }
  }
</style>
