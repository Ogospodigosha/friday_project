import axios, { AxiosError } from 'axios'
import { Dispatch } from 'redux'

import {
  authAPI,
  CreatePasswordDataType,
  LoginDataType,
  UpdateProfileModelType,
} from '../../api/AuthAPi'
import { setAppErrorAC, setAppStatusAC, setUserAC } from '../../app/appReducer'
import { AppRootStateType, AppThunk, AppThunkDispatch } from '../../app/store'
import { handleError } from '../../utils/error-utils'

const initialState = {
  isLoggedIn: false,
  send: false,
  name: 'Ivan',
  email: 'test@mail.com',
  passwordChanged: false,
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
    case 'auth/CHANGE-NAME':
      return { ...state, name: action.name }
    case 'auth/CHANGE-PASSWORD':
      return { ...state, passwordChanged: action.passwordChanged }
    default:
      return state
  }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
  ({ type: 'auth/SET-IS-LOGGED-IN', value } as const)
export const setSendAC = (value: boolean) => ({ type: 'auth/SET-SEND', value } as const)
export const setEmailAC = (email: string) => ({ type: 'auth/SET-EMAIL', email } as const)
export const changeNameAC = (name: string) => ({ type: 'auth/CHANGE-NAME', name } as const)
export const passwordChangedAC = (passwordChanged: boolean) =>
  ({
    type: 'auth/CHANGE-PASSWORD',
    passwordChanged,
  } as const)

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
export const updateProfileTC =
  (userModel: UpdateProfileModelType): AppThunk =>
  (dispatch, getState: () => AppRootStateType) => {
    dispatch(setAppStatusAC('loading'))
    const user = getState().app.user
    const model = {
      name: user.name,
      ...userModel,
    }

    authAPI
      .updateUser(model)
      .then(res => {
        console.log(res.data.updatedUser)
        dispatch(setUserAC(res.data.updatedUser))
        dispatch(setAppStatusAC('succeeded'))
      })
      .catch(() => {})
  }
export const logOutTC = () => async (dispatch: AppThunkDispatch) => {
  dispatch(setAppStatusAC('loading'))
  try {
    await authAPI.logOut()

    dispatch(setIsLoggedInAC(false))
    dispatch(setAppStatusAC('succeeded'))
  } catch (err) {
    console.log(err)
  }
}
export const createNewPasswordTC = (data: CreatePasswordDataType) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'))

  authAPI
    .createPassword(data)
    .then(res => {
      console.log(res)
      dispatch(passwordChangedAC(true))
      dispatch(setAppStatusAC('succeeded'))
    })
    .catch(e => {
      dispatch(setAppErrorAC(e.message))
      dispatch(setAppStatusAC('failed'))
    })
}

// types
export type AuthReducerActionType =
  | ReturnType<typeof setIsLoggedInAC>
  | ReturnType<typeof setSendAC>
  | ReturnType<typeof setEmailAC>
  | ReturnType<typeof changeNameAC>
  | ReturnType<typeof passwordChangedAC>
type AuthInitialStateType = typeof initialState
