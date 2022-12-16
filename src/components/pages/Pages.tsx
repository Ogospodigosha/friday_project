import React from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'

import { CheckEmail } from '../../features/auth/checkEmail/CheckEmail'
import { CreateNewPassword } from '../../features/auth/createNewPassword/CreateNewPassword'
import { ForgotPassword } from '../../features/auth/forgotPassword/ForgotPassword'
import { Login } from '../../features/auth/login/Login'
import { Profile } from '../../features/auth/profile/Profile'
import { Registration } from '../../features/auth/registration/Registration'

// import { TestForm } from '../../features/auth/registration/TestForm'
import { Error404 } from './error404/Error404'

export const Pages = () => {
  return (
    <Routes>
      <Route path={'/'} element={<Navigate to={'/profile'} />} />
      <Route path={'/friday_project'} element={<Navigate to={'/profile'} />} />
      <Route path={'/login'} element={<Login />} />
      <Route path={'/registration'} element={<Registration />} />
      <Route path={'/profile'} element={<Profile />} />
      <Route path={'/forgot_password'} element={<ForgotPassword />} />
      <Route path={'/createNewPassword/:token'} element={<CreateNewPassword />} />
      {/*<Route path={'/create_new_password/*'} element={<Bla />} />*/}
      {/*<Route path={'/test'} element={<Test />} />*/}
      <Route path={'*'} element={<Error404 />} />
      <Route path={'/check_email'} element={<CheckEmail />} />
      {/*<Route path={'/help'} element={<TestForm />} />*/}
    </Routes>
  )
}
