import React, { ChangeEvent, useCallback, useEffect } from 'react'

import Button from '@mui/material/Button'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { BackToPackList } from '../../../components/common/BackToPackList/BackToPackList'
import { CircularProgressSelf } from '../../../components/common/CircularProgress/CircularProgress'
import { PATH } from '../../../components/pages/Pages'
import { useAppDispatch } from '../../../utils/hooks/useAppDispatch'
import { useAppSelector } from '../../../utils/hooks/useAppSelector'

import { BasicTable } from './BasicTable/BasicTable'
import { style } from './BasicTable/styleSXForBasicTable'
import s from './CardsMain.module.css'
import {
  createNewCardTC,
  deleteCardTC,
  getCardsTC,
  setCurrentCardsPageAC,
  setFilterCardsFromInputSearchAC,
  setPageCardsCountAC,
  updateCardTC,
} from './cardsReducer'

export const CardsMain = () => {
  const dispatch = useAppDispatch()
  const myId = useAppSelector(state => state.app.user._id)
  const pageCount = useAppSelector(state => state.cards.pageCount)
  const page = useAppSelector(state => state.cards.page)
  const totalCount = useAppSelector(state => state.cards.cardsTotalCount)
  const packName = useAppSelector(state => state.cards.packName)
  let cardsPack_id = useAppSelector(state => state.cards.currentPackId)
  const currantPackUserId = useAppSelector(state => state.cards.packUserId)
  const cardPacks = useAppSelector(state => state.cards.cards)
  const loading = useAppSelector(state => state.app.status)
  const searchValue = useAppSelector(state => state.cards.filterSearchValue)
  const sort = useAppSelector(state => state.cards.sortCardsValue)
  const [searchParams, setSearchParams] = useSearchParams()
  const params = Object.fromEntries(searchParams)
  const navigate = useNavigate()

  console.log(params)

  useEffect(() => {
    debugger
    if (cardsPack_id) {
      searchParams.set('cardsPack_id', cardsPack_id)
    }
    console.log(params)
    setSearchParams(params)
    dispatch(getCardsTC(params))
  }, [searchParams.get('cardsPack_id')])
  //pageCount, page, useDebounce(searchValue), sort, - это убрал из зависимостей
  // useEffect(() => {
  //   !cardPacks?.length && dispatch(setCurrentCardsPageAC(page - 1))
  // }, [totalCount])

  const onChangePagination = useCallback((page: number, countPage: number) => {
    dispatch(setPageCardsCountAC(countPage))
    dispatch(setCurrentCardsPageAC(page))
  }, [])
  const addNewCard = useCallback(() => {
    dispatch(createNewCardTC({ cardsPack_id, question: 'question1', answer: 'answer' }))
  }, [])
  const deleteCard = useCallback((cardId: string) => {
    dispatch(deleteCardTC(cardId))
  }, [])

  const updateCard = useCallback((cardId: string) => {
    dispatch(
      updateCardTC({
        _id: cardId,
        question:
          'What are you think about itWhat are you think about itWhat are you think about itWhat are you think about itWhat are you think about itWhat are you think about itWhat are you think about itWhat are you think about itWhat are you think about it',
        answer:
          'I know itWhat are you think about itWhat are you think about itWhat are you think about itWhat are you think about itWhat are you think about it',
      })
    )
  }, [])

  const learnToPack = () => {
    navigate(PATH.LEARN)
  }

  const inputSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilterCardsFromInputSearchAC(e.currentTarget.value))
  }, [])

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
      <div className={s.search}>
        <span className={s.searchSpan}>Search</span>
        {/*<TextField*/}
        {/*  className={s.input}*/}
        {/*  size="small"*/}
        {/*  value={searchValue}*/}
        {/*  onChange={inputSearch}*/}
        {/*  placeholder={'Provide your text'}*/}
        {/*  InputProps={{*/}
        {/*    startAdornment: (*/}
        {/*      <InputAdornment position={'start'}>*/}
        {/*        <SearchIcon />*/}
        {/*      </InputAdornment>*/}
        {/*    ),*/}
        {/*    endAdornment: (*/}
        {/*      <IconButton onClick={() => dispatch(setFilterCardsFromInputSearchAC(''))}>*/}
        {/*        <CloseIcon />*/}
        {/*      </IconButton>*/}
        {/*    ),*/}
        {/*  }}*/}
        {/*/>*/}
      </div>
      <BasicTable deleteCardOnClick={deleteCard} updateCardOnClick={updateCard} />
      {/*{cardPacks?.length !== 0 ? (*/}
      {/*  <UniversalPagination*/}
      {/*    page={page}*/}
      {/*    pageCount={pageCount}*/}
      {/*    totalCount={totalCount}*/}
      {/*    onChange={onChangePagination}*/}
      {/*  />*/}
      {/*) : null}*/}
    </>
  )
}
