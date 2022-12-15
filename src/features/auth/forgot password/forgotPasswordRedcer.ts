import axios, { AxiosError } from 'axios'

import { authAPI } from '../../../api/AuthAPi'
import { setAppErrorAC } from '../../../app/appReducer'
import { AppThunk } from '../../../app/store'

// const initialState = {
//   send: false,
// }
//
// type InitialStateType = typeof initialState
//
// export const forgotPasswordReducer = (
//   state: InitialStateType = initialState,
//   action: forgotPasswordReducerAT
// ) => {
//   switch (action.type) {
//     case 'password/SET-SEND':
//       return { ...state, send: action.value }
//     default:
//       return state
//   }
// }
// actions
// export const setSendAC = (value: boolean) => ({ type: 'password/SET-SEND', value } as const)

// thunks
export const forgotPassTC =
  (email: string): AppThunk =>
  async dispatch => {
    try {
      const res = await authAPI.forgotPassword(email)

      // dispatch(setSendAC(true))
      // console.log(res)
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>

      if (axios.isAxiosError(err)) {
        const error = err.response?.data ? err.response.data.error : err.message

        dispatch(setAppErrorAC(error))
      } else {
        dispatch(setAppErrorAC(`Native error ${err.message}`))
      }
    } finally {
      //dispatch
    }
  }

// types
// type forgotPasswordReducerAT = ReturnType<typeof setSendAC>
