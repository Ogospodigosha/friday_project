import { AnyAction, applyMiddleware, combineReducers, createStore } from 'redux'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { authReducer } from '../features/auth/authReducer'
import { cardsReducer } from '../features/cards/cards/cardsReducer'
import { IsMyPackReducer } from '../features/cards/packs/IsMyPackReducer-reducer'
import { packsReducer } from '../features/cards/packs/packs-reducer'

import { appReducer } from './appReducer'

export const RootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
  cards: cardsReducer,
  packs: packsReducer,
  isMyPack: IsMyPackReducer,
})

let preloadedState
const persistedIsMyPack = localStorage.getItem('isMyPack1')

if (persistedIsMyPack) {
  preloadedState = JSON.parse(persistedIsMyPack)
}

export const store = createStore(RootReducer, preloadedState, applyMiddleware(thunk))

store.subscribe(() => {
  localStorage.setItem('state', JSON.stringify(store.getState()))
  // localStorage.setItem('isMyPack', JSON.stringify({ isMyPack: store.getState().packs.isMyPack }))
  window.localStorage.setItem('isMyPack1', JSON.stringify(store.getState().isMyPack.isMyPack1))
})

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
