import React, { ChangeEvent, useState } from 'react'

import { MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'

import { useAppDispatch } from '../../../../utils/hooks/useAppDispatch'
import { createNewCardTC } from '../../cards/cardsReducer'
import { openModal } from '../modalReducer'

import s from './createCardModalBody.module.css'

export const CreateCardModalBody = (props: PropsType) => {
  const [questionValue, setQuestionValue] = useState('')
  const [answerValue, setAnswerValue] = useState('')
  const [questionType, setQuestionType] = useState<SelectType>('text')

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

  const handleChange = (event: SelectChangeEvent) => {
    setQuestionType(event.target.value as SelectType)
  }

  return (
    <div>
      <FormControl fullWidth>
        <span className={s.selectDescription}>Choose a question format</span>
        <Select value={questionType} onChange={handleChange}>
          <MenuItem value={'text'}>Text</MenuItem>
          <MenuItem value={'picture'}>Picture</MenuItem>
        </Select>
      </FormControl>
      <div>
        <div style={{ marginBottom: '33px', marginTop: '33px' }}>
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

type PropsType = {
  cardsPack_id: string
}
type SelectType = 'text' | 'picture'
