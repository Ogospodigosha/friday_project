import React, { useEffect, useState } from 'react'

import Avatar from '@mui/material/Avatar'
import Fab from '@mui/material/Fab'
import { useNavigate } from 'react-router-dom'

import { ProfileType } from '../../../api/AuthAPi'
import logOut from '../../../assets/icons/logout.svg'
import ava from '../../../assets/img/avatarFish.png'
import { BackToPackList } from '../../../components/common/BackToPackList/BackToPackList'
import SuperEditableSpan from '../../../components/common/SuperEditableSpan/SuperEditableSpan'
import { PATH } from '../../../components/pages/Pages'
import { useAppDispatch } from '../../../utils/hooks/useAppDispatch'
import { useAppSelector } from '../../../utils/hooks/useAppSelector'
import { logOutTC, updateProfileTC } from '../authReducer'

import { InputFile } from './inputFile/InputFile'
import s from './Profile.module.css'

export const Profile = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector<ProfileType>(state => state.app.user)
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  const navigate = useNavigate()
  const [text, setText] = useState(user.name)
  // const [avatarImg, setAvatarImg] = useState<string | undefined>('')
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
      <BackToPackList />
      <div className={s.main}>
        <div className={s.title}>Personal Information</div>
        <div className={s.avatar}>
          <Avatar alt="ava" src={user.avatar ? user.avatar : ava} sx={{ width: 96, height: 96 }} />
          <InputFile />
        </div>
        <div className={s.editSpan}>
          <SuperEditableSpan
            value={text}
            onChangeText={updateTitleHandler}
            sendText={sendTextHandler}
          />
        </div>

        <div className={s.email}>{user.email}</div>
        <div className={s.logOut}>
          <Fab
            sx={{ background: '#FCFCFC' }}
            variant="extended"
            size="medium"
            onClick={logOutHandler}
          >
            <span>
              <img src={logOut} alt="logout1" />
            </span>
            <span className={s.logoutSpan}>
              Log <span>out</span>
            </span>
          </Fab>
        </div>
      </div>
    </>
  )
}
