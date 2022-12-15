import React from 'react'

import Avatar from '@mui/material/Avatar'
import Fab from '@mui/material/Fab'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/store'
import arrow from '../../../assets/icons/arrowback.svg'
import pencil from '../../../assets/icons/editPencil.png'
import logOut from '../../../assets/icons/logout.svg'
import ava from '../../../assets/img/avatarFish.png'
import SuperEditableSpan from '../../../components/common/SuperEditableSpan/SuperEditableSpan'

import style from './Profile.module.css'
import { ProfileType } from './profileApi'
import { updateProfileTC } from './profileReducer'
// import { updateProfileTC } from './profileReducer'

export const Profile = () => {
  const user = useAppSelector<ProfileType>(state => state.app.user)
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector<boolean>(state => state.login.isLoggedIn)
  const navigate = useNavigate()
  const updateTitleHandler = (name: string) => {
    // dispatch(updateProfileTC({ name }))
  }

  return (
    <>
      <div className={style.backPackList}>
        <img src={arrow} alt="arrow" />
        <span>Back to Pack List</span>
      </div>
      <div className={style.main}>
        <div className={style.title}>Personal Information</div>
        <div className={style.avatar}>
          <Avatar alt="your ava" src={ava} sx={{ width: 96, height: 96 }} />
        </div>
        <div className={style.editSpan}>
          <SuperEditableSpan value={user.name} onChangeText={updateTitleHandler} />
          <span>
            <img src={pencil} alt="pencil" />
          </span>
        </div>
        <div className={style.email}>{user.email}</div>
        <div className={style.logOut}>
          <Fab
            sx={{ background: '#FCFCFC' }}
            variant="extended"
            size="medium"
            color="default"
            aria-label="add"
          >
            <span>
              <img src={logOut} alt="logout" />
            </span>
            <span className={style.logoutSpan}>
              Log <span>out</span>
            </span>
          </Fab>
          {/*example*/}
          <button onClick={() => dispatch(updateProfileTC({ name: 'sdasd' }))}>123</button>
        </div>
      </div>
    </>
  )
}
