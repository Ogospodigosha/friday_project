import axios from 'axios'

import { instance } from './instance'
import { message, programmerEmail } from './message'

export const authAPI = {
  login(data: LoginDataType) {
    return instance.post<ProfileType>(`auth/login`, data)
  },
  registration(email: string, password: string) {
    return instance.post<{ addedUser: ProfileType }>('auth/register', { email, password })
  },
  me() {
    return instance.post<ProfileType>('auth/me')
  },
  updateUser(data: UpdateProfileModelType) {
    return instance.put<{ updatedUser: ProfileType }>('auth/me', data)
  },
  logOut() {
    return instance.delete('auth/me')
  },
  forgotPassword(email: string) {
    return axios.post('https://neko-back.herokuapp.com/2.0/auth/forgot', {
      email,
      from: programmerEmail,
      message,
    })
  },
  createPassword(data: CreatePasswordDataType) {
    return axios.post('https://neko-back.herokuapp.com/2.0/auth/set-new-password/', data)
  },
}

//types
export type LoginDataType = {
  email: string
  password: string
  rememberMe?: boolean
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
export type CreatePasswordDataType = {
  password: string
  resetPasswordToken: string
}
