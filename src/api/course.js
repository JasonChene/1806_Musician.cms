import { Message } from 'element-ui'
import AV from 'leancloud-storage'

export function getDataList(type) {
  const sureType = type.split('#')[0]
  const typeQuery = type.split('#')[1]

  // 新建针对 Role 的查询
  var roleQuery = new AV.Query(AV.Role)

  roleQuery.equalTo('name', sureType)

  // 执行查询
  return roleQuery.first().then(function(adminRole) {
    const userRelation = adminRole.relation('users')
    return userRelation.query().find()
  }).then(function(userList) {
    // userList 就是拥有该角色权限的所有用户了。
    const dataList = []
    const dataListByQuery = []
    userList.map(item => {
      const dataItem = {}
      const typeResult = item.attributes
      if (typeResult) {
        dataItem['name'] = typeResult.username
        dataItem['phone'] = typeResult.mobilePhoneNumber
        dataItem['id'] = item.id
        if (typeQuery !== '') {
          if (typeResult.mobilePhoneNumber === typeQuery) {
            dataListByQuery.push(dataItem)
          }
        } else {
          dataList.push(dataItem)
        }
      }
    })
    return typeQuery !== '' ? dataListByQuery : dataList
  }, err => {
    Message({
      message: err.rawMessage,
      type: 'error',
      duration: 5 * 1000
    })
    return err
  }).catch(function(error) {
    console.log(error)
  })
}

export function addCourse(data) {
  const Course = AV.Object.extend('Course')
  const course = new Course()

  const teacher = AV.Object.createWithoutData('_User', data.designatedTeacher.id)
  const student = AV.Object.createWithoutData('_User', data.designatedStudent.id)

  course.set('startTime', data.startTime)
  course.set('teacher', teacher)
  course.set('student', student)
  course.set('duration', data.duration)
  course.set('name', data.name)

  course.save().then(res => {
    Message({
      message: '课程添加成功',
      type: 'success',
      duration: 3 * 1000
    })
    return res
  }, err => {
    Message({
      message: '未知原因请联系管理员',
      type: 'error',
      duration: 3 * 1000
    })
    return err
  }).catch(err => {
    console.log(err)
  })
}
