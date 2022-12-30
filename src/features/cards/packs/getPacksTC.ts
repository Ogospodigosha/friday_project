import { AxiosError } from 'axios'

import { packsApi, ParamsForGetPacks } from '../../../api/PacksApi'
import { setAppStatusAC } from '../../../app/appReducer'
import { AppThunk } from '../../../app/store'
import { handleError } from '../../../utils/error-utils'

import { setPacksAC } from './packs-reducer'

export const getPacksTC =
  (paramsForSend: ParamsForGetPacks): AppThunk =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await packsApi.getPacks(paramsForSend)

      dispatch(setPacksAC(res.data))
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>

      handleError(err, dispatch)
    } finally {
      dispatch(setAppStatusAC('idle'))
    }
  }
