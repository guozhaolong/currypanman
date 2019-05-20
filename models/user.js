import createModel from './index'
import {post} from "../services"

export default createModel('user', {

  state: {
    current:{username:'admin'},
  },

  subscriptions: {
    async setup({ dispatch }) {

    },
  },
  effects: {
    * login({ payload }, { select, call, put }) {
      const data = yield call(post, 'login', {username:payload.username,password:payload.password})
      if (data) {
        console.log(data)
      }
    },
  },
  reducers: {
    findOne(state, action) {

    },
  },

})
