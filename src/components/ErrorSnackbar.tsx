import { forwardRef, SyntheticEvent } from 'react'

import MuiAlert, { AlertProps } from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import { useDispatch } from 'react-redux'

import { setAppErrorAC } from '../app/appReducer'
import { useAppSelector } from '../utils/hooks/useAppSelector'

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export function ErrorSnackbar() {
  const dispatch = useDispatch()
  const error = useAppSelector(state => state.app.error)

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
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
