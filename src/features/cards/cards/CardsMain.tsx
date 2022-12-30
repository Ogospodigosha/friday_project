import React, { useEffect } from 'react'

import Button from '@mui/material/Button'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { BackToPackList } from '../../../components/common/BackToPackList/BackToPackList'
import { Loader } from '../../../components/common/Loader/Loader'
import { PATH } from '../../../components/pages/Pages'
import { Search } from '../../../components/search/Search'
import { SuperPagination } from '../../../components/superPagination/SuperPagination'
import { useAppDispatch } from '../../../utils/hooks/useAppDispatch'
import { useAppSelector } from '../../../utils/hooks/useAppSelector'
import { useDebounce } from '../../../utils/hooks/useDebounce'
import { setCardsPackIdToLearnAC } from '../../learn/learnReducer'

import { BasicTable } from './BasicTable/BasicTable'
import { style } from './BasicTable/styleSXForBasicTable'
import s from './CardsMain.module.css'
import {
  createNewCardTC,
  deleteCardTC,
  getCardsTC,
  setCurrentPackIdAC,
  updateCardTC,
} from './cardsReducer'
import { FadeMenu } from './FadeMenu/FadeMenu'

export const CardsMain = () => {
  const dispatch = useAppDispatch()
  const myId = useAppSelector(state => state.app.user._id)
  const totalCount = useAppSelector(state => state.cards.cardsTotalCount)
  const packName = useAppSelector(state => state.cards.packName)
  const cardsPack_id = useAppSelector(state => state.cards.currentPackId)
  const currantPackUserId = useAppSelector(state => state.cards.packUserId)
  const cardPacks = useAppSelector(state => state.cards.cards)
  const loading = useAppSelector(state => state.app.status)
  const searchValue = useAppSelector(state => state.cards.filterSearchValue)
  const [searchParams, setSearchParams] = useSearchParams()
  const params = Object.fromEntries(searchParams)
  const navigate = useNavigate()
  const [urlParams, setUrlParams] = useSearchParams()

  useEffect(() => {
    const currantPackIdFromUrl = urlParams.get('currentPackId')

    if (currantPackIdFromUrl != null) {
      dispatch(setCurrentPackIdAC(currantPackIdFromUrl))
    }
  }, [])

  useEffect(() => {
    if (cardsPack_id != '') {
      setUrlParams({
        currentPackId: `${cardsPack_id}`,
      })
    }
    dispatch(getCardsTC())
  }, [useDebounce(searchValue)])

  useEffect(() => {
    if (cardsPack_id) {
      searchParams.set('cardsPack_id', cardsPack_id)
    }
    console.log(params)
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
  ])

  const addNewCard = () => {
    console.log(params.cardsPack_id)
    dispatch(
      createNewCardTC({
        cardsPack_id: params.cardsPack_id,
        question: 'test',
        answer: 'answer',
      })
    )
  }
  const deleteCard = (cardId: string) => {
    dispatch(deleteCardTC(cardId))
  }

  const updateCard = (cardId: string) => {
    dispatch(
      updateCardTC({
        _id: cardId,
        question:
          'What are you think about itWhat areink about itWhat are you think about itWhat are you think about itWhat are you think about itWhat are you think about itWhat are you think about itWhat are you think about itWhat are you think about it',
        answer:
          'I know itWhat are you think about itWhat are you think about itWhat are you think about itWhat are you think about itWhat are you think about it',
      })
    )
  }

  const learnToPack = async () => {
    await dispatch(setCardsPackIdToLearnAC(cardsPack_id))
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

  const dashboardMenu =
    myId === currantPackUserId ? (
      <FadeMenu learnPack={learnToPack} deletePack={learnToPack} editPackName={learnToPack} />
    ) : null

  return (
    <>
      {loading === 'loading' ? <Loader /> : null}
      <BackToPackList />
      <div className={s.packName}>
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
