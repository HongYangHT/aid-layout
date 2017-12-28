import * as Constant from './constant.js'
export default {
  [Constant.SET_INSTANCE] (state, payload) {
    state.instance = payload
  },
  [Constant.SET_AUTHORIZATION] (state, payload) {
    state.authorization = payload
  }
}
