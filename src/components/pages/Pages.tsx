import React from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'

import { CheckEmail } from '../../features/auth/checkEmail/CheckEmail'
import { CreateNewPassword } from '../../features/auth/createNewPassword/CreateNewPassword'
import { ForgotPassword } from '../../features/auth/forgotPassword/ForgotPassword'
import { Login } from '../../features/auth/login/Login'
import { Profile } from '../../features/auth/profile/Profile'
import { Registration } from '../../features/auth/registration/Registration'
import { Packs } from '../../features/cards/packs/Packs'

import { Error404 } from './error404/Error404'

export const PATH = {
  LOGIN: '/login',
  PROFILE: '/profile',
  FORGOT_PASSWORD: '/forgot_password',
  CREATE_NEW_PASSWORD: '/createNewPassword/',
  REGISTRATION: '/registration',
  CHECK_EMAIL: '/check_email',
  PACKS: '/packs',
}
export const Pages = () => {
  return (
    <Routes>
      <Route path={'/'} element={<Navigate to={'/profile'} />} />
      <Route path={PATH.LOGIN} element={<Login />} />
      <Route path={PATH.REGISTRATION} element={<Registration />} />
      <Route path={PATH.PROFILE} element={<Profile />} />
      <Route path={PATH.FORGOT_PASSWORD} element={<ForgotPassword />} />
      <Route path={PATH.PACKS} element={<Packs />} />
      <Route path={PATH.CREATE_NEW_PASSWORD} element={<CreateNewPassword />}>
        <Route path=":token" element={<CreateNewPassword />} />
      </Route>
      <Route path={'*'} element={<Error404 />} />
      <Route path={PATH.CHECK_EMAIL} element={<CheckEmail />} />
    </Routes>
  )
}
