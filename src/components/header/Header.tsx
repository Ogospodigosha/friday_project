import React from 'react'

import { NavLink } from 'react-router-dom'

import defaultAva from '../../assets/img/avatarFish.png'
import { useAppSelector } from '../../utils/hooks/useAppSelector'

import logo from './assets/logo.svg'
import styles from './Header.module.css'

export const Header = () => {
  const isLoginIn = useAppSelector(state => state.auth.isLoggedIn)
  const name = useAppSelector(state => state.app.user.name)
  const ava = useAppSelector(state => state.app.user.avatar)

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
          <span className={styles.userName}>{name}</span>
          <img src={ava || defaultAva} alt="ava" className={styles.userAva} />
        </NavLink>
      )}
    </header>
  )
}
