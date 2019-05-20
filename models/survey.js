import createModel from './index'
import {survey} from "../services/simulator";
export default createModel('survey', {

  state: {
    score: 0,
  },

  subscriptions: {
    async setup({ dispatch }) {

    },
  },
  effects: {
    * fetch({ payload }, { select, call, put }) {
      const {pageSize, currentPage} = yield select(state => state.test);
      const {current} = yield select(state => state.user);
      const data = yield call(survey,{});
      if (data) yield put({ type: 'setValue', payload: {item: data.item} })
    },
  },
  reducers: {
    update(state,action){
      return {
        ...state,
        item: {
          ...state.item,
          questions: state.item.questions.map(question => {
            if (question.id === action.payload.question.id)
              return {...question,answer:parseInt(action.payload.option)};
            else
              return question;
          }),
        },
      }
    },
    computeScore(state,action){
      let weight = 0;
      if(100/state.item.questions.length > 5){
        weight = 100/state.item.questions.length - 5;
      }
      const score = state.item.questions.reduce((acc,q) => acc + q.answer + weight,0);
      return {
        ...state,
        score: score,
      }
    },
  },

})
