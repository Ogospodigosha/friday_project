import React, { ChangeEvent } from 'react'

import { Button } from '@mui/material'

type PropsType = {
  setFile64: (file64: string) => void
}
export const InputTypeFile: React.FC<PropsType> = ({ setFile64 }) => {
  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      console.log('file: ', file)

      if (file.size < 4000000) {
        // https://developer.mozilla.org/ru/docs/Web/API/FileReader/FileReader
        const reader = new FileReader()

        reader.onloadend = () => {
          let file64 = reader.result as string

          console.log('file64: ', file64)
          setFile64(file64)
        }
        // https://developer.mozilla.org/ru/docs/Web/API/FileReader/readAsDataURL
        reader.readAsDataURL(file)
      } else {
        console.error('Error: ', 'Файл слишком большого размера')
      }
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
