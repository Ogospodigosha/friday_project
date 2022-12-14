import React from 'react'

import { FormGroup } from '@mui/material'
import { Form, Formik } from 'formik'
import { Navigate, NavLink } from 'react-router-dom'

import { ConfirmPasswordInputForm } from '../../../components/ConfirmPasswordInputForm'
import { EmailInputForm } from '../../../components/EmailInputForm'
import { LoadingButtonForm } from '../../../components/LoadingButtonForm'
import { PATH } from '../../../components/pages/Pages'
import { PasswordInputForm } from '../../../components/PasswordInputForm'
import { useAppDispatch } from '../../../utils/hooks/useAppDispatch'
import { useAppSelector } from '../../../utils/hooks/useAppSelector'
import { registrationTC } from '../authReducer'

import s from './Registration.module.css'
import { validateRegistrationForm } from './validateRegistrationForm'

export const Registration = () => {
  const dispatch = useAppDispatch()
  const IsLoading = useAppSelector(state => state.app.status)
  const isRegistered = useAppSelector(state => state.auth.isRegistered)

  const registerInitValues = { email: '', password: '', confirmPassword: '' }

  if (isRegistered) {
    return <Navigate to={PATH.LOGIN} />
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
              dispatch(registrationTC(values.email, values.password))
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
                <LoadingButtonForm IsLoading={IsLoading} title={'Sign Up'} />
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
