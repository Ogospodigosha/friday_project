import React, { ChangeEvent } from 'react'

import { Button } from '@mui/material'

export const InputTypeFile = () => {
  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      console.log('file: ', file)
    }
  }

  return (
    <label>
      <input type="file" onChange={uploadHandler} style={{ display: 'none' }} />
      <Button
        variant="contained"
        component="span"
        fullWidth={true}
        style={{ marginBottom: '25px' }}
      >
        Upload button
      </Button>
    </label>
  )
}
