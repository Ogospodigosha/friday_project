import React from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'

import { Login } from '../../features/auth/login/Login'
import { PasswordRecovery } from '../../features/auth/password recovery/PasswordRecovery'
import { Profile } from '../../features/auth/profile/Profile'
import { Registration } from '../../features/auth/registration/Registration'
import { TestForm } from '../../features/auth/registration/TestForm'

import { Error404 } from './error404/Error404'
import { Test } from './test/Test'

export const Pages = () => {
  return (
    <Routes>
      <Route path={'/'} element={<Navigate to={'/profile'} />} />
      <Route path={'/login'} element={<Login />} />
      <Route path={'/registration'} element={<Registration />} />
      <Route path={'/profile'} element={<Profile />} />
      <Route path={'/password_recovery'} element={<PasswordRecovery />} />
      <Route path={'/test'} element={<Test />} />
      <Route path={'/*'} element={<Error404 />} />
      <Route path={'/help'} element={<TestForm />} />
    </Routes>
  )
}
