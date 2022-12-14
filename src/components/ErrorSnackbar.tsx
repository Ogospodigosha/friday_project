import React, { useState } from 'react'

import MuiAlert, { AlertProps } from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import { useDispatch, useSelector } from 'react-redux'

import { RequestErrorType, setAppErrorAC } from '../app/appReducer'
import { AppRootStateType } from '../app/store'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export function ErrorSnackbar() {
  const dispatch = useDispatch()
  const error = useSelector<AppRootStateType, RequestErrorType>(state => state.app.error)

  console.log(error)
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(setAppErrorAC(null))
  }

  return (
    <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {error}
      </Alert>
    </Snackbar>
  )
}
