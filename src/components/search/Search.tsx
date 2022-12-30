import React, { ChangeEvent, useEffect, useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import SearchIcon from '@mui/icons-material/Search'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import { useSearchParams } from 'react-router-dom'

import s from './Search.module.css'

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchValue, setSearchValue] = useState(searchParams.get('packName') || '')

  const onSearchInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value)
    setSearchParams({
      ...Object.fromEntries(searchParams),
      packName: e.currentTarget.value,
    })
  }
  const handler = () => {
    setSearchValue('')
    searchParams.delete('packName')
    setSearchParams({
      ...Object.fromEntries(searchParams),
    })
  }

  useEffect(() => {
    if (!searchValue) searchParams.delete('packName')
    setSearchParams({
      ...Object.fromEntries(searchParams),
    })

    setSearchValue(searchParams.get('packName') || '')
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
