import { getDataList } from '@/api/course'

const course = {
  state: {
    list: []
  },
  actions: {
    // 获取列表信息
    getDataList({ commit }, type) {
      return new Promise((resolve, reject) => {
        getDataList(type.trim()).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}

export default course
