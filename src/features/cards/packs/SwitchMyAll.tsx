import React, { useEffect, useState } from 'react'

import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useSearchParams } from 'react-router-dom'

import { useAppSelector } from '../../../utils/hooks/useAppSelector'

export const SwitchMyAll = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const user_id = useAppSelector(state => state.app.user._id)

  const myAll = searchParams.get('user_id') ? 'my' : 'all'
  const [alignment, setAlignment] = useState(myAll)

  const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment)
    }
  }
  const myHandler = () => {
    setSearchParams({
      user_id: user_id,
    })
  }
  const allHandler = () => {
    searchParams.delete('user_id')
    setSearchParams({})
  }

  useEffect(() => {
    setAlignment(myAll)
  }, [searchParams])

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <span>Show packs cards</span>
      <ToggleButtonGroup
        size="small"
        color="info"
        value={alignment}
        exclusive
        onChange={handleChange}
      >
        <ToggleButton value="my" onClick={myHandler} style={{ width: '97px' }}>
          My
        </ToggleButton>
        <ToggleButton value="all" onClick={allHandler} style={{ width: '97px' }}>
          All
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
}
