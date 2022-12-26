import React from 'react'

import { TextField } from '@mui/material'
import { useFormik } from 'formik'
import { Navigate, NavLink } from 'react-router-dom'

import { LoadingButtonForm } from '../../../components/LoadingButtonForm'
import { PATH } from '../../../components/pages/Pages'
import { useAppDispatch } from '../../../utils/hooks/useAppDispatch'
import { useAppSelector } from '../../../utils/hooks/useAppSelector'
import { FormikErrorType } from '../registration/RegistrationTypes'

import styles from './ForgotPassword.module.css'
import { forgotPassTC } from './forgotPasswordReducer'

export const ForgotPassword = () => {
  const dispatch = useAppDispatch()
  const appStatus = useAppSelector(state => state.app.status)
  const send = useAppSelector(state => state.forgotPassword.send)
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

  if (send) {
    return <Navigate to={PATH.CHECK_EMAIL} />
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.page}>
        <h1 className={styles.h1}>Forgot your password?</h1>
        <form onSubmit={formik.handleSubmit}>
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
          <p className={styles.help}>
            Enter your email address and we will send you further instructions
          </p>
          <LoadingButtonForm IsLoading={appStatus} title={'Send Instructions'} />
        </form>
        <p className={styles.question}>Did you remember your password?</p>
        <NavLink to={'/login'} className={styles.link}>
          Try logging in
        </NavLink>
      </div>
    </div>
  )
}
