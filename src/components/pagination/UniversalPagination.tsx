import React, { useState } from 'react'

import { MenuItem, Pagination, Select } from '@mui/material'

import s from './CastomPagination.module.css'

export const UniversalPagination = () => {
  const [page, setPage] = useState(1)
  const [countForPage, setCountForPage] = useState(10)
  const totalPages = Math.ceil(100 / countForPage)

  const onChangeCallback = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  const onChangeSelect = (e: any) => {
    setCountForPage(e.target.value)
  }

  return (
    <div className={s.pagination}>
      <Pagination
        page={page}
        count={totalPages}
        onChange={onChangeCallback}
        color="primary"
        shape="rounded"
      />
      <span>Show</span>
      <Select value={countForPage} onChange={onChangeSelect}>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={3}>3</MenuItem>
      </Select>

      <span>Cards per page</span>
    </div>
  )
}
