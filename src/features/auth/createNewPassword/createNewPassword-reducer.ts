const initState = {
  passwordChanged: false,
}

export const createNewPasswordReducer = (state: StatePropsType = initState, action: ActionType) => {
  switch (action.type) {
    case 'CHANGE-PASSWORD':
      return { ...state, passwordChanged: action.passwordChanged }
    default:
      return state
  }
}
//types
type StatePropsType = {
  passwordChanged: boolean
}
type ActionType = ReturnType<typeof passwordChangedAC>
//action creator
export const passwordChangedAC = (passwordChanged: boolean) => ({
  type: 'CHANGE-PASSWORD',
  passwordChanged,
})
