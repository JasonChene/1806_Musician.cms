
<template>
  <div class="layout">
    <el-form :model="ruleForm" ref="ruleForm" :rules="ruleForms" class="demo-form-inline">
      <el-row>
        <el-col :span="12">
            <el-form-item prop="comment">
                <el-input v-model="ruleForm.comment" placeholder="课程名"></el-input>
            </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="9">
          <el-form-item prop="startTime">
            <el-date-picker
              v-model="ruleForm.startTime"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-select v-model="ruleForm.duration" placeholder="请选择对应时长">
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
          <el-form-item prop="teaPhone">
            <el-input v-model="ruleForm.teaPhone" placeholder="输入手机号指定老师"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item>
            <span v-if="ruleForm.designatedTeacher.name !== ''">指定该节课的老师是：{{ruleForm.designatedTeacher.name}}</span>
            <el-button class="queryByPhone" type="primary" @click="queryByTeacher">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item prop="stuPhone">
            <el-input v-model="ruleForm.stuPhone" placeholder="输入手机号指定学生"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item>
            <span v-if="ruleForm.designatedStudent.name !== ''">指定该节课的学生是：{{ruleForm.designatedStudent.name}}</span>
            <el-button class="queryByPhone" type="primary" @click="queryByStudent">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      
      <el-button type="primary" @click="addCourse" round>添加该课程</el-button>
    </el-form>
  </div>
</template>

<script>
  import { getDataList, addCourse } from '@/api/course'
  export default {
    data() {
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
          comment: '',
          startTime: '',
          stuPhone: '',
          teaPhone: '',
          designatedTeacher: {
            id: '',
            name: '',
            phone: ''
          },
          designatedStudent: {
            id: '',
            name: '',
            phone: ''
          }
        },
        ruleType: '',
        options: [{
          value: 1000 * 60 * 30,
          label: '30分钟'
        }, {
          value: 1000 * 60 * 45,
          label: '45分钟'
        }, {
          value: 1000 * 60 * 60,
          label: '60分钟'
        }, {
          value: 1000 * 60 * 90,
          label: '90分钟'
        }, {
          value: 1000 * 60 * 120,
          label: '120分钟'
        }],
        value: '',
        ruleForms: {
          phone: [{ required: true, trigger: 'blur', validator: validatorPhone }]
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!')
      },
      selectedTime(e) {
        alert(e)
      },
      queryByTeacher() {
        const validator = /^1[0-9]{10}$/.test(this.ruleForm.teaPhone)
        if (validator) {
          getDataList('teacher#' + this.ruleForm.teaPhone).then(res => {
            this.ruleForm.designatedTeacher = res[0]
          })
        } else {
          this.$message('请输入正确格式的电话号码')
        }
      },
      queryByStudent() {
        const validator = /^1[0-9]{10}$/.test(this.ruleForm.stuPhone)
        if (validator) {
          getDataList('student#' + this.ruleForm.stuPhone).then(res => {
            this.ruleForm.designatedStudent = res[0]
          })
        } else {
          this.$message('请输入正确格式的电话号码')
        }
      },
      addCourse() {
        addCourse(this.ruleForm).then(res => {
          console.log(res)
        })
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
