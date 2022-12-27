import React, { useEffect, useState } from 'react'

import { Radio } from '@mui/icons-material'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'

import { useAppDispatch, useAppSelector } from '../../app/store'
import { BackToPackList } from '../../components/common/BackToPackList/BackToPackList'

import s from './LearnPage.module.css'
import { getCardsToLearnTC, showAnswerOnQuestionAC } from './learnReducer'

const gradeAnswer = ['Did not know', 'Forgot', 'A lot of thought', 'Confused', 'Knew the answer']

export const LearnPage = () => {
  const dispatch = useAppDispatch()
  const packName = useAppSelector(state => state.cards.packName)
  const cardsPack_id = useAppSelector(state => state.learn.cardsPack_id)
  // const cards = useAppSelector(state => state.learn.cards)
  // const showAnswer = useAppSelector(state => state.learn.showAnswer)
  // const cardPacks = useAppSelector(state => state.packs.packs)

  const [hideAnswer, setHideAnswer] = useState(true)

  // console.log(
  //   'packName===',
  //   packName,
  //   'cardsPack_id===',
  //   cardsPack_id,
  //   'cards===',
  //   cards,
  //   'showAnswer===',
  //   showAnswer,
  //   'cardPacks===',
  //   cardPacks
  // )
  useEffect(() => {
    if (cardsPack_id != '') {
      dispatch(getCardsToLearnTC())
      dispatch(showAnswerOnQuestionAC(false))
    }
  }, [])

  return (
    <>
      <BackToPackList />
      <h1 className={s.header}>Learn {packName}</h1>
      <div className={s.container}>
        <div className={s.question}>Question: </div>
        <div className={s.quantity}>Количество попыток ответов на вопрос:</div>
        {hideAnswer ? (
          <Button variant="contained" className={s.button} onClick={() => setHideAnswer(false)}>
            <span className={s.btnTitle}>Show answer</span>
          </Button>
        ) : (
          <div className={s.answerBlock}>
            <div className={s.answerTitle}>Answer:</div>
            <div className={s.rate}>Rate ourself:</div>
            <ul>
              {gradeAnswer.map((g, i) => {
                return (
                  <li key={i}>
                    <FormControlLabel value={g} control={<Radio />} label={g} />
                  </li>
                )
              })}
            </ul>
            <Button variant="contained" className={s.button}>
              <span className={s.btnTitle}>Next</span>
            </Button>
          </div>
        )}
      </div>
    </>
  )
}
