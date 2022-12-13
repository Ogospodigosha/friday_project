import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AnyAction, applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import thunk, { ThunkDispatch } from 'redux-thunk'

import { profileReducer } from '../features/auth/profile/profileReducer'

import { loadingReducer } from './loadingReducer'

export const RootReducer = combineReducers({
  loading: loadingReducer,
  profile: profileReducer,
})
export const store = legacy_createStore(RootReducer, applyMiddleware(thunk))
export type AppRootStateType = ReturnType<typeof RootReducer>

export type ThunkAppDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>
export const useAppDispatch = () => useDispatch<ThunkAppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
