import { AxiosError } from 'axios'

import { cardsApi, CardType, GetCardsResponseType } from '../../api/CardsApi'
import { learnApi } from '../../api/LearnApi'
import { setAppStatusAC } from '../../app/appReducer'
import { AppRootStateType, AppThunkDispatch } from '../../app/store'
import { handleError } from '../../utils/error-utils'

const learnInitialState = {
  cardsPack_id: '',
  cards: null as CardType[] | null,
  cardsTotalCount: 0,
  pageCount: 150,
  packUserId: '',
  questionsAnswered: false,
  learnLoading: true,
}

export type LearnStateType = typeof learnInitialState
export type LearnActionsType =
  | ReturnType<typeof setCardsToLearnAC>
  | ReturnType<typeof setCardsPackIdToLearnAC>
  | ReturnType<typeof questionsAnsweredAC>
  | ReturnType<typeof deleteStudiedCardAC>
export const learnReducer = (
  state: LearnStateType = learnInitialState,
  action: LearnActionsType
): LearnStateType => {
  switch (action.type) {
    case 'LEARN/SET-CARDS-TO-LEARN':
      return {
        ...state,
        cards: action.data.cards,
        cardsTotalCount: action.data.cardsTotalCount,
        packUserId: action.data.packUserId,
      }
    case 'LEARN/DELETED-STUDIED-CARD':
      return {
        ...state,
        cards: action.cards,
      }
    case 'LEARN/SET-CARDS-PACK-ID':
      return {
        ...state,
        cardsPack_id: action.cardsPack_id,
      }
    case 'LEARN/QUESTIONS-ANSWERED': {
      return {
        ...state,
        questionsAnswered: action.answered,
      }
    }
    default:
      return state
  }
}

export const setCardsToLearnAC = (data: GetCardsResponseType) => {
  return {
    type: 'LEARN/SET-CARDS-TO-LEARN',
    data,
  } as const
}

export const deleteStudiedCardAC = (cards: CardType[]) => {
  return {
    type: 'LEARN/DELETED-STUDIED-CARD',
    cards,
  } as const
}
export const setCardsPackIdToLearnAC = (cardsPack_id: string) => {
  return {
    type: 'LEARN/SET-CARDS-PACK-ID',
    cardsPack_id,
  } as const
}

export const questionsAnsweredAC = (answered: boolean) => {
  return {
    type: 'LEARN/QUESTIONS-ANSWERED',
    answered,
  } as const
}

export const getCardsToLearnTC =
  () => async (dispatch: AppThunkDispatch, getState: () => AppRootStateType) => {
    dispatch(setAppStatusAC('loading'))
    const pageCount = getState().learn.pageCount
    const cardsPack_id = getState().learn.cardsPack_id

    try {
      const res = await cardsApi.getCards({
        cardsPack_id,
        pageCount,
      })

      dispatch(setCardsToLearnAC(res.data))
      dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>

      handleError(err, dispatch)
    }
  }

export const setCardGradeTC =
  (grade: number, card_id: string) => async (dispatch: AppThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
      const res = await learnApi.updateGrade({
        grade,
        card_id,
      })

      dispatch(setAppStatusAC('succeeded'))

      return res.data
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>

      handleError(err, dispatch)
    }
  }
