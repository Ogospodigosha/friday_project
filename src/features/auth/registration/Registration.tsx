import React, { useState } from 'react'

import { RemoveRedEye, Visibility, VisibilityOff } from '@mui/icons-material'
import {
  Button,
  FormControl,
  FormGroup,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, NavLink, Route } from 'react-router-dom'

import { AppRootStateType, useAppDispatch } from '../../../app/store'
import { LoadingButtonsTransition } from '../../../components/LoadingButtonsTransition'

import { RegistrationTC } from './registration-reducer'
import s from './registration.module.css'

type FormikErrorType = {
  email?: string
  password?: string
  confirmPassword?: string
}
export const Registration = () => {
  const dispatch = useAppDispatch()

  const IsRegistrated = useSelector<AppRootStateType, boolean>(
    state => state.registration.IsRegistrated
  )

  const [values, setValues] = React.useState({
    showPassword: false,
    showConfirmPassword: false,
  })
  const handleClickShowPassword = () => {
    setValues({
      ...values,

      showPassword: !values.showPassword,
    })
  }
  const handleClickShowConfirmPassword = () => {
    setValues({
      ...values,
      showConfirmPassword: !values.showConfirmPassword,
    })
  }
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    // event.preventDefault()
  }
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: values => {
      const errors: FormikErrorType = {}

      if (!values.password) {
        errors.password = 'Required'
      } else if (values.password.length < 8) {
        errors.password = 'Password must be more than 7 characters'
      }
      if (!values.confirmPassword) {
        errors.confirmPassword = 'Required'
      } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'passwords must match'
      }
      if (!values.email) {
        errors.email = 'Required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))
        errors.email = 'Invalid email address'

      return errors
    },
    onSubmit: values => {
      dispatch(RegistrationTC(values.email, values.password))
      formik.resetForm()
    },
  })

  if (IsRegistrated) {
    return <Navigate to={'/login'} />
  }
  console.log(formik.values)

  return (
    <div className={s.main}>
      <div className={s.register}>
        <h1 style={{ color: 'black' }} className={s.h1}>
          Sign Up
        </h1>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <div style={{ position: 'relative' }}>
              <TextField
                className={s.field}
                label={'Email'}
                variant={'standard'}
                margin={'normal'}
                name={'email'}
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className={s.error}>{formik.errors.email}</div>
              ) : null}
            </div>
            <div style={{ position: 'relative' }}>
              <TextField
                className={s.field}
                label={'Password'}
                type={values.showPassword ? 'text' : 'password'}
                variant={'standard'}
                margin={'normal'}
                name={'password'}
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position={'end'}>
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="start"
                        className={s.iconStyle}
                      >
                        {values.showPassword ? (
                          <VisibilityOff fontSize={'medium'} />
                        ) : (
                          <Visibility fontSize={'medium'} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {formik.values.password !== '' ||
              (formik.touched.password && formik.errors.password) ? (
                <div className={s.error}>{formik.errors.password}</div>
              ) : null}
            </div>
            <div style={{ position: 'relative' }}>
              <TextField
                className={s.field}
                label={'Confirm Password'}
                variant={'standard'}
                margin={'normal'}
                type={values.showConfirmPassword ? 'text' : 'password'}
                name={'confirmPassword'}
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
                onBlur={formik.handleBlur}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position={'end'}>
                      <IconButton
                        aria-label="toggle confirm password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="start"
                        className={s.iconStyle}
                      >
                        {values.showConfirmPassword ? (
                          <VisibilityOff fontSize={'medium'} />
                        ) : (
                          <Visibility fontSize={'medium'} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                <div className={s.error}>{formik.errors.confirmPassword}</div>
              ) : null}
            </div>
            <div className={s.submitButton}>
              {/*<Button*/}
              {/*  type={'submit'}*/}
              {/*  className={s.button}*/}
              {/*  style={{ borderRadius: '30px' }}*/}
              {/*  variant={'contained'}*/}
              {/*>*/}
              <LoadingButtonsTransition />
              {/*<span>Sign Up</span>*/}
              {/*</Button>*/}
            </div>
          </FormGroup>
          <div className={s.question}>Already have an account?</div>
          <NavLink to={'/login'} className={s.link}>
            Sign in
          </NavLink>
        </form>
      </div>
    </div>
  )
}
