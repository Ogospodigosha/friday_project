import React, { useState } from 'react'

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { Button, FormGroup, IconButton, InputAdornment, TextField } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import { useFormik } from 'formik'
import { Navigate, NavLink } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/store'

import styles from './Login.module.css'
import { logInTC } from './loginReducer'

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
    <div className={styles.wrapper}>
      <div className={styles.page}>
        <h1 className={styles.h1}>Sing in</h1>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <div>
              <TextField
                className={styles.field}
                label={'Email'}
                variant={'standard'}
                margin={'normal'}
                {...formik.getFieldProps('email')}
              />
              {formik.touched.email && formik.errors.email && (
                <div className={styles.error}>{formik.errors.email}</div>
              )}
            </div>
            <div>
              <TextField
                className={styles.field}
                label={'Password'}
                variant={'standard'}
                margin={'normal'}
                type={showPassword ? 'text' : 'password'}
                {...formik.getFieldProps('password')}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position={'end'}>
                      <IconButton onClick={handleClickShowPassword} edge="start">
                        {showPassword ? (
                          <VisibilityOff fontSize={'medium'} />
                        ) : (
                          <Visibility fontSize={'medium'} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {formik.touched.password && formik.errors.password && (
                <div className={styles.error}>{formik.errors.password}</div>
              )}
            </div>
            <div className={styles.container}>
              <FormControlLabel
                label={'Remember me'}
                sx={{ left: '0' }}
                {...formik.getFieldProps('rememberMe')}
                control={<Checkbox />}
              />
            </div>
            <NavLink to={'/forgot_password'} className={styles.passRecovery}>
              Forgot Password?
            </NavLink>
            <div className={styles.submitButton}>
              <Button type={'submit'} variant="contained">
                Sign In
              </Button>
            </div>
          </FormGroup>
          <p className={styles.question}>Have no account?</p>
          <NavLink to={'/registration'} className={styles.link}>
            Sign Up
          </NavLink>
        </form>
      </div>
    </div>
  )
}

// types

type FormikErrorT = {
  email?: string
  password?: string
  rememberMe?: boolean
}
