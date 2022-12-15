import { ProfileType, UpdateProfileModelType } from '../features/auth/profile/profileApi'

import { instance } from './instance'

export const authAPI = {
  registration(email: string, password: string) {
    return instance.post<RegistrationResponseType>('auth/register', { email, password })
  },
  me() {
    return instance.post('auth/me')
  },
  login(data: LoginDataType) {
    return instance.post<LoginDataType, { data: ProfileType }>(`auth/login`, data)
  },
  updateUser(data: UpdateProfileModelType) {
    return instance.put('auth/me', data)
  },
}
//types
type RegistrationResponseType = {
  addedUser: {
    _id: string
    email: string
    rememberMe: boolean
    isAdmin: boolean
    name: string
    verified: boolean
    publicCardPacksCount: number
    created: Date
    updated: Date
    __v: number
  }
}
type MeResponseType = {
  _id: string
  email: string
  rememberMe: boolean
  isAdmin: boolean
  name: string
  verified: boolean
  publicCardPacksCount: number
  created: Date
  updated: Date
  __v: number
  token: string
  tokenDeathTime: Date
  avatar: string
}
type UpdateProfileType = {
  updatedUser: ProfileType
}
export type LoginDataType = {
  email: string
  password: string
  rememberMe?: boolean
}
