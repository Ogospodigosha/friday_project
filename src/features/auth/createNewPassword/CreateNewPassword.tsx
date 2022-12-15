import React, { ChangeEvent, useState } from 'react'

import { useParams } from 'react-router-dom'

import { useAppDispatch } from '../../../app/store'

import { createNewPasswordTC } from './createNewPasswordTC'

export const CreateNewPassword = () => {
  const dispatch = useAppDispatch()
  const { token } = useParams()
  const [inputText, setInputText] = useState('')
  const onClickHandler = () => {
    if (token) {
      dispatch(createNewPasswordTC({ password: inputText, resetPasswordToken: token }))
    }
  }
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.currentTarget.value)
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      {inputText}
      <input
        style={{ background: 'yellow' }}
        onChange={onChangeHandler}
        value={inputText}
        type={'password'}
      />
      <button onClick={onClickHandler}>send password</button>
    </div>
  )
}
