import React, { useEffect } from 'react'

import { MenuItem, Pagination, Select } from '@mui/material'

import s from './UniversalPagination.module.css'

type PaginationPropsType = {
  page: number
  pageCount: number
  totalCount: number
  onChange: (page: number, count: number) => void
}

export const UniversalPagination = (props: PaginationPropsType) => {
  const totalPages = props.totalCount / props.pageCount

  useEffect(() => {
    props.onChange(props.page, props.pageCount)
  }, [totalPages])

  const onChangePagination = (event: React.ChangeEvent<unknown>, page: number) => {
    props.onChange(page, props.pageCount)
  }

  const onChangeSelect = (event: any) => {
    props.onChange(1, event.target.value)
  }

  // console.log(totalPages)

  return (
    <>
      <div className={s.pagination}>
        <Pagination
          page={props.page}
          count={Math.ceil(totalPages)}
          onChange={onChangePagination}
          color="primary"
          shape="rounded"
        />
        <span className={s.show}>Show</span>
        <Select
          sx={{ height: '100%', width: '70px' }}
          value={props.pageCount}
          onChange={onChangeSelect}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
        </Select>

        <span className={s.hint}>Cards per page</span>
      </div>
    </>
  )
}
