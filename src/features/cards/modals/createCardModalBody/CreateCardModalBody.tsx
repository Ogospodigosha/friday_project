import React, { ChangeEvent, useState } from 'react'

import { TextField } from '@mui/material'
import Button from '@mui/material/Button'

import { useAppDispatch } from '../../../../utils/hooks/useAppDispatch'
import { createNewCardTC } from '../../cards/cardsReducer'
import { ChangeQuestionType } from '../for modals/ChangeQuestionType'
import { openModal } from '../modalReducer'

import s from './CreateCardModalBody.module.css'
import { PictureQuestion } from './PictureQuestion/PictureQuestion'

export const CreateCardModalBody = (props: PropsType) => {
  const [questionValue, setQuestionValue] = useState('')
  const [answerValue, setAnswerValue] = useState('')
  const [questionType, setQuestionType] = useState<SelectType>('text')
  const [questionImg, setQuestionImg] = useState('')

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
  const setQuestionCover = (fileBase64: string) => {
    setQuestionImg(fileBase64)
  }
  const saveNewCard = () => {
    dispatch(
      createNewCardTC({
        cardsPack_id: props.cardsPack_id,
        question: questionValue,
        answer: answerValue,
        questionImg: questionImg,
      })
    )
    dispatch(openModal(null))
  }
  const changeQuestion = (newSelectValue: SelectType) => {
    setQuestionType(newSelectValue)
  }

  return (
    <div>
      <ChangeQuestionType questionType={questionType} changeQuestion={changeQuestion} />
      <div>
        {questionType === 'picture' ? (
          <PictureQuestion cover={questionImg} setQuestionCover={setQuestionCover} />
        ) : (
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
        )}
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
    </div>
  )
}

type PropsType = {
  cardsPack_id: string
}
export type SelectType = 'text' | 'picture'
