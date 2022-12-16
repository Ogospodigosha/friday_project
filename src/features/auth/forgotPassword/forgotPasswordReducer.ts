import axios, { AxiosError } from 'axios'

import { authAPI } from '../../../api/AuthAPi'
import { setAppErrorAC, setAppStatusAC } from '../../../app/appReducer'
import { AppThunk } from '../../../app/store'

const initialState = {
  send: false,
  email: 'test@mail.com',
}

type InitialStateType = typeof initialState

export const forgotPasswordReducer = (
  state: InitialStateType = initialState,
  action: forgotPasswordReducerAT
) => {
  switch (action.type) {
    case 'password/SET-SEND':
      return { ...state, send: action.value }
    case 'password/SET-EMAIL':
      return { ...state, email: action.email }
    default:
      return state
  }
}
// actions
export const setSendAC = (value: boolean) => ({ type: 'password/SET-SEND', value } as const)
export const setEmailAC = (email: string) => ({ type: 'password/SET-EMAIL', email } as const)

// thunks
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
type forgotPasswordReducerAT = ReturnType<typeof setSendAC> | ReturnType<typeof setEmailAC>
