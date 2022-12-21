import React, { useEffect } from 'react'

import Button from '@mui/material/Button'

import { useAppDispatch, useAppSelector } from '../../../app/store'
import { BackToPackList } from '../../../components/common/BackToPackList/BackToPackList'
import { CircularProgressSelf } from '../../../components/common/CircularProgress/CircularProgress'
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
  const packName = useAppSelector(state => state.cards.packName)
  const cardsPack_id = useAppSelector(state => state.cards.currentPackId)
  const currantPackUserId = useAppSelector(state => state.cards.packUserId)
  const cardPacks = useAppSelector(state => state.cards.cards)
  const loading = useAppSelector(state => state.app.status)

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

  const learnToPack = () => {
    alert('your desire to learn is commendable')
  }

  const addNewCardOrLearnCards =
    myId === currantPackUserId ? (
      <Button variant="contained" sx={style.addNewCard} onClick={addNewCard}>
        <span className={s.btnTitle}>Add new card</span>
      </Button>
    ) : (
      <Button
        variant="contained"
        sx={style.addNewCard}
        onClick={learnToPack}
        disabled={cardPacks?.length === 0}
      >
        <span className={s.btnTitle}>Learn to pack</span>
      </Button>
    )

  return (
    <>
      {loading === 'loading' ? <CircularProgressSelf /> : null}
      <BackToPackList />
      <div className={s.packName}>
        <div className={s.packNameTitle}>{packName}</div>
        {addNewCardOrLearnCards}
      </div>
      <BasicTable deleteCardOnClick={deleteCard} updateCardOnClick={updateCard} />
      {cardPacks?.length !== 0 ? (
        <UniversalPagination
          page={page}
          pageCount={pageCount}
          totalCount={totalCount}
          onChange={paginationOnChange}
        />
      ) : null}
    </>
  )
}
