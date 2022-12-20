import React, { useState } from 'react'

import { ToggleButton, ToggleButtonGroup } from '@mui/material'

import { useAppDispatch } from '../../../app/store'

import { setIsMyPackAC } from './packs-reducer'

export const SwitchMyAll = () => {
  const [alignment, setAlignment] = useState('all')
  const dispatch = useAppDispatch()
  const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    setAlignment(newAlignment)
  }
  const myHandler = () => {
    dispatch(setIsMyPackAC(true))
  }
  const AllHandler = () => {
    dispatch(setIsMyPackAC(false))
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
