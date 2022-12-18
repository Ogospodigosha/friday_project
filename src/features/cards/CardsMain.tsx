import React from 'react'

import { useAppDispatch, useAppSelector } from '../../app/store'

import BasicTable from './BasicTable'
import { getCardsTC } from './cardsReducer'

export const CardsMain = () => {
  const dispatch = useAppDispatch()
  const myId = useAppSelector(state => state.app.user._id)
  const cardPacks = useAppSelector(state => state.cards.sortCardsValue)

  console.log(cardPacks)
  dispatch(getCardsTC())

  return (
    <>
      <h1>Cards</h1>
      <BasicTable />
      <div>{myId}</div>
      {/*<div>{cardPacks}</div>*/}
    </>
  )
}
