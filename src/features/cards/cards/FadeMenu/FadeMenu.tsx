import * as React from 'react'

import Button from '@mui/material/Button'
import Fade from '@mui/material/Fade'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import dashIcon from '../../../../assets/icons/dashboard.svg'
import deleteImg from '../../../../assets/icons/Delete.png'
import edit from '../../../../assets/icons/Edit.png'
import learn from '../../../../assets/icons/learn.png'

import s from './FadeMenu.module.css'

export function FadeMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
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
        <MenuItem onClick={handleClose}>
          <span className={s.span}>
            <img src={edit} alt="edit" />
          </span>
          Edit
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <span className={s.span}>
            <img src={deleteImg} alt="delete" />
          </span>
          Delete
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <span className={s.span}>
            <img src={learn} alt="learn" />
          </span>
          Learn
        </MenuItem>
      </Menu>
    </div>
  )
}
