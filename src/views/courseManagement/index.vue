
<template>
  <div class="layout">
    <el-form :model="ruleForm" ref="ruleForm" class="demo-form-inline">
      <el-row>
        <el-col :span="12">
            <el-form-item>
                <el-input v-model="ruleForm.name" placeholder="课程名"></el-input>
            </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="9">
          <el-form-item>
            <el-date-picker
              v-model="ruleForm.value5"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-select v-model="value" placeholder="请选择对应时长">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item>
            <el-input v-model="ruleForm.teaPhone" placeholder="输入手机号指定老师"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item>
            <el-button class="queryByPhone" type="primary" @click="onSubmitByAdd">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item>
            <el-input v-model="ruleForm.stuPhone" placeholder="输入手机号指定学生"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item>
            <el-button class="queryByPhone" type="primary" @click="onSubmitByAdd">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      
      <el-button type="primary" round>添加该课程</el-button>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        ruleForm: {
          name: '',
          region: '',
          name2: '',
          name3: '',
          name5: '',
          name6: '',
          name7: '',
          stuPhone: '',
          teaPhone: ''
        },
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!')
      },
      selectedTime(e) {
        alert(e)
      }
    }
  }
</script>

<style scoped>
.layout {
  padding: 20px 20px;
  margin-right: 30%;
}
/* 设置时间宽度 */
.el-date-editor--datetimerange.el-input__inner {
  width: 100%;
}
.queryByPhone {
  float: right;
}
</style>
