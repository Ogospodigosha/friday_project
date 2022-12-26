import * as React from 'react'
import { ReactNode } from 'react'

import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'

import { useAppDispatch, useAppSelector } from '../../../app/store'

import { openModal } from './modalReducer'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

type PropsType = {
  children: ReactNode
}
export const BasicModal: React.FC<PropsType> = ({ children }) => {
  const dispatch = useAppDispatch()
  const title = useAppSelector(state => state.modal.title)

  const handleClose = () => {
    debugger
    dispatch(openModal(null))
  }

  return (
    <Modal open={!!title} onClose={handleClose}>
      <Box sx={style}>{children}</Box>
    </Modal>
  )
}
