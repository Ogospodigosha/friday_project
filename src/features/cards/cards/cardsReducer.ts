import { setAppStatusAC } from '../../../app/appReducer'
import { AppRootStateType, AppThunkDispatch } from '../../../app/store'

import {
  cardsApi,
  CardType,
  CreateCardRequestType,
  GetCardsResponseType,
  UpdateCardType,
} from './CardsApi'

const cardsInitialState = {
  cards: null as CardType[] | null,
  cardsTotalCount: 0,
  maxGrade: 0,
  minGrade: 0,
  page: 1,
  pageCount: 1,
  packUserId: '5eb543f6bea3ad21480f1ee7',
  currentPackId: '639e269ac7270c4efc6205a4',
  sortCardsValue: '0updated',
  filterSearchValue: '',
}

export type CardsStateType = typeof cardsInitialState
export type CardsActionType = ReturnType<typeof setCardsAC> | ReturnType<typeof setCurrentPackAC>

export const cardsReducer = (
  state: CardsStateType = cardsInitialState,
  action: CardsActionType
): CardsStateType => {
  switch (action.type) {
    case 'CARDS/SET-CARDS':
      return {
        ...state,
        cards: action.data.cards,
        cardsTotalCount: action.data.cardsTotalCount,
        maxGrade: action.data.maxGrade,
        minGrade: action.data.minGrade,
        page: action.data.page,
        pageCount: action.data.pageCount,
        packUserId: action.data.packUserId,
      }
    case 'CARDS/SET-CURRENT-PACK':
      return {
        ...state,
        currentPackId: action.id,
      }
    default:
      return state
  }
}

export const setCardsAC = (data: GetCardsResponseType) => {
  return {
    type: 'CARDS/SET-CARDS',
    data,
  } as const
}

export const setCurrentPackAC = (id: string) => {
  return { type: 'CARDS/SET-CURRENT-PACK', id } as const
}

export const getCardsTC =
  () => async (dispatch: AppThunkDispatch, getState: () => AppRootStateType) => {
    dispatch(setAppStatusAC('loading'))
    const cardsPack_id = getState().cards.currentPackId
    const page = getState().cards.page
    const pageCount = 10

    try {
      const res = await cardsApi.getCards({
        cardsPack_id,
        page,
        pageCount,
      })

      dispatch(setCardsAC(res.data))
      dispatch(setAppStatusAC('succeeded'))
    } catch (err) {
      console.log(err)
    }
  }

export const createNewCardTC =
  (data: CreateCardRequestType) => async (dispatch: AppThunkDispatch) => {
    try {
      await cardsApi.addCard(data)
      dispatch(getCardsTC())
    } catch (err) {
      console.log(err)
    }
  }

export const deleteCardTC = (id: string) => async (dispatch: AppThunkDispatch) => {
  dispatch(setAppStatusAC('loading'))
  try {
    await cardsApi.deleteCard(id)
    dispatch(getCardsTC())
    dispatch(setAppStatusAC('succeeded'))
  } catch (err) {
    console.log(err)
  }
}

export const updateCardTC = (data: UpdateCardType) => async (dispatch: AppThunkDispatch) => {
  dispatch(setAppStatusAC('loading'))
  try {
    await cardsApi.updateCard(data)
    dispatch(getCardsTC())
    dispatch(setAppStatusAC('succeeded'))
  } catch (err) {
    console.log(err)
  }
}
