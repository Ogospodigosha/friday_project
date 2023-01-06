import React from 'react'

import { MenuItem, Select, SelectChangeEvent } from '@mui/material'
import FormControl from '@mui/material/FormControl'

import { SelectType } from '../createCardModalBody/CreateCardModalBody'
import s from '../createCardModalBody/CreateCardModalBody.module.css'

type PropsType = {
  questionType: string
  changeQuestion: (newSelectValue: SelectType) => void
}

export const ChangeQuestionType = ({ questionType, changeQuestion }: PropsType) => {
  const changeSelect = (event: SelectChangeEvent) => {
    changeQuestion(event.target.value as SelectType)
  }

  return (
    <FormControl fullWidth>
      <span className={s.selectDescription}>Choose a question format</span>
      <Select value={questionType} onChange={changeSelect}>
        <MenuItem value={'text'}>Text</MenuItem>
        <MenuItem value={'picture'}>Picture</MenuItem>
      </Select>
    </FormControl>
  )
}
