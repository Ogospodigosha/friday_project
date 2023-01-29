import React from 'react'

import Button from '@mui/material/Button'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { PATH } from '../../../../components/pages/Pages'
import { getPacksSearchParams } from '../../../../utils/getPacksSearchParams'
import { useAppDispatch } from '../../../../utils/hooks/useAppDispatch'
import { useAppSelector } from '../../../../utils/hooks/useAppSelector'
import { deletePackTC } from '../../packs/deletePackTC'
import { deletePackForFadeMenu, openModal } from '../modalReducer'

import s from './deleteModalBody.module.css'

type PropsType = {
  dataForUpdateModal: { id: string; name: string }
}
export const DeleteModalBody = (props: PropsType) => {
  const flag = useAppSelector(state => state.modal.flag)

  console.log(flag)
  const navigate = useNavigate()

  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const cancelHandler = () => {
    dispatch(openModal(null))
  }
  const deletePackHandler = async () => {
    debugger
    if (flag === false) {
      console.log(flag)
      dispatch(deletePackTC(props.dataForUpdateModal.id, getPacksSearchParams(searchParams)))
      dispatch(openModal(null))
    } else {
      debugger
      dispatch(deletePackForFadeMenu(true))
      const res = await dispatch(
        deletePackTC(props.dataForUpdateModal.id, getPacksSearchParams(searchParams), true)
      )

      if (res !== undefined) {
        debugger
        navigate(PATH.PACKS)
        dispatch(openModal(null))
      }
      // navigate(PATH.PACKS)
    }
  }

  return (
    <>
      <div className={s.description}>
        Do you really want to remove <b>{props.dataForUpdateModal.name} </b>? <br />
        All cards will be deleted.
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
