import { authAPI } from '../../../api/AuthAPi'
import { setAppStatusAC, setUserAC } from '../../../app/appReducer'
import { AppRootStateType, AppThunk, AppThunkDispatch } from '../../../app/store'
import { setIsLoggedInAC } from '../login/loginReducer'

const initialState = {
  name: 'Ivan',
  email: 'YourEmail@gmail.com',
}

type InitialStateType = typeof initialState

export const profileReducer = (state: InitialStateType = initialState, action: ProfileReducer) => {
  switch (action.type) {
    case 'profile/CHANGE-NAME':
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
    dispatch(setAppStatusAC('loading'))
    const user = getState().app.user
    const model = {
      name: user.name,
      ...userModel,
    }

    authAPI
      .updateUser(model)
      .then(res => {
        // console.log(res.data.updatedUser.name)
        dispatch(setUserAC(res.data.updatedUser))
        dispatch(setAppStatusAC('succeeded'))
      })
      .catch(() => {})
  }

export const logOutTC = () => async (dispatch: AppThunkDispatch) => {
  dispatch(setAppStatusAC('loading'))
  try {
    await authAPI.logOut()

    dispatch(setIsLoggedInAC(false))
    dispatch(setAppStatusAC('succeeded'))
  } catch (err) {
    console.log(err)
  }
}
export const changeNameAC = (name: string) => ({ type: 'profile/CHANGE-NAME', name } as const)
export type ProfileReducer = ReturnType<typeof changeNameAC>
