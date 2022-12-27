import { authAPI, ProfileType } from '../api/AuthAPi'
import { setIsLoggedInAC } from '../features/auth/authReducer'

import { AppThunk } from './store'

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
    case 'app/SET-ERROR':
      return { ...state, error: action.error }
    case 'app/SET-INITIALIZED':
      return { ...state, isInitialized: action.isInitialized }
    case 'app/SET-STATUS':
      return { ...state, status: action.status }
    case 'app/SET-USER':
      return { ...state, user: action.user }
    default:
      return state
  }
}
//action creator
export const setAppErrorAC = (error: string | null) => ({ type: 'app/SET-ERROR', error } as const)
export const setInitializedAC = (isInitialized: boolean) =>
  ({ type: 'app/SET-INITIALIZED', isInitialized } as const)
export const setAppStatusAC = (status: RequestStatusType) =>
  ({ type: 'app/SET-STATUS', status } as const)
export const setUserAC = (user: ProfileType) => ({ type: 'app/SET-USER', user } as const)

//thunk
export const authMeTC = (): AppThunk => async dispatch => {
  try {
    const res = await authAPI.me()

    dispatch(setUserAC(res.data))
    dispatch(setIsLoggedInAC(true))
  } catch (e) {
    // const err = e as Error | AxiosError<{ error: string }>
    //
    // handleError(err, dispatch)
    dispatch(setIsLoggedInAC(false))
  } finally {
    dispatch(setInitializedAC(true))
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
