import React, { ChangeEvent, useState } from 'react'

import { TextField } from '@mui/material'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'

import { useAppDispatch } from '../../../../utils/hooks/useAppDispatch'
import { createPackTC } from '../../packs/createPackTC'
import { openModal } from '../modalReducer'

import s from './createPackModalBody.module.css'

export const CreatePackModalBody = () => {
  const dispatch = useAppDispatch()
  const [packName, setPackName] = useState('')
  const [checked, setChecked] = useState(false)

  const createPackNameHandler = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setPackName(e.currentTarget.value)
  }
  const data = {
    cardsPack: {
      name: packName,
      deckCover: 'url or base64', // не обязателен
      private: checked,
    },
  }
  const saveHandler = () => {
    dispatch(createPackTC(data))
    dispatch(openModal(null))
  }
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked)
  }
  const cancelHandler = () => {
    dispatch(openModal(null))
  }

  return (
    <>
      <div className={s.packName}>Name pack</div>
      <div style={{ marginBottom: '30px' }}>
        <TextField
          className={s.input}
          fullWidth={true}
          size="small"
          variant="standard"
          value={packName}
          onChange={createPackNameHandler}
          placeholder={'Provide pack name'}
        />
      </div>
      <div style={{ marginBottom: '35px' }}>
        <FormControlLabel
          control={<Checkbox checked={checked} onChange={onChangeHandler} />}
          label="Private pack"
        />
      </div>
      <div className={s.flex}>
        <div>
          <Button
            variant={'text'}
            className={s.button}
            onClick={cancelHandler}
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
            onClick={saveHandler}
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
    </>
  )
}
