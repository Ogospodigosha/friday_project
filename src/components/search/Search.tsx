import React, { ChangeEvent, useEffect, useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import SearchIcon from '@mui/icons-material/Search'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import { useSearchParams } from 'react-router-dom'

import s from './Search.module.css'

type PropsType = {
  type: string
}
export const Search = ({ type }: PropsType) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchValue, setSearchValue] = useState(searchParams.get(type) || '')

  const onSearchInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const queryParams: { cardQuestion?: string; packName?: string } = {}

    if (type === 'cardQuestion') {
      queryParams['cardQuestion'] = e.currentTarget.value
    }
    if (type === 'packName') {
      queryParams['packName'] = e.currentTarget.value
    }

    setSearchValue(e.currentTarget.value)
    setSearchParams({
      ...Object.fromEntries(searchParams),
      ...queryParams,
    })
  }
  const handler = () => {
    setSearchValue('')
    searchParams.delete(type)
    setSearchParams({
      ...Object.fromEntries(searchParams),
    })
  }

  useEffect(() => {
    if (!searchValue) searchParams.delete(type)
    setSearchParams({
      ...Object.fromEntries(searchParams),
    })

    setSearchValue(searchParams.get(type) || '')
  }, [searchParams])

  return (
    <>
      <span className={s.text}>Search</span>
      <div className={s.input}>
        <TextField
          sx={{ width: '100%' }}
          size="small"
          value={searchValue}
          onChange={onSearchInputHandler}
          placeholder={'Provide your text'}
          InputProps={{
            startAdornment: (
              <InputAdornment position={'start'}>
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <IconButton onClick={handler}>
                <CloseIcon />
              </IconButton>
            ),
          }}
        />
      </div>
    </>
  )
}
