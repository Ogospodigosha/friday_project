import { combineReducers, legacy_createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { loadingReducer } from './loadingReducer'

export const RootReducer = combineReducers({
  loading: loadingReducer,
})
export const store = legacy_createStore(RootReducer, applyMiddleware(thunk))
export type AppRootStateType = ReturnType<typeof RootReducer>
