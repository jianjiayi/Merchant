<template>
  <el-cascader
    :options="data"
    v-model="model"
    @change="selectVal">
  </el-cascader>
</template>
<script>
  import city from '@/assets/js/city.js'
  export default {
    props:['modelCity'],
    data () {
      return {
        model:this.modelCity,
        data: city
      }
    },
    created(){
      console.log(this.modelCity)
    },
    watch:{
      modelCity(val,oldval){
        console.log(val,oldval);
        this.model = val
      }
    },
    methods:{
      selectVal(val){
        console.log('val:'+val);
        this.$emit('on-citySuccess',val)
      }
    }
  }
</script>
