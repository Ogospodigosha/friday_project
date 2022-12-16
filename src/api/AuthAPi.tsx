import axios from 'axios'

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
  forgotPassword(email: string) {
    return axios.post('https://neko-back.herokuapp.com/2.0/auth/forgot', {
      email,
      from: programmerEmail,
      message,
    })
  },
  logOut() {
    return instance.delete('auth/me')
  },
  createPassword(data: createPasswordDataType) {
    return axios.post('https://neko-back.herokuapp.com/2.0/auth/set-new-password/', data)
  },
}

const programmerEmail = 'test-front-admin <odintsovis@hotmail.com>'
const message = `<div style="background-color: lime; padding: 15px">
password recovery link: 
<a href='https://ogospodigosha.github.io/createNewPassword/$token$'>
link</a>
</div>`

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
  created: string
  updated: string
  __v: number
  token: string
  tokenDeathTime: string
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
export type createPasswordDataType = {
  password: string
  resetPasswordToken: string
}
