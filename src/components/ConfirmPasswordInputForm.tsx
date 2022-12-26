import React, { useState } from 'react'

import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import { useField } from 'formik'

import { RequestStatusType } from '../app/appReducer'
import s from '../features/auth/registration/Registration.module.css'

type ConfirmPasswordInputFormType = {
  label: string
  name: string
  IsLoading: RequestStatusType
}
export const ConfirmPasswordInputForm: React.FC<ConfirmPasswordInputFormType> = ({
  label,
  name,
  IsLoading,
}) => {
  const [field, meta] = useField(name)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  return (
    <>
      <TextField
        className={s.field}
        label={'Confirm Password'}
        variant={'standard'}
        margin={'normal'}
        type={showConfirmPassword ? 'text' : 'password'}
        disabled={IsLoading === 'loading'}
        InputProps={{
          endAdornment: (
            <InputAdornment position={'end'}>
              <IconButton
                aria-label="toggle confirm password visibility"
                onClick={handleClickShowConfirmPassword}
                edge="start"
                className={s.iconStyle}
              >
                {showConfirmPassword ? (
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
      {meta.touched && meta.error ? <div className={s.error}>{meta.error}</div> : null}
    </>
  )
}
