import axios, { AxiosError } from 'axios'

import { setAppErrorAC, setAppStatusAC } from '../app/appReducer'
import { AppThunkDispatch } from '../app/store'

export const handleError = (
  e: Error | AxiosError<{ error: string }>,
  dispatch: AppThunkDispatch
) => {
  const err = e as Error | AxiosError<{ error: string }>

  if (axios.isAxiosError(err)) {
    const error = err.response?.data ? err.response.data.error : err.message

    dispatch(setAppErrorAC(error))
  } else {
    dispatch(setAppErrorAC(`Native error ${err.message}`))
  }
  dispatch(setAppStatusAC('failed'))
}
