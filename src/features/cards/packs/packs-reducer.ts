import { Dispatch } from 'redux'

import { AppThunkDispatch } from '../../../app/store'

import { createDataType, packsApi, ParamsType } from './packsApi'

const initState: StateType = {
  cardPacks: [],
  totalCount: 0,
  pageCount: 10,
  page: 1,
}

export const packsReducer = (state: StateType = initState, action: ActionsType): StateType => {
  switch (action.type) {
    case 'GET-PACKS':
      return { ...state, cardPacks: action.packs }
    case 'packs/SET-TOTAL-COUNT':
      return { ...state, totalCount: action.totalCount }
    case 'packs/SET-COUNT':
      return { ...state, pageCount: action.pageCount }
    case 'packs/SET-PAGE':
      return { ...state, page: action.page }
    default:
      return state
  }
}
//types
type ActionsType =
  | ReturnType<typeof getPacksAC>
  | ReturnType<typeof setPacksTotalCountAC>
  | ReturnType<typeof setPageCountAC>
  | ReturnType<typeof setPageAC>
export type PackType = {
  _id: string
  user_id: string
  user_name: string
  private: boolean
  name: string
  path: string
  grade: number
  shots: number
  cardsCount: number
  type: string
  rating: number
  created: string
  updated: string
  more_id: string
  __v: number
}
type StateType = {
  cardPacks: PackType[]
  totalCount: number
  pageCount: number
  page: number
}
//action creator
export const getPacksAC = (packs: PackType[]) => ({ type: 'GET-PACKS', packs } as const)
export const setPageCountAC = (pageCount: number) =>
  ({ type: 'packs/SET-COUNT', pageCount } as const)
export const setPageAC = (page: number) => ({ type: 'packs/SET-PAGE', page } as const)
export const setPacksTotalCountAC = (totalCount: number) =>
  ({ type: 'packs/SET-TOTAL-COUNT', totalCount } as const)
//thunk creator

export const getPacksTC = (params: ParamsType) => (dispatch: Dispatch) => {
  packsApi.getPacks(params).then(res => {
    dispatch(getPacksAC(res.data.cardPacks))
    dispatch(setPacksTotalCountAC(res.data.cardPacksTotalCount))
    dispatch(setPageCountAC(res.data.pageCount))
    dispatch(setPageAC(res.data.page))
  })
}
export const createPackTC = (data: createDataType) => (dispatch: AppThunkDispatch) => {
  packsApi.cratePack(data).then(res => {
    // dispatch(getPacksTC())
  })
}
export const deletePackTC = (id: string) => (dispatch: AppThunkDispatch) => {
  packsApi.deletePack(id).then(res => {
    // dispatch(getPacksTC())
  })
}
export const editPackTC = (id: string) => (dispatch: AppThunkDispatch) => {
  packsApi.editPack({ cardsPack: { _id: id, name: 'new name' } }).then(res => {
    // dispatch(getPacksTC())
  })
}
