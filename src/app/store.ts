import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AnyAction, applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { createNewPasswordReducer } from '../features/auth/createNewPassword/createNewPassword-reducer'
import { forgotPasswordReducer } from '../features/auth/forgotPassword/forgotPasswordReducer'
import { loginReducer } from '../features/auth/login/loginReducer'
import { profileReducer } from '../features/auth/profile/profileReducer'
import { registrationReducer } from '../features/auth/registration/registration-reducer'
import { cardsReducer } from '../features/cards/cards/cardsReducer'
import { modalReducer } from '../features/cards/modals/modalReducer'
import { IsMyPackReducer } from '../features/cards/packs/IsMyPackReducer-reducer'
import { packsReducer } from '../features/cards/packs/packs-reducer'

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
  modal: modalReducer,
})
let preloadedState
const persistedIsMyPack1 = localStorage.getItem('isMyPack1')

if (persistedIsMyPack1) {
  preloadedState = JSON.parse(persistedIsMyPack1)
}
export const store = legacy_createStore(RootReducer, preloadedState, applyMiddleware(thunk))
store.subscribe(() => {
  localStorage.setItem('isMyPack1', store.getState().isMyPack.isMyPack1)
})
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
