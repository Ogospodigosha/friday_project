import React from 'react'

import { NavLink } from 'react-router-dom'

import { useAppDispatch } from '../../../app/store'

import styles from './ForgotPassword.module.css'
import { forgotPassTC } from './forgotPasswordRedcer'

export const ForgotPassword = () => {
  const dispatch = useAppDispatch()
  const onClickHandler = () => {
    dispatch(forgotPassTC('klrotex11@gmail.com'))
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.page}>
        <h1 className={styles.h1}>Forgot your password?</h1>
        <div>
          form
          <div>email span</div>
          <p className={styles.help}>
            Enter your email address and we will send you further instructions
          </p>
          <div>universal submit button</div>
        </div>
        <p className={styles.question}>Did you remember your password?</p>
        <button onClick={onClickHandler}>CLICK</button>
        <NavLink to={'/login'} className={styles.link}>
          Try logging in
        </NavLink>
      </div>
    </div>
  )
}
