import React, { ChangeEvent, useState } from 'react'

import { TextField } from '@mui/material'
import Button from '@mui/material/Button'

import { useAppDispatch } from '../../../../utils/hooks/useAppDispatch'
import { updateCardTC } from '../../cards/cardsReducer'
import s from '../createCardModalBody/createCardModalBody.module.css'
import { openModal } from '../modalReducer'

type PropsType = {
  dataForUpdateCard: {
    cardId: string
    question: string
    answer: string
  }
  cardsPack_id: string
}
export const UpdateCardModalBody = (props: PropsType) => {
  const [questionValue, setQuestionValue] = useState(props.dataForUpdateCard.question)
  const [answerValue, setAnswerValue] = useState(props.dataForUpdateCard.answer)
  const dispatch = useAppDispatch()
  const cancelHandler = () => {
    dispatch(openModal(null))
  }
  const updateQuestionValue = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setQuestionValue(e.currentTarget.value)
  }
  const updateAnswerValue = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setAnswerValue(e.currentTarget.value)
  }
  const saveEditCard = () => {
    dispatch(
      updateCardTC(
        {
          _id: props.dataForUpdateCard.cardId,
          question: questionValue,
          answer: answerValue,
        },
        props.cardsPack_id
      )
    )
    dispatch(openModal(null))
  }

  return (
    <div>
      <div style={{ marginBottom: '33px' }}>
        <div style={{ fontSize: '13px', lineHeight: '20px', opacity: '0.5' }}>Question</div>
        <TextField
          className={s.input}
          fullWidth={true}
          size="small"
          variant="standard"
          value={questionValue}
          onChange={updateQuestionValue}
        />
      </div>
      <div style={{ marginBottom: '35px' }}>
        <div style={{ fontSize: '13px', lineHeight: '20px', opacity: '0.5' }}>Answer</div>
        <TextField
          className={s.input}
          fullWidth={true}
          size="small"
          variant="standard"
          value={answerValue}
          onChange={updateAnswerValue}
        />
      </div>
      <div className={s.flex}>
        <div>
          <Button
            onClick={cancelHandler}
            variant={'text'}
            className={s.button}
            style={{
              textTransform: 'none',
              borderRadius: '30px',
              color: 'black',
              fontSize: '16px',
              lineHeight: '20px',
              marginRight: '107px',
            }}
          >
            Cancel
          </Button>
        </div>
        <div>
          <Button
            variant={'contained'}
            className={s.button}
            onClick={saveEditCard}
            style={{
              textTransform: 'none',
              borderRadius: '30px',
              color: 'white',
              fontSize: '16px',
              lineHeight: '20px',
              marginRight: '107px',
            }}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}
