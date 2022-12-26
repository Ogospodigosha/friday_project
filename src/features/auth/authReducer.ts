import axios, { AxiosError } from 'axios'

import { authAPI, LoginDataType } from '../../api/AuthAPi'
import { setAppErrorAC, setAppStatusAC, setUserAC } from '../../app/appReducer'
import { AppThunk } from '../../app/store'
import { handleError } from '../../utils/error-utils'

const initialState = {
  isLoggedIn: false,
  send: false,
  email: 'test@mail.com',
}

export const authReducer = (
  state: AuthInitialStateType = initialState,
  action: AuthReducerActionType
): AuthInitialStateType => {
  switch (action.type) {
    case 'auth/SET-IS-LOGGED-IN':
      return { ...state, isLoggedIn: action.value }
    case 'auth/SET-SEND':
      return { ...state, send: action.value }
    case 'auth/SET-EMAIL':
      return { ...state, email: action.email }
    default:
      return state
  }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
  ({ type: 'auth/SET-IS-LOGGED-IN', value } as const)
export const setSendAC = (value: boolean) => ({ type: 'auth/SET-SEND', value } as const)
export const setEmailAC = (email: string) => ({ type: 'auth/SET-EMAIL', email } as const)

// thunks
export const logInTC =
  (data: LoginDataType): AppThunk =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await authAPI.login(data)

      dispatch(setUserAC(res.data))
      dispatch(setIsLoggedInAC(true))
      dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>

      handleError(err, dispatch)
    } finally {
      dispatch(setAppStatusAC('idle'))
    }
  }
export const forgotPassTC =
  (email: string): AppThunk =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await authAPI.forgotPassword(email)

      dispatch(setEmailAC(email))
      dispatch(setSendAC(true))
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>

      if (axios.isAxiosError(err)) {
        const error = err.response?.data ? err.response.data.error : err.message

        dispatch(setAppErrorAC(error))
      } else {
        dispatch(setAppErrorAC(`Native error ${err.message}`))
      }
    } finally {
      // dispatch(setSendAC(false))
      dispatch(setAppStatusAC('idle'))
    }
  }

// types
export type AuthReducerActionType =
  | ReturnType<typeof setIsLoggedInAC>
  | ReturnType<typeof setSendAC>
  | ReturnType<typeof setEmailAC>
type AuthInitialStateType = typeof initialState
