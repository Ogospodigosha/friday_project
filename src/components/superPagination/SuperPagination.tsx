import React, { useEffect, useState } from 'react'

import { MenuItem, Pagination, Select } from '@mui/material'
import { useSearchParams } from 'react-router-dom'

import s from './SuperPagination.module.css'

type PaginationPropsType = {
  totalCount: number
}

export const SuperPagination = (props: PaginationPropsType) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const [page, setPage] = useState(Number(searchParams.get('page')) || 1)
  const [pageCount, setPageCount] = useState(Number(searchParams.get('pageCount')) || 5)

  const totalPages = Math.ceil(props.totalCount / pageCount)
  const onChangePagination = (event: React.ChangeEvent<unknown>, page: number) => {
    setPage(page)
    setSearchParams({
      ...Object.fromEntries(searchParams),
      page: page.toString(),
    })
  }

  const onChangeSelect = (event: any) => {
    setPage(page)
    setPageCount(event.target.value)
    const queryParams: { page?: string; pageCount?: string } = {}

    if (page !== 1) queryParams.page = String(page)
    else searchParams.delete('page')

    queryParams.pageCount = String(event.target.value)

    setSearchParams({
      ...Object.fromEntries(searchParams),
      ...queryParams,
    })
  }

  // useEffect(() => {
  //   !packs?.length && dispatch(setPageAC(page - 1)) && searchParams.delete('page')
  // }, [totalCount])

  useEffect(() => {
    setPage(Number(searchParams.get('page')) || 1)
    setPageCount(Number(searchParams.get('pageCount')) || 5)
  }, [searchParams])

  return (
    <>
      <div className={s.pagination}>
        <Pagination
          page={page}
          count={totalPages}
          onChange={onChangePagination}
          color="primary"
          shape="rounded"
        />
        <span className={s.show}>Show</span>
        <Select sx={{ height: '100%', width: '70px' }} value={pageCount} onChange={onChangeSelect}>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
        </Select>

        <span className={s.hint}>Cards per page</span>
      </div>
    </>
  )
}
