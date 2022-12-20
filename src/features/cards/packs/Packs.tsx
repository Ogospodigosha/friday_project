import React, { useEffect } from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SchoolIcon from '@mui/icons-material/School'
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material'
import Button from '@mui/material/Button'
import { useSearchParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../app/store'

import { createPackTC } from './createPackTC'
import { deletePackTC } from './deletePackTC'
import { editPackTC } from './editPackTC'
import { getPacksTC } from './getPacksTC'
import { setIsMyPackAC } from './packs-reducer'
import s from './packs.module.css'

export const Packs = () => {
  const dispatch = useAppDispatch()

  const packs = useAppSelector(state => state.packs.packs)
  let [searchParams, setSearchParams] = useSearchParams({})
  const currentPage = useAppSelector(state => state.packs.packs.page)
  const isMyPack = useAppSelector(state => state.packs.isMyPack)

  console.log(searchParams)
  // console.log(packs)
  useEffect(() => {
    // setSearchParams(
    //   createSearchParams({
    //     currentPage: currentPage.toString(),
    //   })
    // )
    dispatch(getPacksTC())
  }, [isMyPack])

  const editableDate = (updated: string) => {
    let newUpdated = updated.split('T')[0].split('-')
    let years = newUpdated.shift()

    if (years) {
      newUpdated.push(years)
    }

    return newUpdated.join('.')
  }
  const data = {
    cardsPack: {
      name: '55',
    },
  }
  const deletePack = (id: string) => {
    dispatch(deletePackTC(id))
  }
  const editPack = (id: string) => {
    dispatch(editPackTC(id))
  }
  // const onClickHandler = () => {
  //   console.log(1)
  // }
  const createPack = () => {
    dispatch(createPackTC(data))
  }
  const Handler = () => {
    dispatch(setIsMyPackAC(true))
  }

  return (
    <div>
      <div className={s.header}>
        <Button onClick={Handler}>My</Button>
        <div className={s.description}>Packs list</div>
        <Button
          onClick={createPack}
          variant={'contained'}
          className={s.button}
          style={{ textTransform: 'none', borderRadius: '30px' }}
        >
          Add new pack
        </Button>
      </div>
      <div className={s.navigation}></div>
      <TableContainer component={Paper}>
        <Table>
          <thead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Cards</TableCell>
              <TableCell>Last Updated</TableCell>
              <TableCell>Created by</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </thead>

          <TableBody>
            {packs.cardPacks.map(raw => (
              <TableRow key={raw._id}>
                <TableCell>{raw.name}</TableCell>
                <TableCell>{raw.cardsCount}</TableCell>
                <TableCell>{editableDate(raw.updated)}</TableCell>
                <TableCell>{raw.user_name}</TableCell>
                <TableCell>
                  <IconButton>
                    <SchoolIcon />
                  </IconButton>
                  <IconButton onClick={() => editPack(raw._id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => deletePack(raw._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
