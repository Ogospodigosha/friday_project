import React from 'react'

import { useNavigate } from 'react-router-dom'

import arrow from '../../../assets/icons/arrowback.svg'
import { PATH } from '../../pages/Pages'

import style from './BackToPackList.module.css'

export const BackToPackList = () => {
  const navigate = useNavigate()

  return (
    <div className={style.backPackList} onClick={() => navigate(PATH.CARDS)}>
      <img src={arrow} alt="arrow" />
      <span>Back to Pack List</span>
    </div>
  )
}
