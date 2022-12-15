import React, { useState } from 'react'

import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import { useField } from 'formik'

import { RequestStatusType } from '../../../app/appReducer'

import s from './registration.module.css'

type PasswordInputFormType = {
  label: string
  name: string
  IsLoading: RequestStatusType
}
export const PasswordInputForm: React.FC<PasswordInputFormType> = ({ label, name, IsLoading }) => {
  const [field, meta] = useField(name)

  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <>
      <TextField
        className={s.field}
        label={label}
        variant={'standard'}
        margin={'normal'}
        type={showPassword ? 'text' : 'password'}
        disabled={IsLoading === 'loading'}
        InputProps={{
          endAdornment: (
            <InputAdornment position={'end'}>
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="start"
                className={s.iconStyle}
              >
                {showPassword ? (
                  <VisibilityOff fontSize={'medium'} />
                ) : (
                  <Visibility fontSize={'medium'} />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
        {...field}
      />
      {meta.value !== '' || (meta.touched && meta.error) ? (
        <div className={s.error}>{meta.error}</div>
      ) : null}
    </>
  )
}
