import React from 'react'

import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'

import checkEmail from '../../../assets/icons/checkEmail.svg'
import { PATH } from '../../../components/pages/Pages'
import { useAppDispatch } from '../../../utils/hooks/useAppDispatch'
import { useAppSelector } from '../../../utils/hooks/useAppSelector'
import { setSentAC } from '../authReducer'

import s from './CheckEmail.module.css'

export const CheckEmail = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const email = useAppSelector(state => state.auth.email)
  const navigateToLogin = () => {
    dispatch(setSentAC(false))
    navigate(PATH.LOGIN)
  }

  return (
    <div className={s.wrapper}>
      <div className={s.title}>Check Email</div>
      <img src={checkEmail} alt="letter" />
      <div className={s.body}>
        <div>We’ve sent an Email with instructions to</div>
        <div>{email}</div>
      </div>
      <div className={s.btn}>
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
