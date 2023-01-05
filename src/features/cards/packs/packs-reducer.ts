const initState: InitialStateType = {
  packs: {
    minCardsCount: 0,
    maxCardsCount: 0,
    pageCount: 0,
    page: 0,
    cardPacksTotalCount: 0,
    cardPacks: [] as PackType[],
  } as PacksType,
}

export const packsReducer = (
  state: InitialStateType = initState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case 'packs/SET-PACKS':
      return { ...state, packs: action.packs }
    default:
      return state
  }
}

//action creator
export const setPacksAC = (packs: PacksType) => ({ type: 'packs/SET-PACKS', packs } as const)
//types
type ActionsType = ReturnType<typeof setPacksAC>

export type InitialStateType = {
  packs: PacksType
}
export type PacksType = {
  cardPacks: PackType[]
  cardPacksTotalCount: number
  maxCardsCount: number
  minCardsCount: number
  page: number
  pageCount: number
  token: string
  tokenDeathTime: number
}
export type PackType = {
  cardsCount: number
  created: string
  grade: number
  more_id: string
  name: string
  path: string
  private: boolean
  rating: number
  shots: number
  type: string
  updated: string
  user_id: string
  user_name: string
  __v: number
  _id: string
  deckCover: string
}
