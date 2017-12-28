import mutations from './mutation.js'

const store = {
  state: {
    instance: null, // 用于记录传入到frame中的服务调用实例
    authorization: null // 用于记录相关的参数问题
  },
  mutations
}

export default store
