import React from 'react'

import { useNavigate } from 'react-router-dom'

import arrow from '../../../assets/icons/arrowback.svg'
import { PATH } from '../../pages/Pages'

import s from './BackToPackList.module.css'

export const BackToPackList = () => {
  const navigate = useNavigate()

  return (
    <div className={s.backPackList} onClick={() => navigate(PATH.PACKS)}>
      <img src={arrow} alt="arrow" />
      <span>Back to Pack List</span>
    </div>
  )
}
