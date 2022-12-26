import { useEffect } from 'react'

import './App.css'
import { CircularProgress } from '@mui/material'

import { ErrorSnackbar } from '../components/ErrorSnackbar'
import { Header } from '../components/header/Header'
import { Pages } from '../components/pages/Pages'
import { useAppDispatch } from '../utils/hooks/useAppDispatch'
import { useAppSelector } from '../utils/hooks/useAppSelector'

import { authMeTC } from './appReducer'

function App() {
  const dispatch = useAppDispatch()
  const isInitialized = useAppSelector(state => state.app.isInitialized)

  useEffect(() => {
    dispatch(authMeTC())
  }, [dispatch])

  if (!isInitialized) {
    return (
      <div style={{ position: 'fixed', top: '40%', left: '50%' }}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <div className={'App'}>
      <ErrorSnackbar />
      <Header />
      <div className={'container'}>
        <Pages />
      </div>
    </div>
  )
}

export default App
