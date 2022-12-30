import React from 'react'

import Button from '@mui/material/Button'

import { useAppDispatch } from '../../../../utils/hooks/useAppDispatch'
import { deleteCardTC } from '../../cards/cardsReducer'
import s from '../deletePackModalBody/deleteModalBody.module.css'
import { openModal } from '../modalReducer'

type PropsType = {
  cardsPack_id: string
  dataForUpdateCard: {
    cardId: string
    question: string
    answer: string
  }
}
export const DeleteCardModalBody = (props: PropsType) => {
  const dispatch = useAppDispatch()
  const cancelHandler = () => {
    dispatch(openModal(null))
  }
  const deletePackHandler = () => {
    console.log(props.dataForUpdateCard.cardId)
    dispatch(deleteCardTC(props.dataForUpdateCard.cardId, props.cardsPack_id))
    dispatch(openModal(null))
  }

  return (
    <>
      <div className={s.description}>Do you really want to remove this question ?</div>
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
            onClick={deletePackHandler}
            style={{
              textTransform: 'none',
              borderRadius: '30px',
              color: 'white',
              background: 'red',
              fontSize: '16px',
              lineHeight: '20px',
              marginRight: '107px',
            }}
          >
            Delete
          </Button>
        </div>
      </div>
    </>
  )
}
