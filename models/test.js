import createModel from './index'
import {question} from "../services/simulator";
export default createModel('test', {

  state: {
    num: 0,
    selectedQuestion: {},
    viewMode: false,
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
      const data = yield call(question,{});
      if (data) yield put({ type: 'setValue', payload: {item: { user:current,type:1 ,questions: data.list, },num:0,viewMode:false, selectedQuestion: data.list[0]} })
    },
  },
  reducers: {
    preview(state, action){
      if(state.num > 0) {
        return {
          ...state,
          selectedQuestion:state.item.questions[state.num-1],
          num: state.num - 1,
        }
      }else {
        return state
      }
    },
    next(state, action){
      if(state.num < state.item.questions.length-1) {
        return {
          ...state,
          selectedQuestion:state.item.questions[state.num+1],
          num: state.num + 1,
        }
      }else {
        return state
      }
    },
    updateQuestion(state,action){
      const answer = action.payload.answer;
      if(answer !== undefined){
        return {
          ...state,
          item: {
            ...state.item,
            questions: state.item.questions.map(question => {
              if (question.id === state.selectedQuestion.id)
                return {...question,answer:answer};
              else
                return question;
            }),
          },
          selectedQuestion: {...state.selectedQuestion,answer:answer}
        }
      }
    },
    computeScore(state,action){
      const correct = state.item.questions.filter(q => !!q.options.find(o => q.answer === o.tag && o.correct === 2));
      return {
        ...state,
        score: Math.round(100/state.item.questions.length*correct.length),
      }
    },
    viewQuestion(state,action){
      const num = state.item.questions.findIndex(q => q.id === action.payload.question.id)
      return {
        ...state,
        num: num,
        selectedQuestion: action.payload.question,
      }
    }
  },

})
