import { AxiosError } from 'axios'
import { Dispatch } from 'redux'

import { authAPI } from '../../../api/AuthAPi'
import { setAppErrorAC } from '../../../app/appReducer'

const initState = {
  IsRegistrated: false,
  IsLoading: false,
}

export const registrationReducer = (
  state: RegistrationStateType = initState,
  action: ActionsType
): RegistrationStateType => {
  switch (action.type) {
    case 'SET-REGISTRATION':
      return { ...state, IsRegistrated: action.IsRegistrated }
    default:
      return state
  }
}

//types
export type RegistrationStateType = {
  IsRegistrated: boolean
  IsLoading: boolean
}
export type ActionsType = ReturnType<typeof registratedAC>
//action creator
export const registratedAC = (IsRegistrated: boolean) =>
  ({ type: 'SET-REGISTRATION', IsRegistrated } as const)
export const loadingAC = (IsLoading: boolean) => ({ type: 'SET-LOADING', IsLoading } as const)
//thunk creator
export const RegistrationTC = (email: string, password: string) => (dispatch: Dispatch) => {
  dispatch(loadingAC(true))
  authAPI
    .registration(email, password)
    .then(res => {
      dispatch(registratedAC(true))
      console.log(res.data.addedUser)
      dispatch(loadingAC(false))
    })
    .catch((err: AxiosError) => {
      const error = err.response ? (err.response.data as { error: string }).error : err.message

      dispatch(setAppErrorAC(error))
      dispatch(loadingAC(false))
      console.log('error: ', error)
    })
}
