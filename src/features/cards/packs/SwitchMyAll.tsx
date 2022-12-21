import React, { useEffect, useState } from 'react'

import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useDispatch } from 'react-redux'

import { useAppSelector } from '../../../app/store'

import { setIsMyPackAC } from './packs-reducer'
import { ParamsForGetPacks } from './packsApi'

type Props = {
  user_id: string
  switchCallback: (my: boolean) => void
  params: ParamsForGetPacks
  test: null | string
}
export const SwitchMyAll = (props: Props) => {
  const dispatch = useDispatch()
  let isMyPack = useAppSelector(state => state.packs.isMyPack)
  const [alignment, setAlignment] = useState(window.localStorage.getItem('alignment'))

  useEffect(() => {
    const data = window.localStorage.getItem('alignment')

    if (data === 'my') {
      debugger
      dispatch(setIsMyPackAC(true))
    }
    console.log(data)
    if (data !== null) {
      setAlignment(JSON.parse(data))
      dispatch(setIsMyPackAC(false))
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem('alignment', JSON.stringify(alignment))
    window.localStorage.setItem('isMyPack', JSON.stringify(isMyPack))
  }, [alignment, isMyPack])
  const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    setAlignment(newAlignment)
  }
  const myHandler = (event: React.MouseEvent<HTMLElement>) => {
    setAlignment('my')
    props.switchCallback(true)
  }
  const AllHandler = (event: React.MouseEvent<HTMLElement>) => {
    debugger
    setAlignment('all')
    props.switchCallback(false)
  }

  return (
    <ToggleButtonGroup
      color="info"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value="my" onClick={myHandler} style={{ width: '97px' }}>
        My
      </ToggleButton>
      <ToggleButton value="all" onClick={AllHandler} style={{ width: '97px' }}>
        All
      </ToggleButton>
    </ToggleButtonGroup>
  )
}
