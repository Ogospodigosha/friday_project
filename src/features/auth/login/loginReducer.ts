import axios, { AxiosError } from 'axios'

import { authAPI, LoginDataType } from '../../../api/AuthAPi'
import { setAppErrorAC, setAppStatusAC, setUserAC } from '../../../app/appReducer'
import { AppThunk } from '../../../app/store'

const initialState = {
  isLoggedIn: false,
}

export const loginReducer = (
  state: LoginInitialStateType = initialState,
  action: LoginReducerType
): LoginInitialStateType => {
  switch (action.type) {
    case 'login/SET-IS-LOGGED-IN':
      return { ...state, isLoggedIn: action.value }
    default:
      return state
  }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
  ({ type: 'login/SET-IS-LOGGED-IN', value } as const)

// thunks
export const logInTC =
  (data: LoginDataType): AppThunk =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await authAPI.login(data)

      dispatch(setUserAC(res.data))
      // dispatch(setAppStatusAC('succeeded'))
      dispatch(setIsLoggedInAC(true))
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>

      // dispatch(setAppStatusAC('failed'))
      if (axios.isAxiosError(err)) {
        const error = err.response?.data ? err.response.data.error : err.message

        dispatch(setAppErrorAC(error))
      } else {
        dispatch(setAppErrorAC(`Native error ${err.message}`))
      }
    } finally {
      dispatch(setAppStatusAC('idle'))
    }
  }

// types
export type LoginReducerType = ReturnType<typeof setIsLoggedInAC>
type LoginInitialStateType = typeof initialState
