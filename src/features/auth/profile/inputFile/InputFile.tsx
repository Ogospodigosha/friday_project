import React, { ChangeEvent, useRef } from 'react'

import { handleError } from '../../../../utils/error-utils'
import { useAppDispatch } from '../../../../utils/hooks/useAppDispatch'
import { updateProfileTC } from '../../authReducer'

import s from './InputFile.module.css'

export const InputFile: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const dispatch = useAppDispatch()

  const selectFileHandler = () => {
    inputRef && inputRef.current?.click()
  }

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file.size < 4000000) {
        convertFileToBase64(file, (file64: string) => {
          dispatch(updateProfileTC({ avatar: file64 }))
        })
      }
    } else {
      handleError(new Error('File is too large'), dispatch)
      console.error('Error: ', 'File is too big')
    }
  }

  const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
    const reader = new FileReader()

    reader.onloadend = () => {
      const file64 = reader.result as string

      callBack(file64)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div>
      <button onClick={selectFileHandler} className={s.button}></button>
      <input style={{ display: 'none' }} ref={inputRef} type="file" onChange={uploadHandler} />
    </div>
  )
}
