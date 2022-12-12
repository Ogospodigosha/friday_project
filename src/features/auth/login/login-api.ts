import { instance } from '../../../api/instance'

export const loginApi = {
  login(data: TLoginData) {
    return instance.post<TLoginData, TAuthResponseType>(`auth/login`, data)
  },
}

//types
export type TLoginData = {
  email: string
  password: string
  rememberMe?: boolean
}

export type TAuthResponseType = {
  _id: string
  email: string
  name: string
  avatar?: string
  publicCardPacksCount: number
  // количество колод

  created: Date
  updated: Date
  isAdmin: boolean
  verified: boolean // подтвердил ли почту
  rememberMe: boolean

  error?: string
}
