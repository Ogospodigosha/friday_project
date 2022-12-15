import React, { useEffect } from 'react'

import './App.css'
import { CircularProgress } from '@mui/material'

import { ErrorSnackbar } from '../components/ErrorSnackbar'
import { Header } from '../components/header/Header'
import { Pages } from '../components/pages/Pages'

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
      <Pages />
    </div>
  )
}

export default App
