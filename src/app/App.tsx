import React, { useEffect } from 'react'

import './App.css'
import { CircularProgress } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import { ErrorSnackbar } from '../components/ErrorSnackbar'
import { Header } from '../components/header/Header'
import { LoadingButtonsTransition } from '../components/LoadingButtonsTransition'
import { Pages } from '../components/pages/Pages'
import { Registration } from '../features/auth/registration/Registration'

import { authMeTC } from './appReducer'
import { AppRootStateType, useAppDispatch } from './store'

function App() {
  const dispatch = useAppDispatch()
  const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)

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
      <Pages />
    </div>
  )
}

export default App
