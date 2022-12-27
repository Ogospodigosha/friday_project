import React, { useEffect, useState } from 'react'

import Slider from '@mui/material/Slider/Slider'
import { useSearchParams } from 'react-router-dom'

import { setLocalRangeAC } from '../../features/cards/packs/packs-reducer'
import { useAppDispatch } from '../../utils/hooks/useAppDispatch'

import s from './UniversalDoubleRange.module.css'

type PropsType = {
  min: number
  max: number
}

export const UniversalDoubleRange = ({ min, max }: PropsType) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const dispatch = useAppDispatch()

  const [value, setValue] = useState<Array<number>>([
    Number(searchParams.get('min')) || min,
    Number(searchParams.get('max')) || max,
  ])

  const onChangeHandler = (event: Event, newValue: number | Array<number>) => {
    setValue(newValue as Array<number>)
  }

  const onChangeCommittedHandler = () => {
    const queryParams: { min?: string; max?: string } = {}

    // if (value[0] !== min)
    queryParams.min = String(value[0])
    // else searchParams.delete('min')
    //
    // if (value[1] !== max)
    queryParams.max = String(value[1])
    // else searchParams.delete('max')

    setSearchParams({
      ...Object.fromEntries(searchParams),
      ...queryParams,
    })
    dispatch(setLocalRangeAC([min, max]))
  }

  useEffect(() => {
    setValue([Number(searchParams.get('min')) || min, Number(searchParams.get('max')) || max])
  }, [max, max, searchParams])

  return (
    <div className={s.wrapper}>
      <div className={s.value}>{value[0]}</div>
      <Slider
        value={value}
        onChange={onChangeHandler}
        onChangeCommitted={onChangeCommittedHandler}
        min={min}
        max={max}
      />
      <div className={s.value}>{value[1]}</div>
    </div>
  )
}
