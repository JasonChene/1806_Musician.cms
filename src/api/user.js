import { Message } from 'element-ui'
import AV from 'leancloud-storage'

export function addUser(userInfo) {
  console.log(userInfo, '传过来的数据')
  const username = userInfo.username
  const phone = userInfo.phone
  // const type = userInfo.type

  const user = new AV.User()
  console.log(userInfo, 'api中')
  user.setUsername(username)
  user.setPassword('123456')
  user.setMobilePhoneNumber(phone)
  return user.signUp().then(function(loggedInUser) {
    console.log(loggedInUser, '添加之后的用户')
    Message({
      message: '用户添加成功',
      type: 'success',
      duration: 3 * 1000
    })
    return loggedInUser
  }, function(error) {
    Message({
      message: '未知错误请联系管理员',
      type: 'error',
      duration: 3 * 1000
    })
    return error
  }).catch(error => {
    return error
  })
}
