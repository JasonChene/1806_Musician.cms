// import { Message } from 'element-ui'
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
  const returnUser = user.signUp().then(function(loggedInUser) {
    console.log(loggedInUser, '添加之后的用户')
  }, function(error) {
    console.log(error)
  })

  console.log(returnUser, '返回之后的用户')
}
