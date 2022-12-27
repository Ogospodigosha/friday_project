import React from 'react'

import { NavLink } from 'react-router-dom'

import logo from '../../assets/icons/logo.svg'
import defaultAva from '../../assets/img/avatarFish.png'
import { useAppSelector } from '../../utils/hooks/useAppSelector'

import s from './Header.module.css'

export const Header = () => {
  const isLoginIn = useAppSelector(state => state.auth.isLoggedIn)
  const name = useAppSelector(state => state.app.user.name)
  const ava = useAppSelector(state => state.app.user.avatar)

  return (
    <header className={s.container}>
      <NavLink to={'/'}>
        <img src={logo} alt={'logo'} />
      </NavLink>
      {!isLoginIn ? (
        <NavLink to={'/login'} className={s.btn}>
          Sign in
        </NavLink>
      ) : (
        <NavLink to={'/profile'} className={s.userInfo}>
          <span className={s.userName}>{name}</span>
          <img src={ava || defaultAva} alt="ava" className={s.userAva} />
        </NavLink>
      )}
    </header>
  )
}
