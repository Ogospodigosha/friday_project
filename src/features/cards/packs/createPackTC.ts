import { AxiosError } from 'axios'

import { setAppStatusAC } from '../../../app/appReducer'
import { AppThunk } from '../../../app/store'
import { handleError } from '../../../utils/error-utils'

import { getPacksTC } from './getPacksTC'
import { createDataType, packsApi, ParamsForGetPacks } from './packsApi'

export const createPackTC =
  (data: createDataType, params: ParamsForGetPacks): AppThunk =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await packsApi.cratePack(data)

      dispatch(getPacksTC(params))
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>

      handleError(err, dispatch)
    } finally {
      dispatch(setAppStatusAC('idle'))
    }
  }
