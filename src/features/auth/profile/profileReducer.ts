import { AppRootStateType, ThunkAppDispatchType } from '../../../app/store'

import { profileApi, UpdateProfileModelType } from './profileApi'

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

export const updateProfileTC =
  (profileModel: UpdateProfileModelType) =>
  async (dispatch: ThunkAppDispatchType, getState: () => AppRootStateType) => {
    const profile = getState().profile

    const profileApiModel: InitialStateType = {
      name: profile.name,
      email: profile.email,
      // ...profileModel,
    }

    try {
      const res = await profileApi.changeUserName(profileApiModel)

      dispatch(changeNameAC(res.data.updatedUser.name))
    } catch (err) {
      console.log(err)
    }
  }

export const changeNameAC = (name: string) => ({ type: 'profile/CHANGE-NAME', name } as const)
export type ProfileReducer = ReturnType<typeof changeNameAC>
