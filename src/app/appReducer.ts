const initialAppState = {
  error: null as RequestErrorType,
}

export const appReducer = (
  state: AppStateType = initialAppState,
  action: AppActionType
): AppStateType => {
  switch (action.type) {
    case 'APP/SET-ERROR':
      return { ...state, error: action.error }
    default:
      return state
  }
}
//types
export type AppStateType = typeof initialAppState
export type AppActionType = ReturnType<typeof setAppErrorAC>
export type RequestErrorType = null | string
//action creator
export const setAppErrorAC = (error: string | null) => ({ type: 'APP/SET-ERROR', error } as const)
