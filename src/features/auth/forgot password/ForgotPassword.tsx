import React from 'react'

import { NavLink } from 'react-router-dom'

import { authAPI } from '../../../api/AuthAPi'

import styles from './ForgotPassword.module.css'

export const ForgotPassword = () => {
  const onClickHandler = () => {
    authAPI.forgotPassword({
      email: 'klrotex11@gmail.com', // кому восстанавливать пароль
      from: 'test-front-admin <klrotex11@gmail.com>',
      // можно указать разработчика фронта)
      message: `<div style="background-color: lime; padding: 15px">
password recovery link: 
<a href='http://localhost:3000/create_new_password/$token$'>
link</a>
</div>`, // хтмп-письмо, вместо $token$ бэк вставит токен
    })
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
