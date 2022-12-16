import React from 'react'

import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/store'
import checkEmail from '../../../assets/icons/checkEmail.svg'
import { setSendAC } from '../forgotPassword/forgotPasswordReducer'

import style from './checkEmail.module.css'

export const CheckEmail = () => {
  const dispatch = useAppDispatch()
  const email = useAppSelector<string>(state => state.forgotPassword.email)
  const navigate = useNavigate()
  const navigateToLogin = () => {
    dispatch(setSendAC(false))
    navigate('/login')
  }

  return (
    <div className={style.wrapper}>
      <div className={style.title}>Check Email</div>
      <img src={checkEmail} alt="letter" />
      <div className={style.body}>
        <div>We’ve sent an Email with instructions to</div>
        <div>{email}</div>
      </div>
      <div className={style.btn}>
        <Button
          variant="contained"
          onClick={navigateToLogin}
          sx={{
            textTransform: 'capitalize',
            background: '#366eff',
            borderRadius: '30px',
            width: '347px',
            height: '36px',
            fontWeight: '500',
            fontSize: '16px',
          }}
        >
          Back to login
        </Button>
      </div>
    </div>
  )
}
