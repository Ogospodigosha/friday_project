import { AppThunkDispatch } from '../../../app/store'

import { getPacksTC } from './getPacksTC'
import { packsApi } from './packsApi'

export const deletePackTC = (id: string, params: any) => (dispatch: AppThunkDispatch) => {
  packsApi.deletePack(id).then(() => {
    dispatch(getPacksTC(params))
  })
}
