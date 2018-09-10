import { Message } from 'element-ui'
import AV from 'leancloud-storage'

export function addUser(userInfo) {
  const username = userInfo.username
  const phone = userInfo.phone
  const type = userInfo.type
  const user = new AV.User()
  user.set('username', username)
  user.set('password', '123456')
  user.set('mobilePhoneNumber', phone)
  return user.save().then(function(loggedInUser) {
    var options = {
      userId: loggedInUser.id,
      role: type // 如果是学生则为'student'
    }
    AV.Cloud.run('setRole', options).then(res => {
      console.log(res.status)
      if (res.status === 200) {
        Message({
          message: '用户添加成功',
          type: 'success',
          duration: 3 * 1000
        })
      } else {
        Message({
          message: res.message || res.data,
          type: 'error',
          duration: 3 * 1000
        })
      }
    }, err => {
      console.log('用户角色添加失败', err)
    })
    return loggedInUser
  }, function(error) {
    if (error.toString().indexOf('Mobile phone number has already been taken')) {
      Message({
        message: '手机号已被占用',
        type: 'error',
        duration: 3 * 1000
      })
    } else {
      Message({
        message: '未知错误请联系管理员',
        type: 'error',
        duration: 3 * 1000
      })
    }
    return error
  }).catch(error => {
    return error
  })
}
