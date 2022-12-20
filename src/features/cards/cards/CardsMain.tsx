import React, { useEffect } from 'react'

import Button from '@mui/material/Button'

import { useAppDispatch, useAppSelector } from '../../../app/store'
import { BackToPackList } from '../../../components/common/BackToPackList/BackToPackList'
import { UniversalPagination } from '../../../components/pagination/UniversalPagination'

import { BasicTable } from './BasicTable'
import s from './CardsMain.module.css'
import {
  createNewCardTC,
  deleteCardTC,
  getCardsTC,
  setCurrentCardsPageAC,
  setPageCardsCountAC,
  updateCardTC,
} from './cardsReducer'
import { style } from './styleSXForBasicTable'

export const CardsMain = () => {
  const dispatch = useAppDispatch()
  const myId = useAppSelector(state => state.app.user._id)
  const pageCount = useAppSelector(state => state.cards.pageCount)
  const page = useAppSelector(state => state.cards.page)
  const totalCount = useAppSelector(state => state.cards.cardsTotalCount)
  const namePack = useAppSelector(state => state.cards.currentPackId)
  const cardsPack_id = useAppSelector(state => state.cards.currentPackId)

  useEffect(() => {
    dispatch(getCardsTC())
  }, [pageCount, page])
  const paginationOnChange = (page: number, countPage: number) => {
    dispatch(setCurrentCardsPageAC(page))
    dispatch(setPageCardsCountAC(countPage))
  }
  const addNewCard = () => {
    dispatch(createNewCardTC({ cardsPack_id, question: 'qu1', answer: 'ans1' }))
  }
  const deleteCard = (cardId: string) => {
    dispatch(deleteCardTC(cardId))
  }

  const updateCard = (cardId: string) => {
    dispatch(
      updateCardTC({
        _id: cardId,
        question: 'What are you think about it',
        answer: 'I know it',
      })
    )
  }

  return (
    <>
      <BackToPackList />
      <div className={s.packName}>
        <div className={s.packNameTitle}>{namePack ? namePack : 'Lorem ipsum'}</div>
        <Button variant="contained" sx={style.addNewCard} onClick={addNewCard}>
          <span className={s.btnTitle}>Add new card</span>
        </Button>
      </div>
      <BasicTable deleteCardOnClick={deleteCard} updateCardOnClick={updateCard} />
      <UniversalPagination
        page={page}
        pageCount={pageCount}
        totalCount={totalCount}
        onChange={paginationOnChange}
      />
    </>
  )
}
