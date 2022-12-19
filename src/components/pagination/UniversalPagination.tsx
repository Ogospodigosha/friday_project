import React from 'react'

import { MenuItem, Pagination, Select } from '@mui/material'

import s from './UniversalPagination.module.css'

type PaginationPropsType = {
  page: number
  pageCount: number
  totalCount: number
  onChange: (page: number, count: number) => void
}

export const UniversalPagination = (props: PaginationPropsType) => {
  const totalPages = Math.ceil(props.totalCount / props.pageCount)

  const onChangePagination = (event: any, page: number) => {
    props.onChange(page, props.pageCount)
  }

  const onChangeSelect = (event: any) => {
    props.onChange(1, event.target.value)
  }

  return (
    <>
      <div className={s.pagination}>
        <Pagination
          page={props.page}
          count={totalPages}
          onChange={onChangePagination}
          color="primary"
          shape="rounded"
        />
        <span>Show</span>
        <Select
          sx={{ height: '100%', width: '70px' }}
          value={props.pageCount}
          onChange={onChangeSelect}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={15}>15</MenuItem>
          <MenuItem value={20}>20</MenuItem>
        </Select>

        <span>Cards per page</span>
      </div>
    </>
  )
}
