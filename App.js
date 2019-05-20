import React from 'react'
import dva from './utils/dva'
import Router, { routerMiddleware, routerReducer } from './router'
import user from './models/user'
import test from './models/test'
import survey from './models/survey'

const app = dva({
  initialState: {},
  models: [user,test,survey],
  extraReducers: { router: routerReducer },
  onAction: [routerMiddleware],
  onError(e) {
    console.log('onError', e)
  },
})

const App = app.start(<Router />)

export default () => <App />
