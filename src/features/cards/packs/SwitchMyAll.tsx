import React, { memo, useEffect, useState } from 'react'

import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useDispatch } from 'react-redux'

import { useAppSelector } from '../../../app/store'

import { setIsMyPackAC } from './packs-reducer'

type Props = {
  switchCallback: (my: boolean) => void
}
export const SwitchMyAll = memo((props: Props) => {
  const dispatch = useDispatch()
  let isMyPack = useAppSelector(state => state.packs.isMyPack)
  const [alignment, setAlignment] = useState(JSON.parse(localStorage.getItem('alignment') || 'all'))

  useEffect(() => {
    if (alignment !== 'all' && !isMyPack) {
      dispatch(setIsMyPackAC(true))
    }
  }, [isMyPack])

  useEffect(() => {
    window.localStorage.setItem('alignment', JSON.stringify(alignment))
  }, [alignment])
  const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    setAlignment(newAlignment)
  }
  const myHandler = () => {
    setAlignment('my')
    props.switchCallback(true)
  }
  const AllHandler = () => {
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
})
