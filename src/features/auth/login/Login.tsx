import React, { useState } from 'react'

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import { useFormik } from 'formik'
import { Navigate, NavLink } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/store'

import { logInTC } from './login-reducer'
import styles from './Login.module.css'

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
      <form onSubmit={formik.handleSubmit}>
        <div className={styles.wrapper}>
          <h1>Sing in</h1>
          <FormControl variant="standard" className={styles.inputWrapper}>
            <InputLabel>Email</InputLabel>
            <Input {...formik.getFieldProps('email')} />
            {formik.touched.email && formik.errors.email && (
              <div className={styles.error}>{formik.errors.email}</div>
            )}
          </FormControl>
          <FormControl variant="standard" className={styles.inputWrapper}>
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
            {formik.touched.password && formik.errors.password && (
              <div className={styles.error}>{formik.errors.password}</div>
            )}
          </FormControl>
          <FormControlLabel
            label={'Remember me'}
            {...formik.getFieldProps('rememberMe')}
            control={<Checkbox />}
            className={styles.checkBoxWrapper}
          />
          <NavLink to={'/password_recovery'} className={styles.passRecovery}>
            Forgot Password?
          </NavLink>
          <Button type={'submit'} variant="contained" className={styles.button}>
            Sign In
          </Button>
          <p className={styles.text}>Already have an account?</p>
          <NavLink to={'/registration'} className={styles.singUp}>
            Sign Up
          </NavLink>
        </div>
      </form>
    </Grid>
  )
}

// types

type FormikErrorT = {
  email?: string
  password?: string
  rememberMe?: boolean
}
