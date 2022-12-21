import React from 'react'

import CircularProgress from '@mui/material/CircularProgress'

import s from './CircularProgress.module.css'

export const CircularProgressSelf = () => {
  return (
    <div className={s.circle}>
      <CircularProgress size={100} />
    </div>
  )
}
