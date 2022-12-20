import { AppRootStateType, AppThunkDispatch } from '../../../app/store'

import { setPacksAC } from './packs-reducer'
import { packsApi } from './packsApi'

export const getPacksTC = () => (dispatch: AppThunkDispatch, getState: () => AppRootStateType) => {
  let userId = getState().app.user._id
  const isMyPack = getState().packs.isMyPack
  let params = new URLSearchParams()

  params.append('user_id', userId)
  let request = {
    params: params,
  }

  if (!isMyPack) {
    userId = ''
  }

  packsApi.getPacks(userId).then(res => {
    dispatch(setPacksAC(res.data))
    console.log(res.data)
  })
}
