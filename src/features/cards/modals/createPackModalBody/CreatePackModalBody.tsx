import React, { ChangeEvent, useState } from 'react'

import { TextField } from '@mui/material'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import { useSearchParams } from 'react-router-dom'

import { InputTypeFile } from '../../../../components/InputTypeFile'
import { getPacksSearchParams } from '../../../../utils/getPacksSearchParams'
import { useAppDispatch } from '../../../../utils/hooks/useAppDispatch'
import { createPackTC } from '../../packs/createPackTC'
import { openModal } from '../modalReducer'

import s from './createPackModalBody.module.css'

type PropsType = {
  setFile64: (file64: string) => void
  file64: string
}
export const CreatePackModalBody = (props: PropsType) => {
  const dispatch = useAppDispatch()
  const [searchParams] = useSearchParams()
  const [packName, setPackName] = useState('')
  const [checked, setChecked] = useState(false)
  const createPackNameHandler = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setPackName(e.currentTarget.value)
  }
  const data = {
    cardsPack: {
      name: packName,
      deckCover: props.file64, // не обязателен
      private: checked,
    },
  }
  const saveHandler = () => {
    dispatch(createPackTC(data, getPacksSearchParams(searchParams)))
    props.setFile64('url or base64')
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
      <InputTypeFile setFile64={props.setFile64} />
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
