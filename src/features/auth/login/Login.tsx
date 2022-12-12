import React from 'react'

import { Box, Grid } from '@mui/material'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import { useFormik } from 'formik'
import { Navigate, NavLink } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/store'

import { logInTC } from './login-reducer'

type FormikErrorType = {
  email?: string
  password?: string
  rememberMe?: boolean
}
export const Login = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validate: values => {
      const errors: FormikErrorType = {}

      if (!values.email) {
        errors.email = 'Required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }
      if (!values.password) {
        errors.password = 'Required'
      } else if (values.password.length < 7) {
        errors.password = 'Password must be more than 7 characters...'
      }

      return errors
    },
    onSubmit: values => {
      console.log(values)
      dispatch(logInTC(values))
    },
  })

  if (isLoggedIn) {
    return <Navigate to={'/profile'} />
  }

  return (
    <Grid container justifyContent={'center'}>
      <Grid item justifyContent={'center'}>
        <form onSubmit={formik.handleSubmit}>
          <Box
            sx={{
              padding: '33px',
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'white',
              boxShadow: '',
              width: '413px',
            }}
          >
            <FormLabel>
              <h1>Sing in</h1>
            </FormLabel>
            <TextField
              label="Email"
              margin="normal"
              variant="standard"
              {...formik.getFieldProps('email')}
            />
            {formik.touched.email && formik.errors.email && <div>{formik.errors.email}</div>}
            <TextField
              type="password"
              label="Password"
              margin="normal"
              variant="standard"
              {...formik.getFieldProps('password')}
            />
            {formik.touched.password && formik.errors.password && (
              <div>{formik.errors.password}</div>
            )}
            <FormControlLabel
              label={'Remember me'}
              {...formik.getFieldProps('rememberMe')}
              control={<Checkbox />}
            />
            <NavLink to={'/password_recovery'}>Forgot Password?</NavLink>
            <Button type={'submit'} variant={'contained'} color={'primary'}>
              Sign In
            </Button>
            <p>Already have an account?</p>
            <NavLink to={'/registration'}>Sign Up</NavLink>
          </Box>
        </form>
      </Grid>
    </Grid>
  )
}
