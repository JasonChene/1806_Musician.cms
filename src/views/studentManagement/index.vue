<template>
  <div class="demo-input-size">
    <el-form label-width="100px" class="demo-ruleForm" v-bind:rules="rules" ref="ruleForm" v-bind:model="ruleForm">
      <el-form-item>
        <el-input type="text" auto-complete="off" v-model="ruleForm.name" placeholder="姓名"></el-input>
        <el-input type="text" auto-complete="off" v-model="ruleForm.phone" placeholder="手机号"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    // 验证名字
    const validatorName = function(rule, value, callback) {
      if (!value) {
        callback(new Error('请输入账号'))
      } else if (!/^[A-Za-z0-9_\-\u4e00-\u9fa5]+$/.test(value) || value.length > 0) {
        callback(new Error('姓名不能为空且只能是中英文或者数字'))
      } else {
        callback()
      }
    }
    // 验证手机号
    const validatorPhone = function(rule, value, callback) {
      if (!(/^1[0-9]{10}$/.test(value))) {
        return callback(new Error('请输入正确格式的电话号码'))
      } else if (value.toString().length !== 11) {
        return callback(new Error('电话号码必须是11位数字'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        name: '',
        phone: ''
      },
      rules: {
        name: [
          { validator: validatorName, trigger: 'blur' }
        ],
        password: [
          { validator: validatorPhone, trigger: 'blur' }
        ]
      }
    }
  }
}
</script>

<style lang="sass" scoped>

</style>


