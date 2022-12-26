import React, { useState } from 'react'

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { FormGroup, IconButton, InputAdornment, TextField } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import { useFormik } from 'formik'
import { Navigate, NavLink } from 'react-router-dom'

import { LoadingButtonForm } from '../../../components/LoadingButtonForm'
import { PATH } from '../../../components/pages/Pages'
import { useAppDispatch } from '../../../utils/hooks/useAppDispatch'
import { useAppSelector } from '../../../utils/hooks/useAppSelector'

import styles from './Login.module.css'
import { logInTC } from './loginReducer'

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
  const appStatus = useAppSelector(state => state.app.status)

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
      dispatch(logInTC(values))
    },
  })

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  if (isLoggedIn) {
    return <Navigate to={PATH.PROFILE} />
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
                disabled={appStatus === 'loading'}
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
                disabled={appStatus === 'loading'}
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
                disabled={appStatus === 'loading'}
                {...formik.getFieldProps('rememberMe')}
                control={<Checkbox />}
              />
            </div>
            <NavLink to={'/forgot_password'} className={styles.passRecovery}>
              Forgot Password?
            </NavLink>
            <div className={styles.submitButton}>
              <LoadingButtonForm IsLoading={appStatus} title={'Sign In'} />
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

type FormikErrorType = {
  email?: string
  password?: string
  rememberMe?: boolean
}
