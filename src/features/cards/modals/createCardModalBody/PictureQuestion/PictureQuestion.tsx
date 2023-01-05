import React, { ChangeEvent } from 'react'

import { setAppErrorAC } from '../../../../../app/appReducer'
import { convertFileToBase64 } from '../../../../../utils/convertToBase64'
import { useAppDispatch } from '../../../../../utils/hooks/useAppDispatch'

type PropsType = {
  cover: string
  setQuestionCover: (fileBase64: string) => void
}
export const PictureQuestion = ({ cover, setQuestionCover }: PropsType) => {
  const dispatch = useAppDispatch()
  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file.size < 100000) {
        convertFileToBase64(file, (file64: string) => {
          setQuestionCover(file64)
        })
      } else {
        dispatch(setAppErrorAC('file to large'))
      }
    }
  }

  return (
    <>
      <div>
        <span>Question:</span>
        <label>
          <input type="file" onChange={uploadHandler} style={{ display: 'none' }} />
          <div style={{ height: '200px', backgroundColor: 'grey' }}>
            {cover ? <img src={cover} style={{ height: '100%' }} /> : <div>11</div>}
          </div>
        </label>
      </div>
    </>
  )
}
