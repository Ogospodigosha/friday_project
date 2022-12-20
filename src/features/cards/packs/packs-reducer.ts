const initState: InitialStateType = {
  packs: {
    minCardsCount: 0,
    maxCardsCount: 10,
    pageCount: 10,
    page: 1,
    cardPacksTotalCount: 100,
    cardPacks: [] as PackType[],
  } as PacksType,
  sort: '0updated',
  packName: '',
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
    case 'packs/SET-PACKS':
      return { ...state, packs: action.packs }
    case 'packs/SET-IS-MY-PACK':
      return { ...state, isMyPack: action.isMyPack }
    case 'packs/SET-PAGE':
      return { ...state, packs: { ...state.packs, page: action.page } }
    case 'packs/SET-PAGE-COUNT':
      return { ...state, packs: { ...state.packs, pageCount: action.pageCount } }
    case 'packs/SET-SORT':
      return { ...state, sort: action.newSort }
    case 'packs/SET-PACK-NAME':
      return { ...state, packName: action.packName }
    default:
      return state
  }
}

//action creator
export const setPacksAC = (packs: PacksType) => ({ type: 'packs/SET-PACKS', packs } as const)
export const setIsMyPackAC = (isMyPack: boolean) =>
  ({ type: 'packs/SET-IS-MY-PACK', isMyPack } as const)
export const setPageAC = (page: number) => ({ type: 'packs/SET-PAGE', page } as const)
export const setPageCountAC = (pageCount: number) =>
  ({ type: 'packs/SET-PAGE-COUNT', pageCount } as const)

export const setSortAC = (newSort: string) => ({ type: 'packs/SET-SORT', newSort } as const)
//
export const setPackNameAC = (packName: string) =>
  ({ type: 'packs/SET-PACK-NAME', packName } as const)

//types
type ActionsType =
  | ReturnType<typeof setPacksAC>
  | ReturnType<typeof setIsMyPackAC>
  | ReturnType<typeof setPageAC>
  | ReturnType<typeof setPageCountAC>
  | ReturnType<typeof setSortAC>
  | ReturnType<typeof setPackNameAC>

export type InitialStateType = {
  packs: PacksType
  sort: string
  packName: string
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
