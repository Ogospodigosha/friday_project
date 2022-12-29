import { AppThunkDispatch } from '../../../app/store'

import { createDataType, packsApi } from './packsApi'

export const createPackTC = (data: createDataType) => (dispatch: AppThunkDispatch) => {
  packsApi.cratePack(data).then(res => {
    // dispatch(getPacksTC())
    console.log('created')
  })
}
