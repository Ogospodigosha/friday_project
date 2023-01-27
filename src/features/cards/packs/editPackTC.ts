import { AxiosError } from 'axios'

import { packsApi, ParamsForGetPacks } from '../../../api/PacksApi'
import { setAppStatusAC } from '../../../app/appReducer'
import { AppThunk } from '../../../app/store'
import { handleError } from '../../../utils/error-utils'

import { getPacksTC } from './getPacksTC'

export const editPackTC =
  (id: string, name: string, file64: string | undefined, params: ParamsForGetPacks): AppThunk =>
  async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await packsApi.editPack({
        cardsPack: { _id: id, name: name, deckCover: file64 },
      })

      dispatch(getPacksTC(params))
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>

      handleError(err, dispatch)
    } finally {
      dispatch(setAppStatusAC('idle'))
    }
  }
