import { TLoginData } from '../features/auth/login/login-api'
import { ProfileType, UpdateProfileModelType } from '../features/auth/profile/profileApi'

import { instance } from './instance'

export const authAPI = {
  registration(email: string, password: string) {
    return instance.post<RegistrationResponseType>('auth/register', { email, password })
  },
  me() {
    return instance.post<MeResponseType>('auth/me')
  },
  login(data: TLoginData) {
    return instance.post<TLoginData, { data: ProfileType }>(`auth/login`, data)
  },
  updateUser(data: UpdateProfileModelType) {
    return instance.put('auth/me', data)
  },
  logOut() {
    return instance.delete('auth/me')
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
