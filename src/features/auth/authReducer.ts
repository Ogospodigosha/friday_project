import { AxiosError } from 'axios'

import {
  authAPI,
  CreatePasswordDataType,
  LoginDataType,
  UpdateProfileModelType,
} from '../../api/AuthAPi'
import { setAppStatusAC, setUserAC } from '../../app/appReducer'
import { AppThunk } from '../../app/store'
import { handleError } from '../../utils/error-utils'

const initialState = {
  name: 'name',
  email: 'test@mail.com',
  isLoggedIn: false,
  isSent: false,
  isPasswordChanged: false,
  isRegistered: false,
}

export const authReducer = (
  state: AuthInitialStateType = initialState,
  action: AuthReducerActionType
): AuthInitialStateType => {
  switch (action.type) {
    case 'auth/SET-IS-LOGGED-IN':
      return { ...state, isLoggedIn: action.value }
    case 'auth/SET-SENT':
      return { ...state, isSent: action.isSent }
    case 'auth/SET-EMAIL':
      return { ...state, email: action.email }
    case 'auth/CHANGE-NAME':
      return { ...state, name: action.name }
    case 'auth/IS-PASSWORD-CHANGED':
      return { ...state, isPasswordChanged: action.isPasswordChanged }
    case 'auth/SET-REGISTRATION':
      return { ...state, isRegistered: action.isRegistered }
    default:
      return state
  }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
  ({ type: 'auth/SET-IS-LOGGED-IN', value } as const)
export const setSentAC = (isSent: boolean) => ({ type: 'auth/SET-SENT', isSent } as const)
export const setEmailAC = (email: string) => ({ type: 'auth/SET-EMAIL', email } as const)
export const changeNameAC = (name: string) => ({ type: 'auth/CHANGE-NAME', name } as const)
export const setIsPasswordChangedAC = (isPasswordChanged: boolean) =>
  ({
    type: 'auth/IS-PASSWORD-CHANGED',
    isPasswordChanged,
  } as const)
export const isRegisteredAC = (isRegistered: boolean) =>
  ({ type: 'auth/SET-REGISTRATION', isRegistered } as const)

// thunks
export const logInTC =
  (data: LoginDataType): AppThunk =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await authAPI.login(data)

      dispatch(setAppStatusAC('succeeded'))
      dispatch(setUserAC(res.data))
      dispatch(setIsLoggedInAC(true))
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

      dispatch(setAppStatusAC('succeeded'))
      dispatch(setEmailAC(email))
      dispatch(setSentAC(true))
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>

      handleError(err, dispatch)
    } finally {
      dispatch(setAppStatusAC('idle'))
    }
  }
export const updateProfileTC =
  (userModel: UpdateProfileModelType): AppThunk =>
  async (dispatch, getState) => {
    dispatch(setAppStatusAC('loading'))
    const user = getState().app.user
    const model = {
      name: user.name,
      ...userModel,
    }

    try {
      const res = await authAPI.updateUser(model)

      dispatch(setUserAC(res.data.updatedUser))
      dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>

      handleError(err, dispatch)
    } finally {
      dispatch(setAppStatusAC('idle'))
    }
  }
export const logOutTC = (): AppThunk => async dispatch => {
  dispatch(setAppStatusAC('loading'))
  try {
    const res = await authAPI.logOut()

    dispatch(setIsLoggedInAC(false))
    dispatch(setAppStatusAC('succeeded'))
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>

    handleError(err, dispatch)
  } finally {
    dispatch(setAppStatusAC('idle'))
  }
}
export const RegistrationTC =
  (email: string, password: string): AppThunk =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await authAPI.registration(email, password)

      dispatch(isRegisteredAC(true))
      dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>

      handleError(err, dispatch)
    } finally {
      dispatch(setAppStatusAC('idle'))
    }
  }
export const createNewPasswordTC =
  (data: CreatePasswordDataType): AppThunk =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await authAPI.createPassword(data)

      dispatch(setIsPasswordChangedAC(true))
      dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>

      handleError(err, dispatch)
    } finally {
      dispatch(setAppStatusAC('idle'))
    }
  }

// types
export type AuthReducerActionType =
  | ReturnType<typeof setIsLoggedInAC>
  | ReturnType<typeof setSentAC>
  | ReturnType<typeof setEmailAC>
  | ReturnType<typeof changeNameAC>
  | ReturnType<typeof setIsPasswordChangedAC>
  | ReturnType<typeof isRegisteredAC>
type AuthInitialStateType = typeof initialState
