import React, { useEffect, useState } from 'react'

import Button from '@mui/material/Button'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { BackToPackList } from '../../../components/common/BackToPackList/BackToPackList'
import { PATH } from '../../../components/pages/Pages'
import { Search } from '../../../components/search/Search'
import { SuperPagination } from '../../../components/superPagination/SuperPagination'
import { useAppDispatch } from '../../../utils/hooks/useAppDispatch'
import { useAppSelector } from '../../../utils/hooks/useAppSelector'
import { useDebounce } from '../../../utils/hooks/useDebounce'
import { setCardsPackIdToLearnAC } from '../../learn/learnReducer'
import { openModal } from '../modals/modalReducer'
import { PackModal } from '../modals/PackModal'

import { BasicTable } from './BasicTable/BasicTable'
import { style } from './BasicTable/styleSXForBasicTable'
import s from './CardsMain.module.css'
import { getCardsTC } from './cardsReducer'
// import {
//   createNewCardTC,
//   deleteCardTC,
//   getCardsTC,
//   setCurrentPackIdAC,
//   updateCardTC,
// } from './cardsReducer'
import { FadeMenu } from './FadeMenu/FadeMenu'

export const CardsMain = () => {
  const dispatch = useAppDispatch()
  const myId = useAppSelector(state => state.app.user._id)
  const totalCount = useAppSelector(state => state.cards.cardsTotalCount)
  const packName = useAppSelector(state => state.cards.packName)
  const cardsPack_id = useAppSelector(state => state.cards.currentPackId)
  const currantPackUserId = useAppSelector(state => state.cards.packUserId)
  const cardPacks = useAppSelector(state => state.cards.cards)
  const searchValue = useAppSelector(state => state.cards.filterSearchValue)
  const pack = useAppSelector(state => state.packs.packs)

  const [searchParams, setSearchParams] = useSearchParams()

  const params = Object.fromEntries(searchParams)
  const navigate = useNavigate()
  const [dataForUpdateCard, setDataForUpdateCard] = useState({
    cardId: '',
    question: '',
    answer: '',
  })

  useEffect(() => {
    console.log(cardsPack_id)
    if (cardsPack_id) {
      searchParams.set('cardsPack_id', cardsPack_id)
    }
    setSearchParams(params)
    dispatch(getCardsTC(params))
  }, [
    searchParams.get('cardsPack_id'),
    searchParams.get('page'),
    searchParams.get('pageCount'),
    useDebounce(searchParams.get('cardQuestion')),
    searchParams.get('sortCards'),
    useDebounce(searchValue),
    cardsPack_id,
    pack,
  ])

  const addNewCard = () => {
    dispatch(openModal('Add new card'))
  }
  const deleteCard = (cardId: string) => {
    setDataForUpdateCard({ cardId: cardId, question: '', answer: '' })
    dispatch(openModal('Delete card'))
  }

  const updateCard = (cardId: string, question: string, answer: string) => {
    setDataForUpdateCard({ cardId: cardId, question: question, answer: answer })
    dispatch(openModal('Edit card'))
  }
  const learnToPack = () => {
    dispatch(setCardsPackIdToLearnAC(params.cardsPack_id))
    navigate(PATH.LEARN)
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

  const dashboardMenu = myId === currantPackUserId ? <FadeMenu learnPack={learnToPack} /> : null

  return (
    <>
      <BackToPackList />
      <div className={s.packName}>
        <PackModal cardsPack_id={params.cardsPack_id} dataForUpdateCard={dataForUpdateCard} />
        <div className={s.packNameTitle}>
          <span className={s.packNameTitleSpan}>{packName}</span>
          {dashboardMenu}
        </div>
        {addNewCardOrLearnCards}
      </div>
      <div className={s.search}>
        <Search type={'cardQuestion'} />
      </div>
      <BasicTable deleteCardOnClick={deleteCard} updateCardOnClick={updateCard} />
      <SuperPagination totalCount={totalCount} />
    </>
  )
}
