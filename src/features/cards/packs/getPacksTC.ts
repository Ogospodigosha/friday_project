import { AppRootStateType, AppThunkDispatch } from '../../../app/store'

import { setPackNameAC, setPacksAC, setSortAC } from './packs-reducer'
import { packsApi, ParamsForGetPacks } from './packsApi'

export const getPacksTC =
  (paramsForSend: ParamsForGetPacks = {}) =>
  (dispatch: AppThunkDispatch, getState: () => AppRootStateType) => {
    let user_id = getState().app.user._id
    const isMyPack = getState().packs.isMyPack
    const isMyPack1 = getState().isMyPack.isMyPack1
    const page = getState().packs.packs.page
    const pageCount = getState().packs.packs.pageCount
    const sortPacks = getState().packs.sort
    const packName = getState().packs.packName

    if (!isMyPack1) {
      user_id = ''
    }
    const params = {
      user_id,
      page,
      pageCount,
      sortPacks,
      packName,
      ...paramsForSend,
    }

    packsApi.getPacks(params).then(res => {
      dispatch(setPacksAC(res.data))
      dispatch(setSortAC(params.sortPacks))
      dispatch(setPackNameAC(params.packName))
    })
  }
