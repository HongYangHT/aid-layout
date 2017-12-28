export default [
  {
    path: 'notice/:bulletinId',
    name: 'notice',
    component: require('../views/notice.vue'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '',
    name: 'notice-list',
    component: require('../views/notice-list.vue'),
    meta: {
      requireAuth: true
    }
  }
]
