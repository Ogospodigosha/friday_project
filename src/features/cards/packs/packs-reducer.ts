import { AppThunk, AppThunkDispatch } from '../../../app/store'

import { createDataType, packsApi } from './packsApi'

const initState: StateType = {
  cardPacks: [],
  totalCount: 0,
  params: {
    pageCount: 10,
    page: 1,
    sortPacks: '0updated',
    packName: '',
    // min: 3,
    // max: 9,
  },
}

export const packsReducer = (state: StateType = initState, action: ActionsType): StateType => {
  switch (action.type) {
    case 'GET-PACKS':
      return { ...state, cardPacks: action.packs }
    case 'packs/SET-TOTAL-COUNT':
      return { ...state, totalCount: action.totalCount }
    case 'packs/SET-SORT':
      return { ...state, params: { ...state.params, sortPacks: action.newSort } }
    case 'packs/CHANGE-PAGE':
      return { ...state, params: { ...state.params, page: action.page } }
    case 'packs/CHANGE-PAGE-COUNT':
      return { ...state, params: { ...state.params, pageCount: action.pageCount } }
    case 'packs/CHANGE-PACK-NAME':
      return { ...state, params: { ...state.params, packName: action.packName } }
    default:
      return state
  }
}
//types
type ActionsType =
  | ReturnType<typeof getPacksAC>
  | ReturnType<typeof setPacksTotalCountAC>
  | ReturnType<typeof setSortAC>
  | ReturnType<typeof changePageAC>
  | ReturnType<typeof changePageCountAC>
  | ReturnType<typeof changePackNameAC>

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
  params: ParamsType
}
export type ParamsType = {
  pageCount: number
  page: number
  sortPacks: string
  packName: string
  // min: number
  // max: number
}
export type ParamsModelType = {
  pageCount?: number
  page?: number
  sortPacks?: string
  min?: number
  max?: number
  packName?: string
}
//action creator
export const getPacksAC = (packs: PackType[]) => ({ type: 'GET-PACKS', packs } as const)
export const changePageAC = (page: number) => ({ type: 'packs/CHANGE-PAGE', page } as const)
export const changePageCountAC = (pageCount: number) =>
  ({ type: 'packs/CHANGE-PAGE-COUNT', pageCount } as const)

export const setSortAC = (newSort: string) => ({ type: 'packs/SET-SORT', newSort } as const)

export const setPacksTotalCountAC = (totalCount: number) =>
  ({ type: 'packs/SET-TOTAL-COUNT', totalCount } as const)
export const changePackNameAC = (packName: string) =>
  ({ type: 'packs/CHANGE-PACK-NAME', packName } as const)
//thunk creator

export const getPacksTC =
  (newParams: ParamsModelType = {}): AppThunk =>
  (dispatch, getState) => {
    const oldParams = getState().packs.params
    const params: ParamsModelType = {
      ...oldParams,
      ...newParams,
    }

    packsApi.getPacks(params).then(res => {
      dispatch(getPacksAC(res.data.cardPacks))
      dispatch(setPacksTotalCountAC(res.data.cardPacksTotalCount))
    })
  }
export const createPackTC = (data: createDataType) => (dispatch: AppThunkDispatch) => {
  packsApi.cratePack(data).then(res => {
    dispatch(getPacksTC())
  })
}
export const deletePackTC = (id: string) => (dispatch: AppThunkDispatch) => {
  packsApi.deletePack(id).then(res => {
    dispatch(getPacksTC())
  })
}
export const editPackTC = (id: string) => (dispatch: AppThunkDispatch) => {
  packsApi.editPack({ cardsPack: { _id: id, name: 'new name' } }).then(res => {
    dispatch(getPacksTC())
  })
}
