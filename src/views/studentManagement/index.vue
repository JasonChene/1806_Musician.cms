<template>
  <div class="layout">
    <el-form :inline="true" :model="ruleForm" v-bind:rules="rules" class="demo-form-inline">
      <el-form-item >
        <el-input v-model="ruleForm.user" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item >
        <el-input v-model="ruleForm.phone" placeholder="手机号"></el-input>
      </el-form-item >
      <el-form-item>
        <el-button type="primary" @click="onSubmitByAdd">添加</el-button>
      </el-form-item>
    </el-form>

    <el-form :inline="true" :model="ruleForm" v-bind:rules="rules" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="ruleForm.phone" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmitByAdd">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
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
      formInline: {
        user: '',
        region: ''
      },
      rules: {
        name: [
          { validator: validatorName, trigger: 'blur' }
        ],
        password: [
          { validator: validatorPhone, trigger: 'blur' }
        ]
      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>

<style lang="scss" scoped>
 .layout {
  padding: 20px 20px;
  margin-right: 30%;
}
</style>


