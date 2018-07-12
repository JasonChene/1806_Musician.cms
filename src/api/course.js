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
    console.log(userList, '角色信息表')
    userList.map(item => {
      const dataItem = {}
      const typeResult = item.attributes
      if (typeResult) {
        dataItem['name'] = typeResult.username
        dataItem['phone'] = typeResult.mobilePhoneNumber
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

  // query.include(sureType)
  // typeQuery !== '' ? query.equalTo('phone', typeQuery) : null
  // return query.find().then(res => {
  //   const dataList = []
  //   res.map(item => {
  //     const dataItem = {}
  //     const typeResult = item.attributes[sureType]
  //     if (typeResult) {
  //       dataItem['name'] = typeResult.attributes.username
  //       dataItem['phone'] = typeResult.attributes.mobilePhoneNumber
  //       dataList.push(dataItem)
  //     }
  //   })
  //   return dataList
  // }, err => {
  //   Message({
  //     message: err.rawMessage,
  //     type: 'error',
  //     duration: 5 * 1000
  //   })
  //   return err
  // })
}
