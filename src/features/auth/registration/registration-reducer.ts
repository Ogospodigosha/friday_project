import { AxiosError } from 'axios'
import { Dispatch } from 'redux'

import { authAPI } from '../../../api/AuthAPi'
import { setAppErrorAC, setAppStatusAC } from '../../../app/appReducer'

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
}
export type ActionsType = ReturnType<typeof registratedAC>
//action creator
export const registratedAC = (IsRegistrated: boolean) =>
  ({ type: 'SET-REGISTRATION', IsRegistrated } as const)

//thunk creator
export const RegistrationTC = (email: string, password: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'))
  authAPI
    .registration(email, password)
    .then(res => {
      dispatch(registratedAC(true))
      console.log(res.data.addedUser)
      dispatch(setAppStatusAC('succeeded'))
    })
    .catch((err: AxiosError) => {
      const error = err.response ? (err.response.data as { error: string }).error : err.message

      dispatch(setAppErrorAC(error))
      dispatch(setAppStatusAC('failed'))
      console.log('error: ', error)
    })
}
