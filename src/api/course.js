import { Message } from 'element-ui'
import AV from 'leancloud-storage'

const query = new AV.Query('Course')

export function getDataList(type) {
  let sureType = ''
  if (type === 'teacher') {
    sureType = 'teacher'
  } else if (type === 'student') {
    sureType = 'student'
  }
  query.include(sureType)
  return query.find().then(res => {
    const dataList = []
    res.map(item => {
      const dataItem = {}
      const typeResult = item.attributes[sureType]
      console.log(item.attributes, 'all')
      if (typeResult) {
        console.log(typeResult, '数据')
        dataItem['name'] = typeResult.attributes.username
        dataItem['phone'] = typeResult.attributes.mobilePhoneNumber
        dataList.push(dataItem)
      }
    })
    return dataList
  }, err => {
    Message({
      message: err.rawMessage,
      type: 'error',
      duration: 5 * 1000
    })
    return err
  })
}
