import React, { useEffect, useState } from 'react'

import { MenuItem, Pagination, Select } from '@mui/material'
import { createSearchParams, useSearchParams } from 'react-router-dom'

import { instance } from '../../api/instance'

import s from './CastomPagination.module.css'

type packType = {
  name: string
}

const getCards = (page: number, pageCount: number) => {
  return instance
    .get<{ cardPacksTotalCount: number; page: number; pageCount: number; cardPacks: packType[] }>(
      '/cards/pack',
      {
        params: { page: page, pageCount: pageCount },
      }
    )
    .catch(e => {
      alert(e)
    })
}

export const UniversalPagination = () => {
  // забрать из родителя
  const [page, setPage] = useState(1)
  const [countForPage, setCountForPage] = useState(10)
  const [cardPacksTotalCount, setCardPacksTotalCount] = useState(100)
  // Не нужно
  const [packs, setPacks] = useState<packType[]>([])
  // Остается
  const [searchParams, setSearchParams] = useSearchParams()

  const totalPages = Math.ceil(cardPacksTotalCount / countForPage)

  const sendQuery = (params: { page: number; pageCount: number }) => {
    getCards(params.page, params.pageCount).then(res => {
      if (res) {
        setPage(res.data.page)
        setCountForPage(res.data.pageCount)
        setCardPacksTotalCount(res.data.cardPacksTotalCount)
        setPacks(res.data.cardPacks)
      }
    })
  }
  const onChangeCallback = (newPage: number, newCountForPage: number) => {
    sendQuery({ page: newPage, pageCount: newCountForPage })
    setSearchParams(
      createSearchParams({
        page: newPage.toString(),
        count: newCountForPage.toString(),
      })
    )
  }

  const onChangePagination = (event: any, page: number) => {
    onChangeCallback(page, countForPage)
  }

  const onChangeSelect = (event: any) => {
    onChangeCallback(1, event.target.value)
  }

  useEffect(() => {
    const params = Object.fromEntries(searchParams)

    sendQuery({ page: +params.page, pageCount: +params.count })
    setPage(+params.page || 1)
    setCountForPage(+params.count || 10)
  }, [])
  const mappedPacks = packs.map((el, index) => <div key={index}>{el.name}</div>)

  return (
    <>
      {mappedPacks}
      <div className={s.pagination}>
        <Pagination
          page={page}
          count={totalPages}
          onChange={onChangePagination}
          color="primary"
          shape="rounded"
        />
        <span>Show</span>
        <Select
          sx={{ height: '100%', width: '70px' }}
          value={countForPage}
          onChange={onChangeSelect}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={4}>4</MenuItem>
        </Select>

        <span>Cards per page</span>
      </div>
    </>
  )
}
