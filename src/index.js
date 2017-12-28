import Frame from './frame'
import * as locals from './locals'
import views from './notices'
import storeModule from './store'
// import EventHub from './eventHub'

const TFrame = function (Vue, opts = {}) {
  Vue.component(Frame.name, Frame)
}
// auto install
if (typeof window !== 'undefined' && window.Vue) {
  TFrame(window.Vue)
}

export {
  TFrame,
  locals,
  views,
  storeModule
  // EventHub
}
