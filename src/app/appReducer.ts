import { AxiosError } from 'axios'
import { AnyAction, Dispatch } from 'redux'

import { registrationAPI } from '../features/auth/registration/registrationAPI'

import { ThunkAppDispatchType } from './store'

const initialAppState = {
  error: null as RequestErrorType,
  isInitialized: false,
}

export const appReducer = (
  state: AppStateType = initialAppState,
  action: AppActionType
): AppStateType => {
  switch (action.type) {
    case 'APP/SET-ERROR':
      return { ...state, error: action.error }
    case 'APP/SET-INITIALIZED':
      return { ...state, isInitialized: action.isInitialized }
    default:
      return state
  }
}
//types
export type AppStateType = typeof initialAppState
export type AppActionType = ReturnType<typeof setAppErrorAC> | ReturnType<typeof setInitializedAC>
export type RequestErrorType = null | string
//action creator
export const setAppErrorAC = (error: string | null) => ({ type: 'APP/SET-ERROR', error } as const)
export const setInitializedAC = (isInitialized: boolean) =>
  ({ type: 'APP/SET-INITIALIZED', isInitialized } as const)
//thunk creator
export const authMeTC = () => (dispatch: Dispatch) => {
  registrationAPI
    .me()
    .then(res => {
      // dispatch(IsLoggedInAC( true))
      dispatch(setInitializedAC(true))
    })
    .catch((e: AxiosError) => {
      dispatch(setInitializedAC(true))
    })
}
