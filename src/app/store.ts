import { useDispatch } from 'react-redux'
import { combineReducers, legacy_createStore, applyMiddleware, AnyAction } from 'redux'
import thunk, { ThunkDispatch } from 'redux-thunk'

import { registrationReducer } from '../features/auth/registration/registration-reducer'

import { appReducer } from './appReducer'
import { loadingReducer } from './loadingReducer'

export const RootReducer = combineReducers({
  // loading: loadingReducer,
  registration: registrationReducer,
  app: appReducer,
})
export const store = legacy_createStore(RootReducer, applyMiddleware(thunk))
export type AppRootStateType = ReturnType<typeof RootReducer>

type ThunkAppDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>
export const useAppDispatch = () => useDispatch<ThunkAppDispatchType>()
