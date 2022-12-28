import { useEffect, useState } from 'react'

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import { useSearchParams } from 'react-router-dom'

import { setSortAC } from '../../features/cards/packs/packs-reducer'
import { useAppDispatch } from '../../utils/hooks/useAppDispatch'

type PropsType = {
  sortPacks: string
}
export const changeSort = (sort: string, up: string, down: string) => {
  return sort === up ? down : up
}

export const Filtration = ({ sortPacks }: PropsType) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const dispatch = useAppDispatch()

  const [value, setValue] = useState(searchParams.get('sortPacks') || sortPacks)
  const onClickHandler = () => {
    setValue(prev => changeSort(prev, '0updated', '1updated'))
  }

  useEffect(() => {
    setSearchParams({ ...Object.fromEntries(searchParams), sortPacks: value })
    dispatch(setSortAC(value))
  }, [value])

  return (
    <div onClick={onClickHandler}>
      {sortPacks === '1updated' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
    </div>
  )
}
