import React, { useEffect, useState } from 'react'

import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useDispatch } from 'react-redux'

import { useAppSelector } from '../../../app/store'

import { changeIsMyPack } from './IsMyPackReducer-reducer'

type Props = {
  switchCallback: (my: boolean) => void
  params: Object
}
export const SwitchMyAll = React.memo((props: Props) => {
  const isMyPack = useAppSelector(state => state.packs.isMyPack)
  const dispatch = useDispatch()
  const [alignment, setAlignment] = useState(
    JSON.parse(localStorage.getItem('alignment') as string) || 'all'
  )

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('alignment') as string) === 'all') {
      setAlignment('all')
    }
  }, [JSON.parse(localStorage.getItem('alignment') as string)])
  useEffect(() => {
    window.localStorage.setItem('alignment', JSON.stringify(alignment))
  }, [alignment])
  const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    setAlignment(newAlignment)
  }
  const myHandler = () => {
    setAlignment('my')
    dispatch(changeIsMyPack(true))
    props.switchCallback(true)
  }
  const AllHandler = () => {
    setAlignment('all')
    dispatch(changeIsMyPack(false))
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
