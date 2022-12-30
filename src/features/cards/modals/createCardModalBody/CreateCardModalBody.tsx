import React, { ChangeEvent, useState } from 'react'

import { TextField } from '@mui/material'
import Button from '@mui/material/Button'

import { useAppDispatch } from '../../../../utils/hooks/useAppDispatch'
import { createNewCardTC } from '../../cards/cardsReducer'
import { openModal } from '../modalReducer'

import s from './createCardModalBody.module.css'

type PropsType = {
  cardsPack_id: string
}
export const CreateCardModalBody = (props: PropsType) => {
  const [questionValue, setQuestionValue] = useState('')
  const [answerValue, setAnswerValue] = useState('')
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
  const saveNewCard = () => {
    dispatch(
      createNewCardTC({
        cardsPack_id: props.cardsPack_id,
        question: questionValue,
        answer: answerValue,
      })
    )
    dispatch(openModal(null))
  }

  return (
    <div>
      <div style={{ marginBottom: '33px' }}>
        <TextField
          className={s.input}
          fullWidth={true}
          size="small"
          variant="standard"
          value={questionValue}
          onChange={updateQuestionValue}
          placeholder={'Question'}
        />
      </div>
      <div style={{ marginBottom: '35px' }}>
        <TextField
          className={s.input}
          fullWidth={true}
          size="small"
          variant="standard"
          value={answerValue}
          onChange={updateAnswerValue}
          placeholder={'Answer'}
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
            onClick={saveNewCard}
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
