import { AppThunk, AppThunkDispatch } from '../../../app/store'

import { createDataType, packsApi } from './packsApi'

const initState: StateType = {
  cardPacks: [],
  totalCount: 0,
  params: {
    pageCount: 10,
    page: 1,
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
    case 'packs/SET-PARAMS':
      return { ...state, params: action.params }
    default:
      return state
  }
}
//types
type ActionsType =
  | ReturnType<typeof getPacksAC>
  | ReturnType<typeof setPacksTotalCountAC>
  | ReturnType<typeof setParamsAC>

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
  // min: number
  // max: number
}
export type ParamsModelType = {
  pageCount?: number
  page?: number
  min?: number
  max?: number
}
//action creator
export const getPacksAC = (packs: PackType[]) => ({ type: 'GET-PACKS', packs } as const)
export const setParamsAC = (params: ParamsType) => ({ type: 'packs/SET-PARAMS', params } as const)

export const setPacksTotalCountAC = (totalCount: number) =>
  ({ type: 'packs/SET-TOTAL-COUNT', totalCount } as const)
//thunk creator

export const getPacksTC =
  (newParams: ParamsModelType = {}): AppThunk =>
  (dispatch, getState) => {
    const oldParams = getState().packs.params
    const params: ParamsType = {
      ...oldParams,
      ...newParams,
    }

    packsApi.getPacks(params).then(res => {
      const params = {
        pageCount: res.data.pageCount,
        page: res.data.page,
      }

      dispatch(setParamsAC(params))
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
