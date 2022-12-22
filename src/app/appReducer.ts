import { AxiosError } from 'axios'
import { Dispatch } from 'redux'

import { authAPI } from '../api/AuthAPi'
import { setIsLoggedInAC } from '../features/auth/login/loginReducer'
import { ProfileType } from '../features/auth/profile/profileApi'

const initialAppState = {
  error: null as RequestErrorType,
  isInitialized: false,
  status: 'idle' as RequestStatusType,
  user: {} as ProfileType,
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
    case 'APP/SET-STATUS':
      return { ...state, status: action.status }
    case 'APP/SET-USER':
      return { ...state, user: action.user }
    default:
      return state
  }
}
//types
export type AppStateType = typeof initialAppState
export type AppActionType =
  | ReturnType<typeof setAppErrorAC>
  | ReturnType<typeof setInitializedAC>
  | ReturnType<typeof setAppStatusAC>
  | ReturnType<typeof setUserAC>
export type RequestErrorType = null | string
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

//action creator
export const setAppErrorAC = (error: string | null) => ({ type: 'APP/SET-ERROR', error } as const)
export const setInitializedAC = (isInitialized: boolean) =>
  ({ type: 'APP/SET-INITIALIZED', isInitialized } as const)
export const setAppStatusAC = (status: RequestStatusType) =>
  ({ type: 'APP/SET-STATUS', status } as const)
export const setUserAC = (user: ProfileType) => ({ type: 'APP/SET-USER', user } as const)
export const clearIdAC = (user: ProfileType) => ({ type: 'APP/SET-USER', user } as const)
//thunk creator
export const authMeTC = () => (dispatch: Dispatch) => {
  authAPI
    .me()
    .then(res => {
      dispatch(setUserAC(res.data))
      dispatch(setIsLoggedInAC(true))
    })
    .catch((e: AxiosError) => {
      dispatch(setIsLoggedInAC(false))
    })
    .finally(() => {
      dispatch(setInitializedAC(true))
    })
}
