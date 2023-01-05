import React, { ChangeEvent, useRef } from 'react'

import s from './InputFile.module.css'

export const InputFile = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  const selectFileHandler = () => {
    inputRef && inputRef.current?.click()
  }

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      console.log('file: ', file)
    }
  }

  return (
    <div>
      <button onClick={selectFileHandler} className={s.button}></button>
      <input style={{ display: 'none' }} ref={inputRef} type="file" onChange={uploadHandler} />
    </div>
  )
}
