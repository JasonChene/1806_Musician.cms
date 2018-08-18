import { Message } from 'element-ui'
import AV from 'leancloud-storage'

// import request from '@/utils/request'

// let User = AV.Object.extend('User')
const query = new AV.Query('_User')

// export function login(username, password) {
//   return request({
//     url: '/user/login',
//     method: 'post',
//     data: {
//       username,
//       password
//     }
//   })
// }

export function login(username, password) {
  return AV.User.logIn(username, password).then(res => {
    console.log(res, '用户信息')
    return res
  }, err => {
    console.log(err)
    Message({
      message: err.rawMessage,
      type: 'error',
      duration: 5 * 1000
    })
    return err
  })
}

// export function getInfo(token) {
//   return request({
//     url: '/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

export function getInfo(token) {
  return query.get(token).then(res => {
    console.log(res, '查询出来的数据')
    return res
  }, err => {
    return err
  })
}

export function logout() {
  return AV.User.logOut()
  // return request({
  //   url: '/user/logout',
  //   method: 'post'
  // })
}
