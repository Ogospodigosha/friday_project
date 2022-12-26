import { AppThunkDispatch } from '../../../app/store'

import { getPacksTC } from './getPacksTC'
import { packsApi } from './packsApi'

export const editPackTC = (id: string, name: string) => (dispatch: AppThunkDispatch) => {
  packsApi.editPack({ cardsPack: { _id: id, name: name } }).then(res => {
    dispatch(getPacksTC())
  })
}
