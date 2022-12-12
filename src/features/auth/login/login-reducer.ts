import axios, { AxiosError } from 'axios'

import { AppThunk } from '../../../app/store'

import { loginApi, TLoginData } from './login-api'

const initialState = {
  isLoggedIn: false,
}

type InitialStateType = typeof initialState

export const loginReducer = (
  state: InitialStateType = initialState,
  action: TLoginReducer
): InitialStateType => {
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
  (data: TLoginData): AppThunk =>
  async dispatch => {
    try {
      const res = await loginApi.login(data)

      dispatch(setIsLoggedInAC(true))
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>

      if (axios.isAxiosError(err)) {
        const error = err.response?.data ? err.response.data.error : err.message
        // dispatch(setAppErrorAC(error))
      } else {
        // dispatch(setAppErrorAC(`Native error ${err.message}`))
      }
    } finally {
      //dispatch
    }
    loginApi
      .login({ email: 'as', password: 'asd' })
      .then(() => {
        // code
      })
      .catch((err: AxiosError<{ error: string }>) => {
        const error = err.response ? err.response.data.error : err.message

        console.log('error: ', error)
      })
  }

// types
export type TLoginReducer = ReturnType<typeof setIsLoggedInAC>
