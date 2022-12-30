import * as React from 'react'
import { FC, useState } from 'react'

import Button from '@mui/material/Button'
import Fade from '@mui/material/Fade'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useSearchParams } from 'react-router-dom'

import dashIcon from '../../../../assets/icons/dashboard.svg'
import deleteImg from '../../../../assets/icons/Delete.png'
import edit from '../../../../assets/icons/Edit.png'
import learn from '../../../../assets/icons/learn.png'
import { useAppDispatch } from '../../../../utils/hooks/useAppDispatch'
import { useAppSelector } from '../../../../utils/hooks/useAppSelector'
import { openModal } from '../../modals/modalReducer'
import { PackModal } from '../../modals/PackModal'

import s from './FadeMenu.module.css'

type FadeMenuPropsType = {
  learnPack: () => void
}
type UpdateModalType = {
  id: string
  name: string
}

export const FadeMenu: FC<FadeMenuPropsType> = ({ learnPack }) => {
  const dispatch = useAppDispatch()
  const packName = useAppSelector(state => state.cards.packName)
  const cardsPack_id = useAppSelector(state => state.cards.currentPackId)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [modul, setModul] = useState(false)
  const [dataForUpdateModal, setDataForUpdateModal] = useState<UpdateModalType>({
    id: '',
    name: '',
  })
  const [searchParams, setSearchParams] = useSearchParams()

  const open = Boolean(anchorEl)
  const params = Object.fromEntries(searchParams)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const deletePack = () => {
    setModul(true)
    setDataForUpdateModal({ id: params.cardsPack_id, name: packName })
    dispatch(openModal('Delete pack'))
  }
  const editPack = () => {
    setModul(true)
    setDataForUpdateModal({ id: params.cardsPack_id, name: packName })
    dispatch(openModal('Edit pack'))
  }

  return (
    <div>
      {modul ? <PackModal dataForUpdateModal={dataForUpdateModal} /> : null}
      <Button
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <span className={s.spanMainImg}>
          <img src={dashIcon} alt="dashbord" />
        </span>
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={() => editPack()}>
          <span className={s.span} onClick={handleClose}>
            <img src={edit} alt="edit" />
            Edit
          </span>
        </MenuItem>
        <MenuItem onClick={deletePack}>
          <span className={s.span} onClick={handleClose}>
            <img src={deleteImg} alt="delete" />
            Delete
          </span>
        </MenuItem>
        <MenuItem onClick={learnPack}>
          <span className={s.span} onClick={handleClose}>
            <img src={learn} alt="learn" />
            Learn
          </span>
        </MenuItem>
      </Menu>
    </div>
  )
}
