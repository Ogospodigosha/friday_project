import React from 'react'

import { TextField } from '@mui/material'
import { useFormik } from 'formik'
import { Navigate, NavLink } from 'react-router-dom'

import { LoadingButtonForm } from '../../../components/LoadingButtonForm'
import { PATH } from '../../../components/pages/Pages'
import { useAppDispatch } from '../../../utils/hooks/useAppDispatch'
import { useAppSelector } from '../../../utils/hooks/useAppSelector'
import { forgotPassTC } from '../authReducer'
import { FormikErrorType } from '../registration/validateRegistrationForm'

import s from './ForgotPassword.module.css'

export const ForgotPassword = () => {
  const dispatch = useAppDispatch()
  const appStatus = useAppSelector(state => state.app.status)
  const isSent = useAppSelector(state => state.auth.isSent)
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validate: values => {
      const errors: FormikErrorType = {}

      if (!values.email) {
        errors.email = 'Required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }

      return errors
    },
    onSubmit: values => {
      dispatch(forgotPassTC(values.email))
    },
  })

  if (isSent) {
    return <Navigate to={PATH.CHECK_EMAIL} />
  }

  return (
    <div className={s.wrapper}>
      <div className={s.page}>
        <h1 className={s.h1}>Forgot your password?</h1>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <TextField
              className={s.field}
              label={'Email'}
              variant={'standard'}
              margin={'normal'}
              disabled={appStatus === 'loading'}
              {...formik.getFieldProps('email')}
            />
            {formik.touched.email && formik.errors.email && (
              <div className={s.error}>{formik.errors.email}</div>
            )}
          </div>
          <p className={s.help}>
            Enter your email address and we will send you further instructions
          </p>
          <LoadingButtonForm IsLoading={appStatus} title={'Send Instructions'} />
        </form>
        <p className={s.question}>Did you remember your password?</p>
        <NavLink to={'/login'} className={s.link}>
          Try logging in
        </NavLink>
      </div>
    </div>
  )
}
