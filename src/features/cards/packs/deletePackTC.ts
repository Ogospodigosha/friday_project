import { AppThunkDispatch } from '../../../app/store'

import { getPacksTC } from './getPacksTC'
import { packsApi, ParamsForGetPacks } from './packsApi'

export const deletePackTC =
  (id: string, params: ParamsForGetPacks) => (dispatch: AppThunkDispatch) => {
    packsApi.deletePack(id).then(() => {
      dispatch(getPacksTC(params))
    })
  }
