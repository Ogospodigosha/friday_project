import React, { useState } from 'react'

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {
  Box,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from '@mui/material'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import { useFormik } from 'formik'
import { Navigate, NavLink } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/store'

import { logInTC } from './login-reducer'

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validate: values => {
      const errors: FormikErrorT = {}

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

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

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
              backgroundColor: 'pink',
              boxShadow: '',
              width: '40ch',
            }}
          >
            <h1>Sing in</h1>
            <FormControl sx={{ m: 1, width: '35ch' }} variant="standard">
              <InputLabel>Email</InputLabel>
              <Input {...formik.getFieldProps('email')} />
            </FormControl>
            {formik.touched.email && formik.errors.email && <div>{formik.errors.email}</div>}
            {/*<TextField*/}
            {/*  type={showPassword ? 'text' : 'password'}*/}
            {/*  label="Password"*/}
            {/*  margin="normal"*/}
            {/*  variant="standard"*/}
            {/*  {...formik.getFieldProps('password')}*/}
            {/*/>*/}
            <FormControl sx={{ m: 1, width: '35ch' }} variant="standard">
              <InputLabel>Password</InputLabel>
              <Input
                type={showPassword ? 'text' : 'password'}
                {...formik.getFieldProps('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
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

// types

type FormikErrorT = {
  email?: string
  password?: string
  rememberMe?: boolean
}
