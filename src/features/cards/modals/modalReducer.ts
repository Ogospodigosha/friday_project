const initialState = {
  title: null as TitleType,
}

//types
type StateModalType = {
  title: TitleType
}
type TitleType = 'Add new Pack' | 'Edit pack' | 'Delete pack' | 'Add new card' | 'Edit card' | null
//action creator
export const openModal = (title: TitleType) => ({ type: 'OPEN-MODAL', title } as const)
export type ActionsType = ReturnType<typeof openModal>

export const modalReducer = (state: StateModalType = initialState, action: ActionsType) => {
  switch (action.type) {
    case 'OPEN-MODAL':
      return { ...state, title: action.title }
    default:
      return state
  }
}
