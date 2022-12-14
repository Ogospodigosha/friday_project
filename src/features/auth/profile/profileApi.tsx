import { instance } from './instance'

export const profileApi = {
  me() {
    return instance.post<ProfileType>('auth/me')
  },
  changeUserName(data: UpdateProfileModelType) {
    return instance.put<UpdateProfileType>('auth/me', data)
  },
}

export type ProfileType = {
  _id: string
  created: string
  email: string
  name: string
  publicCardPacksCount: number
  avatar: string
}

export type UpdateProfileModelType = {
  name: string
  // avatar: string
}

type UpdateProfileType = {
  updatedUser: ProfileType
}
