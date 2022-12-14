import { authAPI } from '../../../api/AuthAPi'
import { setUserAC } from '../../../app/appReducer'
import { AppRootStateType, AppThunk } from '../../../app/store'

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
type UpdateUserType = {
  name?: string
  avatar?: string
}
export const updateProfileTC =
  (userModel: UpdateUserType): AppThunk =>
  (dispatch, getState: () => AppRootStateType) => {
    const user = getState().app.user
    const model = {
      name: user.name,
      ...userModel,
    }

    authAPI
      .updateUser(model)
      .then(res => {
        console.log(res)
        dispatch(setUserAC(res.data.updatedUser))
      })
      .catch(() => {})
  }
export const changeNameAC = (name: string) => ({ type: 'profile/CHANGE-NAME', name } as const)
export type ProfileReducer = ReturnType<typeof changeNameAC>
