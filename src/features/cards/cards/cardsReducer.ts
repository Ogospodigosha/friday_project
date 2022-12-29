import { AxiosError } from 'axios'

import {
  cardsApi,
  CardType,
  CreateCardRequestType,
  GetCardsResponseType,
  UpdateCardType,
} from '../../../api/CardsApi'
import { setAppStatusAC } from '../../../app/appReducer'
import { AppRootStateType, AppThunkDispatch } from '../../../app/store'
import { handleError } from '../../../utils/error-utils'

const cardsInitialState = {
  cards: null as CardType[] | null,
  cardsTotalCount: 0,
  maxGrade: 0,
  minGrade: 0,
  page: 5,
  pageCount: 5,
  packUserId: '',
  currentPackId: '',
  sortCardsValue: '0updated',
  filterSearchValue: '',
  packName: '',
}

export type CardsStateType = typeof cardsInitialState
export type CardsActionType =
  | ReturnType<typeof setCardsAC>
  | ReturnType<typeof setCurrentPackIdAC>
  | ReturnType<typeof setCurrentCardsPageAC>
  | ReturnType<typeof setPageCardsCountAC>
  | ReturnType<typeof setSortCardsValueAC>
  | ReturnType<typeof setFilterCardsFromInputSearchAC>

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
        packName: action.data.packName,
      }
    case 'CARDS/SET-CURRENT-PACK-ID':
      return {
        ...state,
        currentPackId: action.id,
      }
    case 'CARDS/SET-PAGE':
      return {
        ...state,
        page: action.page,
      }
    case 'CARDS/SET-PAGE-COUNT':
      return {
        ...state,
        pageCount: action.pageCount,
      }
    case 'CARDS/SET-SORT-CARDS-VALUE':
      return {
        ...state,
        sortCardsValue: action.sortCardsValue,
      }
    case 'CARDS/SET-FILTER-CARDS-FROM-INPUT-SEARCH':
      return {
        ...state,
        filterSearchValue: action.value,
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

export const setCurrentPackIdAC = (id: string) => {
  return { type: 'CARDS/SET-CURRENT-PACK-ID', id } as const
}
export const setCurrentCardsPageAC = (page: number) => {
  return {
    type: 'CARDS/SET-PAGE',
    page,
  } as const
}

export const setPageCardsCountAC = (pageCount: number) => {
  return {
    type: 'CARDS/SET-PAGE-COUNT',
    pageCount,
  } as const
}

export const setSortCardsValueAC = (sortCardsValue: string) => {
  return {
    type: 'CARDS/SET-SORT-CARDS-VALUE',
    sortCardsValue,
  } as const
}

export const setFilterCardsFromInputSearchAC = (value: string) => {
  return {
    type: 'CARDS/SET-FILTER-CARDS-FROM-INPUT-SEARCH',
    value,
  } as const
}
export type ParamsForGetCards = {
  cardsPack_id?: string
}
export const getCardsTC =
  (paramsForSend: ParamsForGetCards = {}) =>
  async (dispatch: AppThunkDispatch, getState: () => AppRootStateType) => {
    debugger
    dispatch(setAppStatusAC('loading'))
    const cardsPack_id = getState().cards.currentPackId
    const page = getState().cards.page
    const pageCount = getState().cards.pageCount
    const cardQuestion = getState().cards.filterSearchValue
    const sortCards = getState().cards.sortCardsValue

    if (paramsForSend.cardsPack_id === undefined) return
    try {
      const res = await cardsApi.getCards({
        cardsPack_id,
        // page,
        // pageCount,
        // sortCards,
        // cardQuestion,
        ...paramsForSend,
      })

      dispatch(setAppStatusAC('succeeded'))
      dispatch(setCardsAC(res.data))
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>

      dispatch(setAppStatusAC('failed'))
      handleError(err, dispatch)
    }
  }

export const createNewCardTC =
  (data: CreateCardRequestType) => async (dispatch: AppThunkDispatch) => {
    debugger
    try {
      await cardsApi.addCard(data)
      dispatch(getCardsTC({ cardsPack_id: data.cardsPack_id }))
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>

      handleError(err, dispatch)
    }
  }

export const deleteCardTC = (id: string) => async (dispatch: AppThunkDispatch) => {
  dispatch(setAppStatusAC('loading'))
  try {
    await cardsApi.deleteCard(id)
    dispatch(getCardsTC())
    dispatch(setAppStatusAC('succeeded'))
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>

    handleError(err, dispatch)
  }
}

export const updateCardTC = (data: UpdateCardType) => async (dispatch: AppThunkDispatch) => {
  dispatch(setAppStatusAC('loading'))
  try {
    await cardsApi.updateCard(data)
    dispatch(getCardsTC())
    dispatch(setAppStatusAC('succeeded'))
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>

    handleError(err, dispatch)
  }
}
