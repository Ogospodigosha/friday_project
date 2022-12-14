import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AnyAction, applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { loginReducer } from '../features/auth/login/login-reducer'
import { profileReducer } from '../features/auth/profile/profileReducer'
import { registrationReducer } from '../features/auth/registration/registration-reducer'

import { appReducer } from './appReducer'

export const RootReducer = combineReducers({
  registration: registrationReducer,
  app: appReducer,
  login: loginReducer,
  profile: profileReducer,
})
export const store = legacy_createStore(RootReducer, applyMiddleware(thunk))

// create custom hook
export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// types
export type AppRootStateType = ReturnType<typeof RootReducer>
// all action type

// universal thunk type
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  AnyAction
>
export type AppThunkDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>
