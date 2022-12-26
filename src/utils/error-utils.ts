import axios, { AxiosError } from 'axios'

import { setAppErrorAC } from '../app/appReducer'
import { AppThunkDispatch } from '../app/store'

export const handleError = (
  err: Error | AxiosError<{ error: string }>,
  dispatch: AppThunkDispatch
) => {
  if (axios.isAxiosError(err)) {
    const error = err.response?.data ? err.response.data.error : err.message

    dispatch(setAppErrorAC(error))
  } else {
    dispatch(setAppErrorAC(`Native error ${err.message}`))
  }
}
