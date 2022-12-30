import { AnyAction, applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { authReducer } from '../features/auth/authReducer'
import { cardsReducer } from '../features/cards/cards/cardsReducer'
import { modalReducer } from '../features/cards/modals/modalReducer'
import { packsReducer } from '../features/cards/packs/packs-reducer'
import { learnReducer } from '../features/learn/learnReducer'

import { appReducer } from './appReducer'

export const RootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
  cards: cardsReducer,
  packs: packsReducer,
  modal: modalReducer,
  learn: learnReducer,
})

export const store = legacy_createStore(RootReducer, applyMiddleware(thunk))
// types
export type AppRootStateType = ReturnType<typeof RootReducer>

// universal thunk type
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  AnyAction
>
export type AppThunkDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>
