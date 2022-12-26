import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AnyAction, applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { createNewPasswordReducer } from '../features/auth/createNewPassword/createNewPassword-reducer'
import { forgotPasswordReducer } from '../features/auth/forgotPassword/forgotPasswordReducer'
import { loginReducer } from '../features/auth/login/loginReducer'
import { profileReducer } from '../features/auth/profile/profileReducer'
import { registrationReducer } from '../features/auth/registration/registration-reducer'
import { cardsReducer } from '../features/cards/cards/cardsReducer'
import { IsMyPackReducer } from '../features/cards/packs/IsMyPackReducer-reducer'
import { packsReducer } from '../features/cards/packs/packs-reducer'
import { learnReducer } from '../features/learn/learnReducer'

import { appReducer } from './appReducer'

export const RootReducer = combineReducers({
  registration: registrationReducer,
  app: appReducer,
  login: loginReducer,
  profile: profileReducer,
  createNewPassword: createNewPasswordReducer,
  forgotPassword: forgotPasswordReducer,
  cards: cardsReducer,
  packs: packsReducer,
  isMyPack: IsMyPackReducer,
  learn: learnReducer,
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
