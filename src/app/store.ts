import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { TLoginReducer } from '../features/auth/login/login-reducer'

import { loadingReducer } from './loadingReducer'

export const RootReducer = combineReducers({
  loading: loadingReducer,
})
export const store = legacy_createStore(RootReducer, applyMiddleware(thunk))
export type AppRootStateType = ReturnType<typeof RootReducer>

// create custom hook
export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// types
// all action type
type ActionType = TLoginReducer

// universal thunk type
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  ActionType
>
type AppThunkDispatch = ThunkDispatch<AppRootStateType, unknown, ActionType>
