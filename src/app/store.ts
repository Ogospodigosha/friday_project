import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { profileReducer } from '../features/auth/profile/profileReducer'
import { loginReducer, TLoginReducer } from '../features/auth/login/login-reducer'
import { registrationReducer } from '../features/auth/registration/registration-reducer'

import { appReducer } from './appReducer'

export const RootReducer = combineReducers({
  registration: registrationReducer,
  app: appReducer,
  login: loginReducer,
  profile: profileReducer
})
export const store = legacy_createStore(RootReducer, applyMiddleware(thunk))

// create custom hook
export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// types
export type AppRootStateType = ReturnType<typeof RootReducer>
// all action type
type ActionType = TLoginReducer

// universal thunk type
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  ActionType
>
export type AppThunkDispatch = ThunkDispatch<AppRootStateType, unknown, ActionType>
