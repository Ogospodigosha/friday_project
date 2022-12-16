import React from 'react'

import { TextField } from '@mui/material'
import { useField } from 'formik'

import { RequestStatusType } from '../app/appReducer'
import s from '../features/auth/registration/registration.module.css'

type EmailInputFormType = {
  label: string
  name: string
  IsLoading: RequestStatusType
}
export const EmailInputForm: React.FC<EmailInputFormType> = ({ label, name, IsLoading }) => {
  const [field, meta] = useField(name)

  return (
    <>
      <TextField
        className={s.field}
        label={label}
        variant={'standard'}
        margin={'normal'}
        disabled={IsLoading === 'loading'}
        {...field}
      />
      {meta.touched && meta.error ? <div className={s.error}>{meta.error}</div> : null}
    </>
  )
}
