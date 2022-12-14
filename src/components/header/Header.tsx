import React from 'react'

import { NavLink } from 'react-router-dom'

import logo from './assets/logo.svg'
import styles from './Header.module.css'

export const Header = () => {
  // need logic
  const isLoginIn = false

  return (
    <header className={styles.container}>
      <NavLink to={'/'}>
        <img src={logo} alt={'logo'} />
      </NavLink>
      {!isLoginIn ? (
        <NavLink to={'/login'} className={styles.btn}>
          Sign in
        </NavLink>
      ) : (
        <NavLink to={'/profile'} className={styles.userInfo}>
          <span className={styles.userName}>name</span>
          <img
            src={'https://s.afisha.ru/mediastorage/55/6b/d5504693e0334526a68317f56b55.jpg'}
            alt="ava"
            className={styles.userAva}
          />
        </NavLink>
      )}
    </header>
  )
}
