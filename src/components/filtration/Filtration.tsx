import { useEffect, useState } from 'react'

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import { useSearchParams } from 'react-router-dom'

export const changeSort = (sort: string, up: string, down: string) => {
  return sort === up ? down : up
}

export const Filtration = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const [value, setValue] = useState(searchParams.get('sortPacks') || '')
  const test = value
  const onClickHandler = () => {
    setValue(prev => changeSort(prev, '', '1updated'))
  }

  useEffect(() => {
    if (test === '1updated') {
      setSearchParams({
        ...Object.fromEntries(searchParams),
        sortPacks: test,
      })
    } else {
      searchParams.delete('sortPacks')
      setSearchParams({
        ...Object.fromEntries(searchParams),
      })
    }
  }, [test])

  useEffect(() => {
    setValue(searchParams.get('sortPacks') || '')
  }, [searchParams])

  return <div onClick={onClickHandler}>{test ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}</div>
}
