import { AppThunkDispatch } from '../../../app/store'

import { getPacksTC } from './getPacksTC'
import { createDataType, packsApi, ParamsForGetPacks } from './packsApi'

export const createPackTC =
  (data: createDataType, params: ParamsForGetPacks) => (dispatch: AppThunkDispatch) => {
    packsApi.cratePack(data).then(res => {
      dispatch(getPacksTC(params))
    })
  }
