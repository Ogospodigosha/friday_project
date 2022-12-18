import { Dispatch } from 'redux'

import { AppThunkDispatch } from '../../../app/store'

import { createDataType, packsApi } from './packsApi'

const initState: StateType = {
  cardPacks: [],
}

export const packsReducer = (state: StateType = initState, action: ActionsType): StateType => {
  switch (action.type) {
    case 'GET-PACKS':
      return { ...state, cardPacks: action.packs }
    default:
      return state
  }
}
//types
type ActionsType = ReturnType<typeof getPacksAC>
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
}
//action creator
export const getPacksAC = (packs: PackType[]) => ({ type: 'GET-PACKS', packs } as const)
//thunk creator
export const getPacksTC = () => (dispatch: Dispatch) => {
  packsApi.getPacks().then(res => {
    dispatch(getPacksAC(res.data.cardPacks))
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
