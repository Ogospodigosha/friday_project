import React from 'react'

import { FormGroup } from '@mui/material'
import { Form, Formik } from 'formik'
import { useSelector } from 'react-redux'
import { Navigate, NavLink } from 'react-router-dom'

import { RequestStatusType } from '../../../app/appReducer'
import { AppRootStateType, useAppDispatch } from '../../../app/store'
import { ConfirmPasswordInputForm } from '../../../components/ConfirmPasswordInputForm'
import { EmailInputForm } from '../../../components/EmailInputForm'
import { LoadingButtonForm } from '../../../components/LoadingButtonForm'
import { PasswordInputForm } from '../../../components/PasswordInputForm'

import { RegistrationTC } from './registration-reducer'
import s from './registration.module.css'
import { validateRegistrationForm } from './validateRegistrationForm'

export const Registration = () => {
  const dispatch = useAppDispatch()
  const IsLoading = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
  const IsRegistrated = useSelector<AppRootStateType, boolean>(
    state => state.registration.IsRegistrated
  )

  const registerInitValues = { email: '', password: '', confirmPassword: '' }

  if (IsRegistrated) {
    return <Navigate to={'/login'} />
  }

  return (
    <div className={s.main}>
      <div className={s.register}>
        <h1 style={{ color: 'black' }} className={s.h1}>
          Sign Up
        </h1>
        <Formik
          initialValues={registerInitValues}
          validate={validateRegistrationForm}
          onSubmit={(values, actions) => {
            if (values.email && values.password)
              dispatch(RegistrationTC(values.email, values.password))
            actions.resetForm()
          }}
        >
          <Form>
            <FormGroup>
              <div style={{ position: 'relative' }}>
                <EmailInputForm name={'email'} label="email" IsLoading={IsLoading} />
              </div>
              <div style={{ position: 'relative' }}>
                <PasswordInputForm name={'password'} label={'password'} IsLoading={IsLoading} />
              </div>
              <div style={{ position: 'relative' }}>
                <ConfirmPasswordInputForm
                  label={'Confirm Password'}
                  name={'confirmPassword'}
                  IsLoading={IsLoading}
                />
              </div>
              <div className={s.submitButton}>
                <LoadingButtonForm IsLoading={IsLoading} />
              </div>
            </FormGroup>
            <div className={s.question}>Already have an account?</div>
            <NavLink to={'/login'} className={s.link}>
              Sign in
            </NavLink>
          </Form>
        </Formik>
      </div>
    </div>
  )
}
