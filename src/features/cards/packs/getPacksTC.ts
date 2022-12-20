import { AppRootStateType, AppThunkDispatch } from '../../../app/store'

import { setPacksAC } from './packs-reducer'
import { packsApi } from './packsApi'

export const getPacksTC = () => (dispatch: AppThunkDispatch, getState: () => AppRootStateType) => {
  let userId = getState().app.user._id
  const isMyPack = getState().packs.isMyPack
  const page = getState().packs.packs.page
  const pageCount = getState().packs.packs.pageCount
  const sortPacks = getState().packs.sort
  const packName = getState().packs.packName

  if (!isMyPack) {
    userId = ''
  }

  packsApi.getPacks(userId, page, pageCount, sortPacks, packName).then(res => {
    dispatch(setPacksAC(res.data))
    console.log(res.data)
  })
}
