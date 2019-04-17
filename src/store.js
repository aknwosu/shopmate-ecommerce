import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers'



const store = createStore(reducer, compose(
  applyMiddleware(thunk),
  typeof window === 'object' &&
  typeof window.devToolsExtensions !== 'undefined' ? window.devToolsExtensions() : f => f
))

export default store