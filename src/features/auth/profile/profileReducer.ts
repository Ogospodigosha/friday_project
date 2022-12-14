const initialState = {
  name: 'Ivan',
  email: 'YourEmail@gmail.com',
}

type InitialStateType = typeof initialState

export const profileReducer = (state: InitialStateType = initialState, action: ProfileReducer) => {
  switch (action.type) {
    case 'profile/CHANGE-NAME':
      console.log(state)

      return { ...state, name: action.name }
    default:
      return state
  }
}

// export const updateProfileTC =
//   (profileModel: UpdateProfileModelType) =>
//   async (dispatch: AppThunkDispatch, getState: () => AppRootStateType) => {
//     const user = getState().app.user
//
//     authAPI.changeUserName(user)
//     let userModel = { ...profileModel, name: user.name }
//
//     dispatch()
//   }
export const changeNameAC = (name: string) => ({ type: 'profile/CHANGE-NAME', name } as const)
export type ProfileReducer = ReturnType<typeof changeNameAC>
