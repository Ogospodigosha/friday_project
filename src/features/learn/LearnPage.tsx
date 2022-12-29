import React, { ChangeEvent, useEffect, useState } from 'react'

import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import { useSearchParams } from 'react-router-dom'

import { CardType } from '../../api/CardsApi'
import { setAppStatusAC } from '../../app/appReducer'
import { BackToPackList } from '../../components/common/BackToPackList/BackToPackList'
import { Loader } from '../../components/common/Loader/Loader'
import { getCard } from '../../utils/getCard'
import { useAppDispatch } from '../../utils/hooks/useAppDispatch'
import { useAppSelector } from '../../utils/hooks/useAppSelector'
import { setCurrentPackIdAC } from '../cards/cards/cardsReducer'

import s from './LearnPage.module.css'
import {
  deleteStudiedCardAC,
  getCardsToLearnTC,
  questionsAnsweredAC,
  resetQuestionsAC,
  setCardGradeTC,
  setCardsPackIdToLearnAC,
} from './learnReducer'
import { style } from './styleSXForLearnPage'

const initialCard = {
  _id: '',
  answer: 'answer',
  question: 'question',
  cardsPack_id: '',
  grade: 0,
  shots: 0,
  user_id: '',
  created: '',
  updated: '',
}
const gradeAnswer = ['Did not know', 'Forgot', 'A lot of thought', 'Confused', 'Knew the answer']

export const LearnPage = () => {
  const dispatch = useAppDispatch()
  const cardsPack_id = useAppSelector(state => state.learn.cardsPack_id)
  const cards = useAppSelector(state => state.learn.cards)
  const packName = useAppSelector(state => state.learn.packName)
  const questionsAnswered = useAppSelector(state => state.learn.questionsAnswered)
  const loading = useAppSelector(state => state.app.status)

  const [hideAnswer, setHideAnswer] = useState(true)
  const [selectedGrade, setSelectedGrade] = useState(1)
  const [urlParams, setUrlParams] = useSearchParams()

  const [card, setCard] = useState<CardType>(initialCard)

  useEffect(() => {
    const currantPackIdFromUrl = urlParams.get('cardsPack_id')

    if (currantPackIdFromUrl != null) {
      dispatch(setCardsPackIdToLearnAC(currantPackIdFromUrl))
    }
  }, [])

  useEffect(() => {
    if (cardsPack_id != '') {
      setUrlParams({
        cardsPack_id: `${cardsPack_id}`,
      })
    }
    dispatch(getCardsToLearnTC())
    dispatch(questionsAnsweredAC(false))
  }, [])

  useEffect(() => {
    if (cards) {
      setCard(getCard(cards))
    }
  }, [cards])
  const handleChangeGrade = (e: ChangeEvent<HTMLInputElement>) => {
    const grade = e.target.value

    setSelectedGrade(Number(grade))
  }

  const nextQuestion = async () => {
    setHideAnswer(true)
    dispatch(setAppStatusAC('loading'))
    await dispatch(setCardGradeTC(selectedGrade, card._id))
    if (card && cards?.length === 1) {
      return dispatch(questionsAnsweredAC(true))
    }
    if (cards) {
      const index = cards.findIndex(c => c._id === card._id)

      cards.splice(index, 1)
      dispatch(deleteStudiedCardAC([...cards]))
      dispatch(setAppStatusAC('succeeded'))
    }
  }

  const backToCurrentCardsHandler = () => {
    dispatch(resetQuestionsAC())
    dispatch(setCurrentPackIdAC(cardsPack_id))
    dispatch(getCardsToLearnTC())
  }

  if (questionsAnswered)
    return (
      <div>
        <BackToPackList />
        <h1 className={s.header}>Learn {packName}</h1>
        <div className={s.container}>
          <div className={s.learnt}>You learnt all questions</div>
          <Button variant="contained" sx={style.button} onClick={backToCurrentCardsHandler}>
            <span className={s.btnTitle}>Learn again</span>
          </Button>
        </div>
      </div>
    )

  return (
    <>
      {loading === 'loading' ? <Loader /> : null}
      <BackToPackList />
      <h1 className={s.header}>Learn {`"${packName}"`}</h1>
      <div className={s.container}>
        <div className={s.question}>
          <b>Question:</b> {card.question}
        </div>
        <div className={s.quantity}>Количество попыток ответов на вопрос: {card.shots}</div>
        {hideAnswer ? (
          <Button variant="contained" sx={style.button} onClick={() => setHideAnswer(false)}>
            <span className={s.btnTitle}>Show answer</span>
          </Button>
        ) : (
          <div className={s.answerBlock}>
            <div className={s.answerTitle}>
              <b>Answer</b>: {card.answer}
            </div>
            <div className={s.radioButtons}>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Rate ourself:</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="Did not know"
                  name="radio-buttons-group"
                >
                  {gradeAnswer.map((g, i) => {
                    return (
                      <FormControlLabel
                        key={i}
                        value={i + 1}
                        control={<Radio onChange={handleChangeGrade} />}
                        label={g}
                      />
                    )
                  })}
                </RadioGroup>
              </FormControl>
            </div>
            <Button variant="contained" sx={style.button} onClick={nextQuestion}>
              <span className={s.btnTitle}>Next</span>
            </Button>
          </div>
        )}
      </div>
    </>
  )
}
