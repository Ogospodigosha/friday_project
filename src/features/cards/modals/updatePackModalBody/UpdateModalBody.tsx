import React, { ChangeEvent, useState } from 'react'

import { TextField } from '@mui/material'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import { useSearchParams } from 'react-router-dom'

import { InputTypeFile } from '../../../../components/InputTypeFile'
import { getPacksSearchParams } from '../../../../utils/getPacksSearchParams'
import { useAppDispatch } from '../../../../utils/hooks/useAppDispatch'
import { editPackTC } from '../../packs/editPackTC'
import s from '../createPackModalBody/createPackModalBody.module.css'
import { openModal } from '../modalReducer'

type PropsType = {
  dataForUpdateModal: { id: string; name: string }
  deckCover: string
  setFile64: (file64: string) => void
  file64: string
}
export const UpdateModalBody = (props: PropsType) => {
  const dispatch = useAppDispatch()
  const [searchParams] = useSearchParams()
  const [checked, setChecked] = useState(false)
  const [UpdateValue, setUpdateValue] = useState(props.dataForUpdateModal.name)
  const updatePackName = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setUpdateValue(e.currentTarget.value)
  }
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked)
  }

  const saveUpdatedPackName = () => {
    dispatch(
      editPackTC(
        props.dataForUpdateModal.id,
        UpdateValue,
        props.file64, //
        getPacksSearchParams(searchParams)
      )
    )
    dispatch(openModal(null))
  }
  const cancelHandler = () => {
    dispatch(openModal(null))
  }

  return (
    <>
      <InputTypeFile setFile64={props.setFile64} />
      <img src={props.file64} />
      <div className={s.packName}>Name pack</div>
      <div style={{ marginBottom: '30px' }}>
        <TextField
          className={s.input}
          fullWidth={true}
          size="small"
          variant="standard"
          value={UpdateValue}
          onChange={updatePackName}
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
            onClick={saveUpdatedPackName}
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
