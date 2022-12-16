//thunk creator
import { Dispatch } from 'redux'

import { authAPI, createPasswordDataType } from '../../../api/AuthAPi'
import { setAppErrorAC, setAppStatusAC } from '../../../app/appReducer'

import { passwordChangedAC } from './createNewPassword-reducer'

export const createNewPasswordTC = (data: createPasswordDataType) => (dispatch: Dispatch) => {
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
