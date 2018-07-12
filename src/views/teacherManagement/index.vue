<template>
  <div class="layout">
    <el-form :inline="true" :model="ruleForm" v-bind:rules="ruleForms" ref="ruleForm" class="demo-form-inline">
      <el-form-item >
        <el-input v-model="ruleForm.user" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item >
        <el-input v-model="ruleForm.phone" placeholder="手机号"></el-input>
      </el-form-item >
      <el-form-item>
        <el-button type="primary" @click.native.prevent="onSubmitByAdd">添加</el-button>
      </el-form-item>
    </el-form>

    <el-form :inline="true" :model="ruleFormByQuery" v-bind:rules="ruleFormsByQuery" ref="ruleFormByQuery" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="ruleFormByQuery.phone" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmitByQuery">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="tableData"
      v-loading="dataListLoading"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { addUser } from '@/api/user'
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
        username: '',
        phone: '',
        type: 'teacher'
      },
      ruleFormByQuery: {
        phone: ''
      },
      dataListLoading: false,
      ruleForms: {
        username: [
          { required: true, validator: validatorName, trigger: 'blur' }
        ],
        phone: [
          { required: true, validator: validatorPhone, trigger: 'blur' }
        ]
      },
      ruleFormsByQuery: {
        phone: [
          { required: true, validator: validatorPhone, trigger: 'blur' }
        ]
      },
      tableData: []
    }
  },
  mounted() {
    this.getDataList()
  },
  methods: {
    // 获取数据列表
    getDataList() {
      const phone = this.ruleFormByQuery.phone
      this.dataListLoading = true
      this.$store.dispatch('getDataList', 'teacher#' + phone).then(res => {
        this.dataListLoading = false
        this.tableData = res
      }).catch(err => {
        this.dataListLoading = false
        console.log(err)
      })
    },
    onSubmit() {
      console.log('submit!')
    },
    onSubmitByAdd() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.loading = true
          addUser(this.ruleForm).then((res) => {
            this.loading = false
          }, err => {
            console.log(err)
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    onSubmitByQuery() {
      this.$refs.ruleFormByQuery.validate(valid => {
        if (valid) {
          this.getDataList()
        }
      })
    },
    onSubmitByQueryAll() {
      this.ruleFormByQuery.phone = ''
      this.getDataList()
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


