<template>
  <el-dialog
    title="设置密码"
    :visible.sync="modelActive"
    width="400px"
    :center="true"
    :show-close="false"
    >
    <el-form  ref="setPassword" :model="setPassword" :rules="setPasswordRuleValidate" label-width="80px">
      <el-form-item label="设置密码" prop="password1">
        <el-input v-model="setPassword.password1" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="password2">
        <el-input v-model="setPassword.password2" placeholder="请再次输入密码"></el-input>
      </el-form-item>
      <el-form-item >
        <el-button type="primary" @click="handleSubmit('setPassword')">确定</el-button>
        <el-button type="ghost" @click="handleCancel('setPassword')" style="margin-left: 8px">取消</el-button>
      </el-form-item>
    </el-form >
  </el-dialog>
</template>
<script>
  export default {
    props:['setModel'],
    data(){
      let validatePass2 = (rule, value, callback) => {
        if (value !== this.setPassword.password1) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return{
        setPassword: {
          password1: '',
          password2: '',
        },
        setPasswordRuleValidate: {
          password1: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { type: 'string', min: 6, message: '请设置至少6位密码', trigger: 'blur' }
          ],
          password2: [
            { required: true, message: '请再次输入密码', trigger: 'blur' },
            { validator: validatePass2, trigger: 'blur' }
          ],
        }
      }
    },
    computed:{
      modelActive(){
        return this.setModel
      }
    },
    methods:{
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('Success!');
            this.$emit('onOk',this.setPassword);
          } else {
            this.$Message.error('Fail!');
          }
        })
      },
      handleCancel(name){
        this.$refs[name].resetFields();
        this.$emit('onCancel')
      },
    }
  }
</script>
<style scoped lang="scss">
  .vertical-center-modal {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
