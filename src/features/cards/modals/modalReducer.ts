const initialState = {
  title: null as TitleType,
  flag: false,
}

//types
type StateModalType = {
  title: TitleType
  flag: boolean
}

type TitleType =
  | 'Add new Pack'
  | 'Edit pack'
  | 'Delete pack'
  | 'Add new card'
  | 'Edit card'
  | 'Delete card'
  | null
//action creator
export const openModal = (title: TitleType) => ({ type: 'OPEN-MODAL', title } as const)
export const deletePackForFadeMenu = (flag: boolean) => ({ type: 'DELETE-FOR-FADE', flag } as const)
export type ActionsType = ReturnType<typeof openModal> | ReturnType<typeof deletePackForFadeMenu>

export const modalReducer = (state: StateModalType = initialState, action: ActionsType) => {
  switch (action.type) {
    case 'OPEN-MODAL':
      return { ...state, title: action.title }
    case 'DELETE-FOR-FADE':
      return { ...state, flag: action.flag }
    default:
      return state
  }
}
