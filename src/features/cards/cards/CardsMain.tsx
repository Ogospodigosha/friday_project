import React, { useEffect } from 'react'

import Button from '@mui/material/Button'

import { useAppDispatch, useAppSelector } from '../../../app/store'
import { BackToPackList } from '../../../components/common/BackToPackList/BackToPackList'

import BasicTable from './BasicTable'
import s from './CardsMain.module.css'
import { createNewCardTC, getCardsTC } from './cardsReducer'
import { style } from './styleSXForBasicTable'

export const CardsMain = () => {
  const dispatch = useAppDispatch()
  const myId = useAppSelector(state => state.app.user._id)
  const cardsPack_id = useAppSelector(state => state.cards.currentPackId)

  useEffect(() => {
    dispatch(getCardsTC())
  }, [])
  const addNewCard = () => {
    dispatch(createNewCardTC({ cardsPack_id, question: 'la-la', answer: 'ty-la-la' }))
  }

  return (
    <>
      <BackToPackList />
      <div className={s.packName}>
        <div className={s.packNameTitle}>Lorem Ipsum</div>
        <Button variant="contained" sx={style.addNewCard} onClick={addNewCard}>
          <span className={s.btnTitle}>Add new card</span>
        </Button>
      </div>
      <BasicTable />
    </>
  )
}
