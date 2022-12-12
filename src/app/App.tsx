import React from 'react'

import './App.css'
import { ErrorSnackbar } from '../components/ErrorSnackbar'
import { Header } from '../components/header/Header'
import { LoadingButtonsTransition } from '../components/LoadingButtonsTransition'
import { Pages } from '../components/pages/Pages'
import { Registration } from '../features/auth/registration/Registration'

function App() {
  return (
    <div>
      <ErrorSnackbar />
      <Header />
      <Pages />
    </div>
  )
}

export default App
