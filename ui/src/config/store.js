import promiseMiddleware from 'redux-promise-middleware'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers';

const middlewares = [
  promiseMiddleware({
    promiseTypeSuffixes: ['PENDING', 'SUCCESS', 'FAILURE']
  }),
  thunk
]

if (process.env.NODE_ENV === 'development') {
  const createLogger = require('redux-logger').createLogger
  middlewares.push(createLogger())
}

const store = createStore(rootReducer, compose(
  applyMiddleware(...middlewares),
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f  
))

export default store