import { AxiosError } from 'axios'

import { packsApi, ParamsForGetPacks } from '../../../api/PacksApi'
import { setAppStatusAC } from '../../../app/appReducer'
import { AppThunk } from '../../../app/store'
import { handleError } from '../../../utils/error-utils'
import { deletePackForFadeMenu } from '../modals/modalReducer'

import { getPacksTC } from './getPacksTC'

export const deletePackTC =
  (id: string, params: ParamsForGetPacks, flag = false): AppThunk =>
  async dispatch => {
    debugger
    dispatch(setAppStatusAC('loading'))

    try {
      if (flag === false) {
        const res = await packsApi.deletePack(id)

        dispatch(getPacksTC(params))
      } else {
        const res = await packsApi.deletePack(id)

        dispatch(deletePackForFadeMenu(false))

        return res
      }

      debugger
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>

      handleError(err, dispatch)
    } finally {
      dispatch(setAppStatusAC('idle'))
    }
  }
