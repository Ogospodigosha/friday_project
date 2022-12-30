import { AxiosError } from 'axios'

import { setAppStatusAC } from '../../../app/appReducer'
import { AppThunk } from '../../../app/store'
import { handleError } from '../../../utils/error-utils'

import { getPacksTC } from './getPacksTC'
import { packsApi, ParamsForGetPacks } from './packsApi'

export const editPackTC =
  (id: string, name: string, params: ParamsForGetPacks): AppThunk =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await packsApi.editPack({ cardsPack: { _id: id, name: name } })

      dispatch(getPacksTC(params))
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>

      handleError(err, dispatch)
    } finally {
      dispatch(setAppStatusAC('idle'))
    }
  }
