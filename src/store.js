import { createStore, compose, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger' /* eslint no-unused-vars: 0 */
import reducer from './reducers'

const middleware = [
	thunkMiddleware,
]
if (process.env.CLIENT_ENV !== 'production') {
	middleware.push(createLogger())
}
const store = createStore(reducer, compose(
	applyMiddleware(...middleware),
	typeof window === 'object'
  && typeof window.devToolsExtensions !== 'undefined' ? window.devToolsExtensions() : f => f
))

export default store
