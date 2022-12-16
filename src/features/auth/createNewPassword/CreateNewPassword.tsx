import React from 'react'

import { Form, Formik } from 'formik'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { RequestStatusType } from '../../../app/appReducer'
import { AppRootStateType, useAppDispatch, useAppSelector } from '../../../app/store'
import { LoadingButtonForm } from '../../../components/LoadingButtonForm'
import { PasswordInputForm } from '../../../components/PasswordInputForm'
import s from '../registration/registration.module.css'

import style from './createNewPassword.module.css'
import { createNewPasswordTC } from './createNewPasswordTC'
import { validateNewPasswordForm } from './validateNewPasswordForm'

export const CreateNewPassword = () => {
  const dispatch = useAppDispatch()
  const { token } = useParams()
  const navigate = useNavigate()
  const IsLoading = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
  const newPasswordInitValues = { password: '' }
  const passwordChanged = useAppSelector<boolean>(state => state.createNewPassword.passwordChanged)

  if (passwordChanged) {
    navigate('/login')
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
              <PasswordInputForm name={'password'} label={'password'} IsLoading={IsLoading} />
            </div>
            <div className={style.description}>
              Create new password and we will send you further instructions to email
            </div>
            <div className={s.submitButton}>
              <LoadingButtonForm IsLoading={IsLoading} />
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  )
}
