import React, { ChangeEvent, useEffect, useState } from 'react'

import SearchIcon from '@mui/icons-material/Search'
import { InputAdornment, TextField } from '@mui/material'
import { useSearchParams } from 'react-router-dom'

import s from '../../features/cards/packs/packs.module.css'

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [packName, setPackName] = useState(searchParams.get('packName') || '')

  const onSearchInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPackName(e.currentTarget.value)
    setSearchParams({
      ...Object.fromEntries(searchParams),
      packName: e.currentTarget.value,
    })
  }

  useEffect(() => {
    const queryParams: { packName?: string } = {}

    if (packName) {
      queryParams.packName = packName
    } else searchParams.delete('packName')
    setSearchParams({
      ...Object.fromEntries(searchParams),
      ...queryParams,
    })
  }, [searchParams])

  return (
    <div style={{ marginRight: '20px' }}>
      <TextField
        className={s.input}
        size="small"
        value={packName}
        onChange={onSearchInputHandler}
        placeholder={'Provide your text'}
        InputProps={{
          startAdornment: (
            <InputAdornment position={'start'}>
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>
  )
}
