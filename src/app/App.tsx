import React, { useEffect } from 'react'

import './App.css'
import { CircularProgress } from '@mui/material'
import { Navigate, Route, Routes } from 'react-router-dom'

import { ErrorSnackbar } from '../components/ErrorSnackbar'
import { Header } from '../components/header/Header'
import { Error404 } from '../components/pages/error404/Error404'
import { Login } from '../features/auth/login/Login'
import { PasswordRecovery } from '../features/auth/password recovery/PasswordRecovery'
import { Profile } from '../features/auth/profile/Profile'
import { Registration } from '../features/auth/registration/Registration'

import { authMeTC } from './appReducer'
import { useAppDispatch, useAppSelector } from './store'

function App() {
  const dispatch = useAppDispatch()
  const isInitialized = useAppSelector(state => state.app.isInitialized)

  useEffect(() => {
    dispatch(authMeTC())
  }, [])

  if (!isInitialized) {
    return (
      <div style={{ position: 'fixed', top: '40%', left: '50%' }}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <div>
      <ErrorSnackbar />
      <Header />
      <Routes>
        <Route path={'/'} element={<Navigate to={'/profile'} />} />
        <Route path={'/login'} element={<Login />} />
        <Route path={'/registration'} element={<Registration />} />
        <Route path={'/profile'} element={<Profile />} />
        <Route path={'/password_recovery'} element={<PasswordRecovery />} />
        {/*<Route path={'/test'} element={<Test />} />*/}
        <Route path={'*'} element={<Error404 />} />
        {/*<Route path={'/help'} element={<TestForm />} />*/}
      </Routes>
    </div>
  )
}

export default App
