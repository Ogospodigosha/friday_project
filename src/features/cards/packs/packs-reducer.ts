const initState: InitialStateType = {
  packs: {
    minCardsCount: 0,
    maxCardsCount: 10,
    pageCount: 15,
    page: 1,
    cardPacks: [] as PackType[],
  } as PacksType,
  sort: '',
  searchPack: '',
  isMyPack: false,
  localMinRage: 0,
  localMaxRage: 30,
  resultMessageAddPack: '',
}

export const packsReducer = (
  state: InitialStateType = initState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case 'SET-PACKS':
      return { ...state, packs: action.packs }
    case 'SET-IS-MY-PACK':
      return { ...state, isMyPack: action.isMyPack }
    default:
      return state
  }
}
//types
export type InitialStateType = {
  packs: PacksType
  sort: string
  searchPack: string
  isMyPack: boolean
  localMinRage: number
  localMaxRage: number
  resultMessageAddPack: string
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
}
export const setPacksAC = (packs: PacksType) => ({ type: 'SET-PACKS', packs } as const)
export const setIsMyPackAC = (isMyPack: boolean) => ({ type: 'SET-IS-MY-PACK', isMyPack } as const)
export type ActionsType = ReturnType<typeof setPacksAC> | ReturnType<typeof setIsMyPackAC>
