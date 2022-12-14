import { instance } from '../../../api/instance'

export const profileApi = {
  me() {
    return instance.post<ProfileType>('auth/me')
  },
}

export type ProfileType = {
  _id: string
  created: string
  email: string
  name: string
  publicCardPacksCount: number
  avatar?: string
}

export type UpdateProfileModelType = {
  name?: string
  avatar?: string
}
