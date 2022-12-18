import React, { useEffect, useState } from 'react'

import Avatar from '@mui/material/Avatar'
import Fab from '@mui/material/Fab'
import { NavLink, useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/store'
import arrow from '../../../assets/icons/arrowback.svg'
import logOut from '../../../assets/icons/logout.svg'
import ava from '../../../assets/img/avatarFish.png'
import SuperEditableSpan from '../../../components/common/SuperEditableSpan/SuperEditableSpan'
import { PATH } from '../../../components/pages/Pages'

import style from './Profile.module.css'
import { ProfileType } from './profileApi'
import { logOutTC, updateProfileTC } from './profileReducer'

export const Profile = () => {
  const user = useAppSelector<ProfileType>(state => state.app.user)
  const avatar = useAppSelector(state => state.app.user.avatar)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector<boolean>(state => state.login.isLoggedIn)
  const [text, setText] = useState(user.name)
  const updateTitleHandler = (name: string) => {
    setText(name)
  }

  const logOutHandler = () => {
    dispatch(logOutTC())
  }
  const sendTextHandler = () => {
    dispatch(updateProfileTC({ name: text }))
  }

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(PATH.LOGIN)
    }
  }, [isLoggedIn])

  return (
    <>
      <div className={style.backPackList} onClick={() => navigate(PATH.CARDS)}>
        <img src={arrow} alt="arrow" />
        <NavLink to={PATH.PACKS}>Back to Pack List</NavLink>
      </div>
      <div className={style.main}>
        <div className={style.title}>Personal Information</div>
        <div className={style.avatar}>
          <Avatar alt="your ava" src={avatar || ava} sx={{ width: 96, height: 96 }} />
        </div>
        <div className={style.editSpan}>
          <SuperEditableSpan
            value={text}
            onChangeText={updateTitleHandler}
            sendText={sendTextHandler}
          />
        </div>
        <div className={style.email}>{user.email}</div>
        <div className={style.logOut}>
          <Fab
            sx={{ background: '#FCFCFC' }}
            variant="extended"
            size="medium"
            onClick={logOutHandler}
          >
            <span>
              <img src={logOut} alt="logout1" />
            </span>
            <span className={style.logoutSpan}>
              Log <span>out</span>
            </span>
          </Fab>
        </div>
      </div>
    </>
  )
}
