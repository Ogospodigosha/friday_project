import { useEffect, useState } from 'react'

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import { useSearchParams } from 'react-router-dom'

import s from './Filtration.module.css'

export const changeSort = (sort: string, up: string, down: string) => {
  return sort === up ? down : up
}
type PropsType = {
  title: string
  type: string
}

export const Filtration = ({ title, type }: PropsType) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const [value, setValue] = useState(searchParams.get(type) || '')
  const test = value
  const onClickHandler = () => {
    setValue(prev => changeSort(prev, '', '1updated'))
  }

  useEffect(() => {
    if (test === '1updated') {
      const queryParams: { sortPacks?: string; sortCards?: string } = {}

      if (type === 'sortPacks') {
        queryParams['sortPacks'] = test
      }
      if (type === 'sortCards') {
        queryParams['sortCards'] = test
      }
      setSearchParams({
        ...Object.fromEntries(searchParams),
        ...queryParams,
      })
    } else {
      searchParams.delete(type)
      setSearchParams({
        ...Object.fromEntries(searchParams),
      })
    }
  }, [test])

  useEffect(() => {
    setValue(searchParams.get(type) || '')
  }, [searchParams])

  return (
    <div className={s.wrapper} onClick={onClickHandler}>
      <span>{title}</span>
      {test ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
    </div>
  )
}
