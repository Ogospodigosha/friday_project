import React, { useEffect } from 'react'

import Button from '@mui/material/Button'

import { useAppDispatch, useAppSelector } from '../../../app/store'
import { BackToPackList } from '../../../components/common/BackToPackList/BackToPackList'

import BasicTable from './BasicTable'
import s from './CardsMain.module.css'
import { getCardsTC } from './cardsReducer'
import { style } from './styleSXForBasicTable'

export const CardsMain = () => {
  const dispatch = useAppDispatch()
  const myId = useAppSelector(state => state.app.user._id)
  const cardPacks = useAppSelector(state => state.cards.cards)

  useEffect(() => {
    dispatch(getCardsTC())
  }, [])

  return (
    <>
      <BackToPackList />
      <div className={s.packName}>
        <div className={s.packNameTitle}>Lorem Ipsum</div>
        <Button variant="contained" sx={style.addNewCard}>
          <span className={s.btnTitle}>Add new card</span>
        </Button>
      </div>
      <BasicTable />
    </>
  )
}
