<template>
  <div class="layout">
    <el-form :model="ruleForm" ref="ruleForm" :rules="ruleForms" class="demo-form-inline">
      <el-row>
        <el-col :span="12">
            <el-form-item prop="name">
                <el-input v-model="ruleForm.name" placeholder="课程名"></el-input>
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
    <el-table
      :data="tableData"
      v-loading="dataListLoading"
      height="800"
      style="width:100%">
      <el-table-column
        prop="course_name"
        label="课程名"
        width="200">
      </el-table-column>
      <el-table-column
        prop="teacher_name"
        label="老师姓名"
        width="200">
      </el-table-column>
      <el-table-column
        prop="teacher_number"
        label="老师手机号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="student_name"
        label="学生姓名"
        width="200">
      </el-table-column>
      <el-table-column
        prop="student_number"
        label="学生手机号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="start_time"
        label="开始时间"
        width="200">
      </el-table-column>
      <el-table-column
        prop="duration_time"
        label="课程时长"
        width="160">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleDelete(scope.$index, scope.rows)">删除课程</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import AV from 'leancloud-storage'
  import { getDataList,addCourse,deleteCourse} from '@/api/course'
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
        tableData: [],
        ruleForm: {
          name: '',
          startTime: '',
          stuPhone: '',
          teaPhone: '',
          teacher_id: '',
          student_id: '',
          designatedTeacher: {
            id: '',
            name: '',
            phone: ''
          },
          designatedStudent: {
            id: '',
            name: '',
            phone: ''
          },
        },
        ruleType: '',
        dataListLoading: false,
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
    mounted() {
      this.get_course_list_teacher()
    },
    methods: {
      handleDelete(index, rows) {
        var self = this
        deleteCourse(index,rows)
        // rows.splice(index, 1);
        setTimeout(self.get_course_list_teacher,1000)
      },
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
        var self = this
        addCourse(this.ruleForm)
        console.log(this.ruleForm)
        setTimeout(self.get_course_list_teacher,1000)
        // .then(res => {
        //   console.log(res)
        //   setTimeout(console.log("444444"),5000)
        // }, err => {
        //   console.log(err)
        // }).catch(error => {
        //   console.log(error)
        // })
      },
      // deleteCourse() {
      //   var self = this
      //   deleteCourse(this.ruleForm)
      //   console.log(this.ruleForm)
      //   // .then(res => {
      //   //   console.log(res)
      //   // }, err => {
      //   //   console.log(err)
      //   // }).catch(error => {
      //   //   console.log(error)
      //   // })
      //   setTimeout(self.get_course_list_teacher,1000)
      // },

      get_course_list_teacher() {
        var self = this
        var course_list = []
        const query = new AV.Query('Course')
        query.greaterThanOrEqualTo('duration', 0)
        query.include('student',"teacher")
        query.find().then(function(results) {
          results.forEach(function(result) {
            var one_course_info = {}
            one_course_info.course_name = (result._serverData).name
            one_course_info.duration_time = ((result._serverData).duration)/60000+"分钟"
            one_course_info.start_time = (result._serverData).startTime.toLocaleString()
            one_course_info.teacher_name = (((result._serverData).teacher).attributes).username
            one_course_info.teacher_number = (((result._serverData).teacher).attributes).mobilePhoneNumber
            one_course_info.student_name = (((result._serverData).student).attributes).username
            one_course_info.student_number = (((result._serverData).student).attributes).mobilePhoneNumber
            course_list.push(one_course_info)
          })
          self.tableData = course_list
          console.log(course_list)
          },
          function(error) {
          })
      }
    }
  }
</script>

<style scoped>
.layout {
  padding: 20px 20px;
  margin-right: 10%;
}
/* 设置时间宽度 */
.el-date-editor--datetimerange.el-input__inner {
  width: 100%;
}
.queryByPhone {
  float: right;
}
</style>
