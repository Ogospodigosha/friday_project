import React from 'react'

import { Form, Formik } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'

import { LoadingButtonForm } from '../../../components/LoadingButtonForm'
import { PATH } from '../../../components/pages/Pages'
import { PasswordInputForm } from '../../../components/PasswordInputForm'
import { useAppDispatch } from '../../../utils/hooks/useAppDispatch'
import { useAppSelector } from '../../../utils/hooks/useAppSelector'
import { createNewPasswordTC } from '../authReducer'
import s from '../registration/Registration.module.css'

import style from './CreateNewPassword.module.css'
import { validateNewPasswordForm } from './validateNewPasswordForm'

export const CreateNewPassword = () => {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(state => state.app.status)
  const passwordChanged = useAppSelector(state => state.auth.isPasswordChanged)
  const navigate = useNavigate()
  const { token } = useParams()

  const newPasswordInitValues = { password: '' }

  if (passwordChanged) {
    navigate(PATH.LOGIN)
  }

  return (
    <div className={style.main}>
      <div className={style.newPassword}>
        <h1 className={style.passHeader}>Create new password</h1>
        <Formik
          initialValues={newPasswordInitValues}
          validate={validateNewPasswordForm}
          onSubmit={(values, actions) => {
            if (values.password && token)
              dispatch(
                createNewPasswordTC({ password: values.password, resetPasswordToken: token })
              )
            actions.resetForm()
          }}
        >
          <Form>
            <div style={{ position: 'relative', marginBottom: '18px' }}>
              <PasswordInputForm name={'password'} label={'password'} IsLoading={isLoading} />
            </div>
            <div className={style.description}>
              Create new password and we will send you further instructions to email
            </div>
            <div className={s.submitButton}>
              <LoadingButtonForm IsLoading={isLoading} title={'create new password'} />
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  )
}
