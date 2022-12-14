import React from 'react'

import { Visibility, VisibilityOff } from '@mui/icons-material'
import { FormGroup, IconButton, InputAdornment, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import { Navigate, NavLink } from 'react-router-dom'

import { AppRootStateType, useAppDispatch } from '../../../app/store'
import { LoadingButtonTransition } from '../../../components/LoadingButtonTransition'

import { RegistrationTC } from './registration-reducer'
import s from './registration.module.css'
import { validateRegistrationForm } from './validateRegistrationForm'

export const Registration = () => {
  const dispatch = useAppDispatch()
  const IsLoading = useSelector<AppRootStateType, boolean>(state => state.registration.IsLoading)
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
    validate: validateRegistrationForm,
    onSubmit: values => {
      dispatch(RegistrationTC(values.email, values.password))
      formik.resetForm()
    },
  })

  if (IsRegistrated) {
    return <Navigate to={'/login'} />
  }

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
                disabled={IsLoading}
                {...formik.getFieldProps('email')}
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
                disabled={IsLoading}
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
                {...formik.getFieldProps('password')}
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
                disabled={IsLoading}
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
                {...formik.getFieldProps('confirmPassword')}
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                <div className={s.error}>{formik.errors.confirmPassword}</div>
              ) : null}
            </div>
            <div className={s.submitButton}>
              <LoadingButtonTransition />
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
